import request from '@/utils/request'
export function getSortTimes (params) {
  return request({
    url: '/sort/getSortTimes',
    method: 'get',
    params
  })
}

export function getArticleByMonth (params) {
  return request({
    url: '/sort/getArticleByMonth',
    method: 'get',
    params
  })
}



