<template>
    <transition>
        <div class="childPageNext">
            <app-header isAdd=true @addBank="addBank">选择银行卡</app-header>
            <ul class="content-box">
                <p class="noDataText" v-if="cardsList.length === 0">暂无可选择的银行卡</p>
                <li class="item" v-for="item in cardsList" :key="item.index" @click="openUpDialog(item.id)">
                    <img width="51" height="51" :src="item.backup2"/>
                    <div class="text-wrapper">
                        <p>{{item.bankName}}</p>
                        <p>{{item.bankNumber}}</p>
                    </div>
                </li>
            </ul>
            <commonPopup class="popup-ref" ref="CustomPopupRef">
                <div slot="PoperContent" class="PoperContentView">
                    <div class="ServiceNoteTitle">
                        <p @click="openDelBankDialog">删除银行卡</p>
                        <p @click="closeDialog">取消</p>
                    </div>
                </div>
            </commonPopup>
            <vue-dialog title="验证支付密码" defaultMsg="请输入支付密码" ref="validation" @confirmCancel="confirm"
                        @confirmSubmit="submit"
                        @getMessage="getCode" :err="errText"></vue-dialog>
        </div>
    </transition>
</template>

<script>
    import appHeader from '../../components/appHeader'
    import commonPopup from '../../components/Popup'
    import vueDialog from '../../components/vueDialog'
    import {mapGetters} from 'vuex'

    export default {
        name: "managementBank",
        data() {
            return {
                bankInfoId: Number, // 银行卡信息id
                errText: '', // 错误提示
                flag: Number, // 判断是添加银行卡的弹窗还是删除银行卡的弹窗(1. 添加, 2. 删除)
                safeCode: '',
                cardsList: []
            }
        },
        created() {
            this.getBankList()
        },
        mounted() {
        },
        components: {
            appHeader,
            commonPopup,
            vueDialog
        },
        computed: {
            ...mapGetters([
                'userInfo'
            ])
        },
        methods: {
            toastD(text) {
                this.toast = this.$createToast({
                    txt: text,
                    time: 1000,
                    type: 'txt'
                })
                this.toast.show()
            },
            getBankList() {
                this.$fetch.post('/bank/queryBankInfoList', {
                    currency: 'CNY',
                    pageSize: 20,
                    pageIndex: 1
                }).then((res) => {
                    this.cardsList = res.data
                })
            },
            addBank() {
                if (Number(this.userInfo.openTradePassword) === 2) {
                    this.flag = 1
                    this.$refs.validation.showModel()
                } else {
                    this.toastD('未设置安全密码')
                }
                // this.$router.push('/account/withdrawal/addBank')
            },
            openUpDialog(id) {
                this.bankInfoId = id
                this.$refs.CustomPopupRef.showCustom()
            },
            openDelBankDialog() {
                if (Number(this.userInfo.openTradePassword) === 2) {
                    this.flag = 2
                    this.$refs.CustomPopupRef.maskClick()
                    this.$refs.validation.showModel()
                } else {
                    this.toastD('未设置安全密码')
                }
            },
            delBank() {
                this.$fetch.post('/bank/delBankInfo', { // 删除银行卡
                    bankInfoId: this.bankInfoId
                }).then((res) => {
                    if (res.success) {
                        this.$refs.validation.closeModel()
                        this.toastD('已成功删除')
                        setInterval(() => {
                            this.getBankList()
                        }, 1000)
                    }
                })
            },
            closeDialog() {
                this.$refs.CustomPopupRef.maskClick()
            },
            confirm() { // 取消操作
                this.errText = ''
                this.$refs.validation.closeModel()
            },
            getCode(msg) {
                this.errText = ''
                this.safeCode = msg
            },
            submit() { // 确定操作
                if (this.flag === 1) {
                    this.$fetch.post('/bank/verifyTradePwd', { // 点击添加按钮
                        tradePwd: this.safeCode
                    }).then((res) => {
                        if (res.success) {
                            this.$router.push('/account/withdrawal/addBank') // 去添加页面
                        } else {
                            this.errText = res.msg
                        }
                    })
                } else if (this.flag === 2) {
                    this.$fetch.post('/bank/verifyTradePwd', { // 点击删除按钮
                        tradePwd: this.safeCode
                    }).then((res) => {
                        if (res.success) {
                            this.delBank()
                        } else {
                            this.errText = res.msg
                        }
                    })
                }
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .childPageNext
        position: fixed;
        top 0
        bottom 0
        left 0
        right 0
        z-index 200
        background-color #fff
        .content-box
            padding 0 .3rem
            .item
                padding .4rem 0 .4rem .4rem
                display flex
                flex-direction row
                align-items center
                border-radius .1rem
                margin-top .3rem
                &:nth-of-type(1)
                    background-color #0e7fe2
                    margin-top .5rem
                &:nth-of-type(2)
                    background-color #ff2a52
                &:nth-of-type(3)
                    background-color #36bb7a
                &:nth-of-type(4)
                    background-color #e61a49
                .text-wrapper
                    height 51px
                    display flex
                    flex-direction column
                    justify-content center
                    margin-left .2rem
                    color #fff
                    letter-spacing .5px
                    p
                        &:nth-of-type(1)
                            margin-bottom .2rem
                            font-size .22rem
        .popup-ref
            .PoperContentView
                .ServiceNoteTitle
                    p
                        background-color #fff
                        border-radius 4px
                        height 1rem
                        line-height 1rem
                        font-size .28rem
                        &:nth-of-type(1)
                            color #ff2c55
                        &:nth-of-type(2)
                            margin .2rem 0 .3rem
                            color #808080

</style>
