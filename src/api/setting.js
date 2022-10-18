import request from '@/utils/request'
export function getRoleList(params) {
    return request({
        url: '/sys/role',
        params
    })
}
//获取公司信息
export function getCompanyInfo(companyId) {
    return request({
        url: `/company/${companyId}`
    })
}
//删除角色
export function deleteRoleAPI(id) {
    return request({
        method: 'delete',
        url: `/sys/role/${id}`
    })
}
/** *
 * 修改角色
 * ***/
export function updateRoleAPI(data) {
    return request({
        url: `/sys/role/${data.id}`,
        data,
        method: 'put'
    })
}
/**
 * 获取角色详情
 * **/
export function getRoleDetailAPI(id) {
    return request({
        url: `/sys/role/${id}`
    })
}
// 新增角色接口
export function addRoleAPI(data) {
    return request({
        url: '/sys/role',
        data,
        method: 'post'
    })
}