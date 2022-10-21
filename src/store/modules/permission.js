//这个是处理权限的模块
import { constantRoutes, asyncRoutes } from '@/router/index'
const state = {
    routes: constantRoutes
}
const mutations = {
    setRoutes(state, newRoutes) {
        state.routes = [...constantRoutes, ...newRoutes] //每次都是在静态路由上面在进行添加的
    }
}
const actions = {

    //第二个参数为当前用户的所拥有的菜单权限
    filterRoutes(context, menus) { //筛选路由的方法
        //筛选出动态路由中和menus中能对上的路由
        const routes = []
        menus.forEach(key => {

                routes.push(...asyncRoutes.filter(item => item.name === key))
            })
            // routes现在就是最新获得道德权限
        context.commit('setRoutes', routes)

        return routes //这里return 上面提交给state是为了给路由显示使用的这里的routes是一个新的路由的数据数组之后会用上
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}