import request from '@/utils/request'
export function getMe (params) {
  return request({
    url: '/about/getMe',
    method: 'get',
    params
  })
}


