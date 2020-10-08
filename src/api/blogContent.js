import request from '@/utils/request'

export function getBlogById (params) {
    return request({
        url: '/content/getBlogById',
        method: 'get',
        params
    })
}

export function praiseBlogById (params) {
    return request({
        url: '/content/praiseBlogById',
        method: 'get',
        params
    })
}

export function getSameBlogByBlogId (params) {
    return request({
        url: '/content/getSameBlogByBlogId',
        method: 'get',
        params
    })
}

export function addComment(params) {
    return request({
        url: '/content/addComment',
        method: 'post',
        data: params
    })
}

export function getCommentList(params) {
    return request({
        url: '/content/getCommentList',
        method: 'post',
        data: params
    })
}

export function reportComment (data) {
    return request({
        url: '/content/reportComment',
        method: 'post',
        data
    })
}
export function deleteComment (data) {
    return request({
        url: '/content/deleteComment',
        method: 'delete',
        data
    })
}




