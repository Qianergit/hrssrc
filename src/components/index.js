import PageTools from './PageTools'
import UploadExcel from './UploadExcel/UploadExcel.vue'
import UploadPhoto from './uploadPhoto'
import Print from 'vue-print-nb' //打印组件
import ScreenFull from './ScreenFull'
import ThemePicker from './ThemePicker'
import lang from './langs'
import TagsView from './TagsView'

export default {
    install(Vue) {
        Vue.component('PageTools', PageTools) //注册工具栏组件
        Vue.component('UploadExcel', UploadExcel) //注册导入excel组件
        Vue.component('UploadPhoto', UploadPhoto)
        Vue.use(Print) //注册打印组件
        Vue.component('ScreenFull', ScreenFull) //全屏组件
        Vue.component('ThemePicker', ThemePicker) //改颜色的组件
        Vue.component('lang', lang) //多语言的组件
        Vue.component('TagsView', TagsView)
    }
}