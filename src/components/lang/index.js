import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookie from 'js-cookie' //引入cookie工具
import elementEN from 'element-ui/lib/locale/lang/en' // 引入饿了么的英文包
import elementZH from 'element-ui/lib/locale/lang/zh-CN' // 引入饿了么的中文包
import customZH from './zh' // 引入自定义中文包
import customEN from './en' // 引入自定义英文包
Vue.use(VueI18n)
export default new VueI18n({
    // i18n的选项
    local: Cookie.get('language') || 'zh', //指的是当前的多语言的类型，他是随意定义的字符串 中文zh/英文en，就是在那个位置显示的选项的文字
    messages: {
        zh: {
            //语言包 两种  一种是elementUI的语言包+是自定义的
            ...elementZH,
            ...customZH
        },
        en: {
            //语言包 两种  一种是elementUI的语言包+是自定义的
            ...elementEN,
            ...customEN
        }
    } //指的是当前的多语言包
})