import Vue from 'vue'
import Vuex from 'vuex'
import { reqLogin, reqUserInfo } from '../network/api'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: {}
    },
    mutations: {
        /* 赋值获取过来的登录信息给state.userInfo */
        changeUserInfo(state, userInfo) {
            state.userInfo = userInfo
        },
        /* 改变likeList */
        changeLikeList(state, data) {
            let { likeList } = state.userInfo
                //如果是传过来对象，则是添加收藏
            if (typeof data === "object") return likeList.push(data)
                // 如果传过来不是对象，则是取消收藏
            let index = state.userInfo.likeList.findIndex(item => item.product_id == data)
            likeList.splice(index, 1)
        },
        /* 改变收货地址   updateAddress */
        updateAddress(state, data) {
            let index = state.userInfo.addressList.findIndex(item => item.id == data.id)
            state.userInfo.addressList.splice(index, 1, data)
        },
        /* 删除收获地址   deleteAddressMu  */
        deleteAddressMu(state, id) {
            let index = state.userInfo.addressList.findIndex(item => item.id === id)
            state.userInfo.addressList.splice(index, 1)
        },
        /* 新增收获地址   addAddressMu */
        addAddressMu(state, data) {
            state.userInfo.addressList.unshift(data)
        }
    },
    actions: {
        /* 获取api传过来的登录信息 */
        async userLogin(context, userInfo) {
            const { data } = await reqLogin(userInfo)
            const { token } = data
            sessionStorage.setItem("token", token)
            context.commit("changeUserInfo", data)
            router.back() //回到上一页
        },
        /* 获取用户信息 */
        async getUserInfo(context) {
            if (sessionStorage.getItem("token")) {
                const { data } = await reqUserInfo()
                context.commit("changeUserInfo", data)
                    // console.log("获取用户信息", data);
            }
        }
    },
    modules: {}
})