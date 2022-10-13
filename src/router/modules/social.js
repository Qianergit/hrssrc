import Layout from '@/layout'
export default {
    //路由规则
    name: 'social', //给模块的一级路由加一个name属性，在最后做权限的时候会用到
    path: '/social',
    component: Layout,
    children: [{
        path: '',
        component: () =>
            import ('@/views/social'),
        //路由元信息 其实就是一个存储数据的地方 可以放任何内容
        meta: {
            title: '社保'
        } //因为左侧导航读取了这里的title属性
    }]
}