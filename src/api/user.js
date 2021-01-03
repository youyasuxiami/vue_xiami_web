import request from '@/utils/request'

/**
 * 第三方登录
 * @param params
 */
export function login(params) {
  return request({
    url: process.env.WEB_API + '/oauth/render',
    method: 'post',
    params
  })
}

export function authVerify(params) {
  return request({
    url: process.env.WEB_API + '/oauth/verify/' + params,
    method: 'get',
  })
}

export function editUser(params) {
  return request({
    url: process.env.WEB_API + '/oauth/editUser',
    method: 'post',
    data: params
  })
}

/**
 * 更新用户密码
 * @param params
 */
export function updateUserPwd(params) {
  return request({
    url: process.env.WEB_API + '/oauth/updateUserPwd',
    method: 'post',
    data: params
  })
}

/**
 * 获取用户反馈
 * @param params
 */
export function getFeedbackList(params) {
  return request({
    url: process.env.WEB_API + '/oauth/getFeedbackList',
    method: 'get',
    params
  })
}

/**
 * 新增反馈
 * @param params
 */
export function addFeedback(params) {
  return request({
    url: process.env.WEB_API + '/oauth/addFeedback',
    method: 'post',
    data: params
  })
}

export function replyBlogLink(params) {
  return request({
    url: process.env.WEB_API + '/oauth/replyBlogLink',
    method: 'post',
    data: params
  })
}

export function deleteUserAccessToken(params) {
  return request({
    url: process.env.WEB_API + '/oauth/delete/' + params,
    method: 'post',
  })
}

/**
 * 本地登录
 * @param params
 */
export function localLogin(params) {
  return request({
    url: '/front/login',
    method: 'post',
    params
  })
}

/**
 * 本地注册
 * @param params
 */
export function localRegister(params) {
  return request({
    url: '/front/register',
    method: 'post',
    data: params
  })
}

// export function logout(params) {
//   return request({
//     url: process.env.WEB_API + '/user/logout',
//     method: 'post',
//     data: params
//   })
// }

export function getPublicKey() {
  return request({
    url: '/getPublicKey',
    method: 'get',
  })
}

// 获取当前账号的信息
export function getInfo() {
  return request({
    url: '/front/info',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/front/logout',
    method: 'post',
  })
}


// 获取当前账号的信息(包含付款码)
export function getUserInfo(params) {
  return request({
    url: '/front/getUserInfo',
    method: 'get',
    params
  })
}
