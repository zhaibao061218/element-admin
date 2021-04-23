import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const CancelToken = axios.CancelToken;
const pending = [];

// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})
// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent
        config.cancelToken = new CancelToken(function executor(c) {
            pending.push(c);
        })

        if (store.getters.token) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            config.headers['Authorization'] = "Bearer " + getToken()
        }
        return config
    },
    error => {
        // do something with request error
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(

    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        // const res = response.data
        //由于测试服的接口  成功返回的状态码是200 模拟接口成功返回的状态码是20000  统一成功后返回的状态码
        if (response.data.code == 20000) {
            response.data.Code = 200
        }
        const res = response.data


        // if the custom code is not 20000, it is judged as an error.
        if (res.Status == 200) {
            //学院页接口
            res.Code = res.Status
        } else if (res.code == 200) {
            //兼职活动
            res.Code = res.code
        }

        if (res.Code !== 200) {
            Message({
                message: res.message || 'Error',
                type: 'error',
                duration: 5 * 1000
            })
            // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                // to re-login
                MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
                    confirmButtonText: 'Re-Login',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(() => {
                    store.dispatch('user/resetToken').then(() => {
                        location.reload()
                    })
                })
            }
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
         
            return res
        }
    },
    error => {
        if (error.response.status === 401 || error.response.status === 403) {

            while (pending.length > 0) {
                pending.pop()('请求中断');
            }

            MessageBox.confirm('系统检测到您已登出或无权限，可以取消以停留在此页面，或重新登录。', '系统提示', {
                confirmButtonText: '重新登入',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                store.dispatch('user/resetToken').then(() => {
                    location.reload()
                })
            })
        } else {
            Message({
                message: error.message,
                type: 'error',
                duration: 5 * 1000
            })
        }
        return Promise.reject(error)
    }
)

export default service