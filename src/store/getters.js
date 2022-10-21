const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    token: state => state.user.token,
    name: state => state.user.userInfo.username,
    userId: state => state.user.userInfo.userId,
    staffPhoto: state => state.user.userInfo.staffPhoto, // 这个是头像的快捷访问
    companyId: state => state.user.userInfo.companyId, // 建立对于user模块的companyId的快捷访问
    routes: state => state.permission.routes // 建立权限模块下的快捷访问
}
export default getters