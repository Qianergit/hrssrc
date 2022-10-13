const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    token: state => state.user.token,
    name: state => state.user.UserInfo.username,
    userId: state => state.user.UserInfo.userId,
    staffPhoto: state => state.user.UserInfo.staffPhoto // 这个是头像的快捷访问
}
export default getters