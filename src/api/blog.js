import request from '@/utils/request'

export function fetchList (query) {
    return request({
        url: '/Blog/BlogList',
        method: 'get',
        params: query
    })
}
export function newBlog (query) {
    return request({
        url: '/Blog/AddBlogSubmit',
        method: 'post',
        params: query,
        headers: {
        'Content-Type': 'application/json'
        }
    })
}
export function setBlogState (query) {
    return request({
        url: '/Blog/ChangeBlogState',
        method: 'get',
        params: query,
        // headers: {
        // 'Content-Type': 'application/json'
        // }
    })
}

export function editBlogInfo (query) {
    return request({
        url: '/Blog/EditBlogSubmit',
        method: 'post',
        params: query,
        headers: {
        'Content-Type': 'application/json'
        }
    })
}
export function getBlogInfo (query) {
    return request({
        url: '/Blog/GetBlogCommentDetail',
        method: 'get',
        params: query,
    })
}
export function getBlogCommentList (query) {
   return request({
        url: '/Blog/GetBlogCommentList',
        method: 'get',
        params: query,
    })
}
export function getCommentsDetail(query) {
   return request({
        url: '/Blog/GetBlogCommentList_Detail',
        method: 'get',
        params: query,
    })
}

export function replyComment (query) {
    return request({
        url: '/Blog/ChangeBlogCommentState',
        method: 'post',
        params: query,
        headers: {
        'Content-Type': 'application/json'
        }
    })
}
export function editBlogCommentState(query) {
   return request({
        url: '/Blog/EditBlogCommentState',
        method: 'get',
        params: query,
    })
}
export function getBlogBannerList(query) {
   return request({
        url: '/Blog/GetBlogBannerList',
        method: 'get',
        params: query,
    })
}






