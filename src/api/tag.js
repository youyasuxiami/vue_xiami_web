import request from '@/utils/request'
export function getTagType (params) {
  return request({
    url: '/tag/getTagType',
    method: 'get',
    params
  })
}

export function getArticleByBlogTag (params) {
  return request({
    url: '/tag/getArticleByBlogTag',
    method: 'get',
    params
  })
}



