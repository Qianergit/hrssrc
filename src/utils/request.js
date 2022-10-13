import store from '@/store'
import axios from 'axios'
import router from '@/router'
import { Message } from 'element-ui'
import { getTimeStamp } from './auth'
// create an axios instance
const TimeOut = 3600
const service = axios.create({
        baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
        timeout: 5000 // withCredentials: true, // send cookies when cross-domain requests
            // timeout是超时时间，如果请求超时则报错
    })
    // 请求拦截器
service.interceptors.request.use(config => {
        // config是请求的配置信息
        // 注入token
        if (isCheckTimeOut()) {

            store.dispatch('user/logout') //调取auex中的actions的删除数据的方法
            router.push('/login')
            return Promise.reject(new Error('token超时了'))

        }
        config.headers['Authorization'] = `Bearer ${store.getters.token}`
        return config
    }, error => {
        return Promise.rejuect(error)
    })
    // 相应拦截器
service.interceptors.response.use(response => {
    const { success, message, data } = response.data
    if (success) {
        return data
    } else {
        Message.error(message)
        return Promise.reject(new Error(message))
    }
}, error => {
    // error中会有一个response的对象
    if (error.response && error.response.data && error.response.data.code === 10002) {
        store.dispatch('user/logout')
        router.push('/login')
    } else {
        Message.error(error.message) // 提示错误信息
    }

    return Promise.reject(error)
})

function isCheckTimeOut() {
    //当前时间-缓存中的时间是否大于时间差
    var currenTime = Date.now()
    var timestamp = getTimeStamp()
    return (currenTime - timestamp) / 1000 > TimeOut
}
export default service