import request from '@/utils/request'

export function getcoursedata(query) {
  return request({
    url: '/api/academy/admin/CourseArticle/getcoursedata',
    method: 'get',
    params: query
  })
}