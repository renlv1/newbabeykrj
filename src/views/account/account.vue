<template>
    <div>
        <div>
            <div class="user-info left-right-common base-common">
                <div class="common-left">
                    <img class="avatar" :src="userInfo.userHeadImage" />
                    <div class="info">
                        <p class="user-name">{{userInfo.userName}}</p>
                        <p class="babe-code">+{{userInfo.userPhoneCode}} {{userInfo.userPhoneNumber}}</p>
                    </div>
                </div>
                <div class="common-right" @click="loginOut">
                    <span>切换账号</span>
                    <img width="9" height="14" src="../../assets/img/account/more.png"/>
                </div>
            </div>
            <div class="oil left-right-common base-common">
                <div class="common-left">
                    <div class="img-wrapper">
                        <img width="18" height="24" src="../../assets/img/account/oil.png" alt="oil-icon"/>
                        <span>我的石油（L）</span>
                    </div>
                    <p>{{oil | f2}}</p>
                </div>
                <router-link to="/account/recharge" class="common-right">
                    <img width="20" height="20" src="../../assets/img/account/top-up.png" alt="充值icon"/>
                    <span>充值</span>
                    <img width="9" height="15" src="../../assets/img/account/more.png"/>
                </router-link>
            </div>
            <div class="diamond left-right-common base-common">
                <div class="common-left">
                    <div class="img-wrapper">
                        <img width="27" height="23" src="../../assets/img/account/diamond.png" alt="oil-icon"/>
                        <span>我的钻石</span>
                    </div>
                    <p>{{diamond | f2}}</p>
                </div>
                <router-link to="/account/withdrawal" class="common-right">
                    <img width="18" height="18" src="../../assets/img/account/withdrawal.png" alt="提现icon"/>
                    <span>提现</span>
                    <img width="9" height="15" src="../../assets/img/account/more.png"/>
                </router-link>
            </div>
            <div class="bind-bank-card top-bottom-common base-common">
                <div class="top-common">
                    <span>已绑定银行卡：{{userData.bankNumber}}</span>
                    <router-link to="/account/managementBank" class="common-right">
                        <span>管理银行卡</span>
                        <img width="9" height="15" src="../../assets/img/account/more.png"/>
                    </router-link>
                </div>
                <div class="bottom-common">
                    <p>提现周期：{{$cycleType(currentcycle) || '未设置'}}</p>
                    <div class="bottom-wrapper">
                        <p>每月仅可以修改一次, 修改后下月生效</p>
                        <div class="img-wrapper" @click="openDialog">
                            <span>修改</span>
                            <img width="9" height="15" src="../../assets/img/account/more.png"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="record left-right-common base-common">
                <div class="common-left">
                    <span>交易记录</span>
                </div>
                <router-link to="/account/rechargeRecord" class="common-right">
                    <span>查看</span>
                    <img width="9" height="15" src="../../assets/img/account/more.png"/>
                </router-link>
            </div>
        </div>
        <transition>
            <router-view></router-view>
        </transition>
        <change-cycle @confirmCancel="confirm" @confirmSubmit="submit" ref="validation"></change-cycle>
    </div>

</template>

<script>
    import changeCycle from '../../components/changeCycle'
    import { mapGetters } from 'vuex'

    export default {
        name: "account",
        methods: {
            toastD(text) {
                this.toast = this.$createToast({
                    txt: text,
                    time: 2000,
                    type: 'txt'
                })
                this.toast.show()
            },
            loginOut() { // 切换账号并退出
                this.$store.dispatch('loginOut')
            },
            openDialog() {
                this.$refs.validation.showModel()
            },
            confirm() { // 取消操作
                this.$refs.validation.closeModel()
            },
            submit() { // 确定操作
                this.$fetch.post('/draw/updateWeekOrMonth', {
                    type: this.$refs.validation.currentIndex
                }).then((res) => {
                    if (res.success) {
                        this.$refs.validation.closeModel()
                    } else {
                        this.$refs.validation.closeModel()
                        this.toastD(res.msg)
                    }
                })
            }
        },
        computed: {
            ...mapGetters([
                'userInfo',
                'userData',
                'oil',
                'diamond',
                'currentcycle'
            ])
        },
        created() {
            this.$store.dispatch('getAccountList')
        },
        components: {
            changeCycle,
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .left-right-common
        display flex
        flex-direction row
        justify-content space-between

    .top-bottom-common
        display flex
        flex-direction column
        align-items stretch

    .base-common
        margin 0 .3rem
        padding .3rem
        border 1px solid #7f7f7f
        border-radius 0.1rem
        margin-top .3rem
        &:first-child
            margin-top .5rem

    .user-info
        .common-left
            display flex
            flex-direction row
            .avatar
                display inline-block
                width .8rem
                height .8rem
                border 1px solid #000
                margin-right 0.2rem
            .info
                height .8rem
                line-height .4rem
                .user-name
                    font-size 0.28rem
                .babe-code
                    font-size .24rem
                    color #999
        .common-right
            display flex
            flex-direction row
            align-items center
            span
                color #12d0e4
                font-size .24rem
                margin-right .1rem

    .oil, .diamond
        .common-left
            .img-wrapper
                display flex
                align-items center
                margin-bottom 0.2rem
                img
                    margin-right .2rem
                span
                    color #999
                    font-size .28rem
        .common-right
            display flex
            align-items center
            span
                color #12d0e4
                font-size .24rem
                margin 0 .1rem

    .bind-bank-card
        .top-common
            display flex
            justify-content space-between
            border-bottom 1px solid #e5e5e5
            padding-bottom .3rem
            .common-right
                display flex
                align-items center
                span
                    color #12d0e4
                    font-size .24rem
                    margin-right .1rem
        .bottom-common
            padding-top .3rem
            font-size .24rem
            .bottom-wrapper
                display flex
                flex-direction row
                justify-content space-between
                p
                    margin-top .2rem
                    color #999
                    font-size .2rem
                .img-wrapper
                    display flex
                    align-items center
                    span
                        color #12d0e4
                        font-size .24rem
                        margin 0 .1rem

    .record
        .common-right
            display flex
            align-items center
            span
                color #12d0e4
                font-size .24rem
                margin 0 .1rem
</style>
