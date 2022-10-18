import request from '@/utils/request'

export function getEmployeeSimpleAPI() { //获取简单列表
    return request({
        url: '/sys/user/simple'

    })
}
export function getemployeeListAPI(params) { //查询员工列表
    return request({
        url: '/sys/user',
        params
    })
}
export function deleteEmployeeAPI(id) { //删除员工列表
    return request({
        url: `/sys/user/${id}`,
        method: 'delete'
    })
}
export function addEmployeesAPI(data) {
    return request({
        url: '/sys/user',
        method: 'post',
        data
    })
}
export function importEmployeeAPI(data) { //批量导入的接口
    return request({
        url: '/sys/user/batch',
        method: 'post',
        data
    })
}
export function saveUserDetailById(data) { //更新用户信息接口
    return request({
        url: `/sys/user/${data.id}`,
        method: 'put',
        data
    })
}
/** *
 *  读取用户详情的基础信息
 * **/
export function getPersonalDetail(id) {
    return request({
        url: `/employees/${id}/personalInfo`
    })
}

/** *
 *  更新用户详情的基础信息
 * **/
export function updatePersonal(data) {
    return request({
        url: `/employees/${data.userId}/personalInfo`,
        method: 'put',
        data
    })
}

/** **
 * 获取用户的岗位信息
 *
 * ****/
export function getJobDetail(id) {
    return request({
        url: `/employees/${id}/jobs`
    })
}

/**
 * 保存岗位信息
 * ****/
export function updateJob(data) {
    return request({
        url: `/employees/${data.userId}/jobs`,
        method: 'put',
        data
    })
}