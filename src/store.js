import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api/api'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: [],
        account: [],
        userData: {},
        loginFlag: false,
        oil: '', // 油
        diamond: '', // 钻石
        canDiamond: '', // 可提现钻石
        certification: Number, // 认证类型
        currentcycle: Number // 当前生效的提现周期(1.按月  2.按周)
    },
    getters: {
        account: state => state.account,
        userInfo: state => state.userInfo,
        userData: state => state.userData,
        loginFlag: state => state.loginFlag,
        oil: state => state.oil,
        diamond: state => state.diamond,
        canDiamond: state => state.canDiamond,
        certification: state => state.certification,
        currentcycle: state => state.currentcycle
    },
    mutations: {
        USERINFO(state, data) {
            state.userInfo = data
            state.currentcycle = state.userInfo.currentcycle
        },
        USER_DATA(state, data) {
            state.userData = data
            state.certification = state.userData.certification
        },
        ACCOUNT(state, data) {
            state.account = data
            state.account.filter(item => {
                if (item.currency === 1) {
                    state.oil = item.balance
                    return state.oil
                } else if (item.currency === 2) {
                    state.diamond = item.balance
                    state.canDiamond = item.canDrawBalance
                    return state.diamond
                }
            })
        },
        LOGIN_FLAG(state, data) {
            state.loginFlag = data
        }
    },
    actions: {
        getAccountList({commit}) {
            api.get('/user/balance').then(res => {
                if (res.success) {
                    commit('USERINFO', res.data.user)
                    commit('USER_DATA', res.data)
                    commit('ACCOUNT', res.data.userAccount)
                    commit('LOGIN_FLAG', true)
                } else {
                    commit('LOGIN_FLAG', false)
                }
            })
        },
        loginOut({commit}) { // 切换账号并退出
            api.get('/user/logout').then((res) => {
                if (res.success) {
                    commit('LOGIN_FLAG', false)
                    commit.userInfo = [] // 清空header用户信息
                    router.push('/login')
                } else {
                    commit('LOGIN_FLAG', true)
                }
            })
        },
    }
})
