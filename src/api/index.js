import request from '@/utils/request'
export function getNewBlog (params) {
  return request({
    url: process.env.WEB_API + '/index/getNewBlog',
    method: 'get',
    params
  })
}
