import axios from 'axios'
import router from '@/router/index'
import {getCookie} from "@/utils/cookieUtils";
import { MessageBox, Message, notify } from 'element-ui'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL, // api 的 base_url
    // withCredentials: true, //让ajax携带cookie
    timeout: 20000 // 请求超时时间 20秒
})

// service.defaults.headers.common['authorization'] = getCookie("token")

// request拦截器
service.interceptors.request.use(
  config => {
    if (getCookie("token") != undefined) {
        config.headers['authorization'] = getCookie("token") // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)


// response 拦截器
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        const res = response.data

        // if the custom code is not 20000, it is judged as an error.
        if (res.code !== 20000) {
            // if (document.getElementsByClassName('el-message').length === 0) {
            //   Message({
            //     message: res.message || 'Error',
            //     type: 'error',
            //     duration: 5 * 1000
            //   })
            // }
            if (document.getElementsByClassName('el-message').length === 0) {

                // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
                // if (res.code === 401) {
                //     // if (document.getElementsByClassName('el-message').length === 0) {
                //     // to re-login
                //     MessageBox.confirm('登录信息已过期，需要重新登录', 'Confirm logout', {
                //         confirmButtonText: '重新登录',
                //         cancelButtonText: '取消',
                //         type: 'warning'
                //     }).then(() => {
                //         store.dispatch('user/resetToken').then(() => {
                //             location.reload()
                //         })
                //     })
                // }
            }
            return res
            // return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res
        }
    },
    error => {
        console.log('err' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 3 * 1000
        })
        return Promise.reject(error)
    }
)

export default service
