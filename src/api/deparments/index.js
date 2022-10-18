import request from '@/utils/request'

// 阻止架构的信息接口
export function getDepartmentsAPI() {
    return request({
        url: '/company/department',
        method: 'get'
    })
}
export function delDepartmentAPI(id) {
    return request({
        url: `/company/department/${id}`,
        method: 'delete' //满足restful接口规范
            //同样的地址 不同的方法 执行不同的业务
            // delete 删除业务
            //get 获取业务
            // post 新增或者添加业务
            //put 修改业务
    })
}
export function addDepartments(data) {
    return request({
        method: 'post',
        url: '/company/department',
        data
    })
}
//获取部门详情的方法
export function getDepartDetail(id) {
    return request({
        url: `/company/department/${id}`
    })
}
//保存编辑的数据
export function updateDepartmentsAPI(data) {
    return request({
        url: `/company/department/${data.id}`,
        method: 'put',
        data
    })
}