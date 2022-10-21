// 做一个混入对象
import store from '@/store'

export default {
    methods: {
        cheackPermission(key) {

            const { UserInfo } = store.state.user
            if (UserInfo.roles && UserInfo.roles.points) {
                return UserInfo.roles.points.some(item => item === key)
            } //这里是如果没有进入if那就一定是没有权限
            return false
        }
    }
}