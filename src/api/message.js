import request from '@/utils/request'

export function getBlogById (params) {
    return request({
        url: '/message/getBlogById',
        method: 'get',
        params
    })
}

export function praiseBlogById (params) {
    return request({
        url: '/message/praiseBlogById',
        method: 'get',
        params
    })
}

export function getSameBlogByBlogId (params) {
    return request({
        url: '/message/getSameBlogByBlogId',
        method: 'get',
        params
    })
}

export function addMessage(params) {
    return request({
        url: '/message/addMessage',
        method: 'post',
        data: params
    })
}

export function getAllMessageList(params) {
    return request({
        url: '/message/getAllMessageList',
        method: 'post',
        data: params
    })
}

export function reportComment (data) {
    return request({
        url: '/message/reportComment',
        method: 'post',
        data
    })
}
export function deleteComment (data) {
    return request({
        url: '/message/deleteComment',
        method: 'delete',
        data
    })
}

export function getAllCommentList(params) {
    return request({
        url: '/message/getAllCommentList',
        method: 'post',
        data: params
    })
}





