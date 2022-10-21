import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import * as directive from '@/directives'
//引入一个全局的组件
import Component from '@/components'
import * as filters from '@/filters'
import i18n from '@/components/lang'
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
    const { mockXHR } = require('../mock')
    mockXHR()
}
// 将组件插槽全局引用
Vue.use(Component)
    // set ElementUI lang to EN
    // Vue.use(ElementUI, { locale })
    // 如果想要中文版 element-ui，按如下方式声明
    // Vue.use(ElementUI)
Vue.use(ElementUI, {
    // element支持i8n
    i18n: (key, value) => i18n.t(key) //这里的key就是我们在i18n的js中定义的local   i8n.t()这个方法会根据local的值找message中的方法数据
})
Object.keys(directive).forEach(key => {
    Vue.directive(key, directive[key]) // 注册所有的自定义指令
})
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]) //注册所有过滤器
})
Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => h(App)
})