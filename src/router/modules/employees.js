//员工的路由规则
import Layout from '@/layout'
export default {
    //路由规则
    name: 'employees', //给模块的一级路由加一个name属性，在最后做权限的时候会用到
    path: '/employees',
    component: Layout,
    children: [{
            path: '',
            component: () =>
                import ('@/views/employees'),
            //路由元信息 其实就是一个存储数据的地方 可以放任何内容
            meta: {
                title: '员工信息',
                icon: 'drag'
            } //因为左侧导航读取了这里的title属性
        },
        {
            path: 'datail/:id?', //这里加了问号就是说这个参数可以传也可以不穿
            component: () =>
                import ('@/views/employees/components/datail'),
            mata: {
                title: '员工详情'
            },
            hidden: true

        },
        {
            path: 'print/:id?', // 二级默认路由
            component: () =>
                import ('@/views/employees/components/print'), // 按需加载
            hidden: true,
            meta: {
                title: '打印', // 标记当前路由规则的中文名称 后续在做左侧菜单时 使用
                icon: 'people'
            }
        }
    ]
}