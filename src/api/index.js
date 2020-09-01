import request from '@/utils/request'
export function getNewBlog (params) {
  return request({
    url: '/index/getNewBlog',
    method: 'get',
    params
  })
}
