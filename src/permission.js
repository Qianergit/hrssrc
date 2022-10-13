// 权限拦截在路由跳转 导航守卫
import router from '@/router'
import store from '@/store'
import nProgress from 'nprogress' // 引入进度条
import 'nprogress/nprogress.css'
// 不需要导出 因为只需要昂代码执行即可

// 这个是前置守卫
// to 是到哪里去 from 是从哪里来 next是必须执行的钩子 next 必须执行如果不执行页面就死机了
// next() 放过
// next（false）跳转种植
// next（地址） 跳转到某个地址
const whiteList = ['/login', '/404'] // 定义白名单
router.beforeEach(async(to, from, next) => {
        nProgress.start() // 开启进度条
            // 有token的时候才能获取资料
        if (store.getters.token) {
            if (to.path === '/login') {
                next('/')
            } else {
                // 只有放过的时候采取获取用户资料
                // 是每次都获取么
                if (!store.getters.userId) {
                    await store.dispatch('user/getUserInfo')
                        // 这是一个异步操作所以有可能会先执行next
                        // 所以需要一个await
                }
                next()
            }
        } else {
            // 没有token的情况下看是否在白名单
            if (whiteList.indexOf(to.path) > -1) {
                // 如果大于负1就是地址在白名单
                next()
            } else {
                next('/login')
            }
        }
        nProgress.done() // 解决手动切换地址时进度条不关闭的问题
    })
    // 这个是后置守卫
router.afterEach(() => {
    nProgress.done()
})