import PageTools from './PageTools'
import UploadExcel from './UploadExcel/UploadExcel.vue'
import UploadPhoto from './uploadPhoto'
import Print from 'vue-print-nb'
export default {
    install(Vue) {
        Vue.component('PageTools', PageTools) //注册工具栏组件
        Vue.component('UploadExcel', UploadExcel) //注册导入excel组件
        Vue.component('UploadPhoto', UploadPhoto)
        Vue.use(Print) //注册打印组件
    }
}