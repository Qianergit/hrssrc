import { login, getUserInfoAPI, getUserDateByIdAPI } from '@/api/user'
import { getToken, setToken, removeTokens, setTimeStamp, removeTimeStamp } from '@/utils/auth'
// 将utils中的三个关于token的方法拿过来
const state = {
    token: getToken(), // 设置token为共享状态初始化vuex的时候就先从缓存中读取
    UserInfo: {} // 定义一个空的对象 不是null 因为后边我要开发userInfo的属性给别人用  userInfo.name
}

const mutations = {
    // 设置token
    setToken(state, token) {
        state.token = token // 设置token  只是修改state的数据  123 =》 1234
            // vuex变化 => 缓存数据
        setToken(token) // vuex和 缓存数据的同步

    },
    removeToken(state) {
        state.token = null // 删除vuex的token
        removeTokens() // 先清除 vuex  再清除缓存 vuex和 缓存数据的同步
    },
    setUserInfo(state, result) {
        // state.UserInfo = result // 这样是响应式
        state.UserInfo = {...result } // 这样也是响应式属于浅拷贝
            // state.userInfo['username']=result 这样就不是响应式了
    },
    removeUserInfo(state) {
        state.userInfo = {}
    }

}
const actions = {

    // 定义login action 也需要参数 调用action时 传递过来的参数
    async login(context, data) {
        removeTimeStamp()
        const result = await login(data)

        context.commit('setToken', result) //这里拿到token说明设置成功了
        setTimeStamp() //设置当前的时间戳
            // context相当于组件中的this.$store,想调用mutations的方法的语法时this.$store.commit('方法名'，参数)
    },
    async getUserInfo(context) {
        const result = await getUserInfoAPI()
        const baseInfo = await getUserDateByIdAPI(result.userId)
        const obj = {...result, ...baseInfo }
        context.commit('setUserInfo', obj) // 提交到mutations
        return result // 这里时给权限留下的伏笔，这里的return在传数据时是根本没有影响的
    },
    logout(context) {
        context.commit('removeToken')
        context.commit('removeUserInfo')

    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions

}