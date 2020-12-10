import request from '@/utils/request'
export function getBlogTypes (params) {
  return request({
    url: '/classify/getBlogTypes',
    method: 'get',
    params
  })
}

export function getArticleByBlogType (params) {
  return request({
    url: '/classify/getArticleByBlogType',
    method: 'get',
    params
  })
}



