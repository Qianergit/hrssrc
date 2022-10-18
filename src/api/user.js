import request from '@/utils/request'

export function login(data) {
    return request({
        url: '/sys/login',
        method: 'post',
        data
    })
}

export function getUserInfoAPI() {
    return request({
        url: '/sys/profile',
        method: 'POST'

    })
}
export function getUserDateByIdAPI(id) { // 这个接口用来获取头像
    return request({
        url: `/sys/user/${id}`,
        method: 'get'
    })
}
export function logout() {
    return request({
        url: '/vue-admin-template/user/logout',
        method: 'post'
    })
}
export function getUserDetailById(id) { //获取用户基本信息
    return request({
        url: `/sys/user/${id}`
    })
}