import request from '@/utils/request'
export function getNewBlog (params) {
  return request({
    url: '/index/getNewBlog',
    method: 'get',
    params
  })
}

export function getHotTag (params) {
  return request({
    url: '/index/getHotTag',
    method: 'get',
    params
  })
}

export function getBlogByLevel (params) {
  return request({
    url: '/index/getBlogByLevel',
    method: 'get',
    params
  })
}

export function getHotBlog (params) {
  return request({
    url: '/index/getHotBlog',
    method: 'get',
    params
  })
}


