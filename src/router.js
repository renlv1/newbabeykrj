import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'home',
            component: home
        },
        {
            path: '/login', // 附近商家
            name: 'login',
            component: () => import('./views/login')
        },
        {
            path: '/aboutUs',
            name: 'aboutUs',
            component: () => import('./views/aboutUs/aboutUs')
        },
        {
            path: '/down',
            name: 'down',
            component: () => import('./views/down')
        },
        {
            path: '/reliable',
            name: '/reliable',
            component: () => import('./views/reliable/reliable')
        },
        {
            path: '/payOrder', // 支付订单
            name: '/payOrder',
            component: () => import('./views/account/recharge/payOrder')
        },
        {
            path: '/rechargeDetail', // 充值详情
            name: '/rechargeDetail',
            component: () => import('./views/account/transaction/rechargeDetail')
        },
        {
            path: '/WithdrawalRecord', // 提现记录
            name: '/WithdrawalRecord',
            component: () => import('./views/account/Withdrawal/WithdrawalRecord')
        },
        {
            path: '/WithdrawalDetail', // 提现详情
            name: '/WithdrawalDetail',
            component: () => import('./views/account/Withdrawal/WithdrawalDetail')
        },
        {
            path: '/income', // 收入记录
            name: '/income',
            component: () => import('./views/account/income/income')
        },
        {
            path: '/incomeDetail', // 收入详情
            name: '/incomeDetail',
            component: () => import('./views/account/income/incomeDetail')
        },
        {
            path: '/consume', // 消费记录
            name: '/consume',
            component: () => import('./views/account/consume/consume')
        },
        {
            path: '/consumeDetail', // 消费详情
            name: '/consumeDetail',
            component: () => import('./views/account/consume/consumeDetail')
        },
        {
            path: '/account/withdrawal/chooseBank', // 选择银行列表
            name: 'chooseBank',
            component: () => import('./views/withdrawal/chooseBank')
        },
        {
            path: '/account/withdrawal/withdrawalDetail', // 提现详情
            name: 'withdrawalDetail',
            component: () => import('./views/withdrawal/withdrawalDetail')
        },
        {
            path: '/account/withdrawal/addBank', // 增加银行卡
            name: 'addBank',
            component: () => import('./views/withdrawal/addBank')
        },
        {
            path: '/account', // 个人中心
            name: 'account',
            component: () => import('./views/account/account'),
            children: [
                {
                    path: 'withdrawal',  // 提现
                    name: 'withdrawal',
                    component: () => import('./views/withdrawal/withdrawal')
                },
                {
                    path: 'recharge', // 充值
                    name: 'recharge',
                    component: () => import('./views/account/recharge/recharge')
                },
                {
                    path: 'managementBank',  // 提现
                    name: 'managementBank',
                    component: () => import('./views/withdrawal/managementBank')
                },
                {
                    path: 'rechargeRecord', // 充值记录
                    name: 'rechargeRecord',
                    component: () => import('./views/account/transaction/rechargeRecord')
                },
                {
                    path: 'pay', // 支付
                    name: 'pay',
                    component: () => import('./views/account/recharge/pay')
                },
            ]
        }
    ]
})
