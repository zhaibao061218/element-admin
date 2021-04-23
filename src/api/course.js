import request from '@/utils/request'

export function getCourseList(query) {
  return request({
    url: '/api/academy/admin/CourseArticle/getcoursearticle_managelist',
    method: 'get',
    params: query
  })
}
export function setOnLine(query) {
  return request({
    url: '/api/academy/admin/CourseArticle/edit_coursearticle_isonline',
    method: 'get',
    params: query
  })
}
export function deleteCourse(query) {
  return request({
    url: '/api/academy/admin/CourseArticle/delete_courseArticle_detail',
    method: 'get',
    params: query
  })
}
export function addCourseSenior(query) {
  return request({
    url: '/api/academy/admin/CourseArticle/add_coursearticle_info',
    method: 'post',
    data: query,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
export function getCourseInfo(query) {
  return request({
    url: '/api/academy/admin/CourseArticle/getcoursearticle_managedetail',
    method: 'get',
    params: query
  })
}
export function getNewCourse(query) {
  return request({
    url: '/api/academy/admin/CourseArticle/getnovicecourse_managelist',
    method: 'get',
    params: query
  })
}


export function setNewCourse(query) {
  return request({
    url: '/api/academy/admin/CourseArticle/edit_novicecourse_isonline',
    method: 'get',
    params: query,
  })
}
export function deleteNewCourse(query) {
  return request({
    url: '/api/academy/admin/CourseArticle/delete_NoviceCourse_Detail',
    method: 'get',
    params: query,
  })
}
export function addNewCourse(query) {
  return request({
    url: '/api/academy/admin/CourseArticle/add_novicecourse_Info',
    method: 'post',
    data: query,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
export function updateCourse(query) {
  return request({
    url: '/api/academy/admin/CourseArticle/edit_coursearticle_detail',
    method: 'post',
    data: query,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
export function getNewCourseInfo(query) {
  return request({
    url: '/api/academy/admin/CourseArticle/getnovicecourse_managedetail',
    method: 'get',
    params: query,
  })
}
export function updateNewCourse(query) {
  return request({
    url: '/api/academy/admin/CourseArticle/edit_novicecourse_detail',
    method: 'post',
    data: query,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}



// 上传图片

export function updateImg(query) {
  return request({
    url: 'https://api.trialimg.com/api/ImgUpload/ImageUpload',
    method: 'post',
    data: query,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}








