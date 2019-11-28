<template>
    <div class="childPage">
        <app-header>提现</app-header>
        <div class="content-wrapper">
            <div class="input-wrapper">
                <input placeholder="请输入提现金额" v-model="drawAmount" @input="checkNumber"/>
                <span class="unit">元</span>
            </div>
            <p>可提现金额: {{canDiamond}}CNY (1.00钻石 = 10.00CNY)</p>
            <p>最少提现金额100CNY</p>

            <p>选择到账银行卡</p>
            <router-link to="/account/withdrawal/chooseBank" class="bank-box" v-if="cardsList.length !== 0">
                <div class="box-left">
                    <img v-if="!$route.params.bankName" width="47" height="48" :src="cardsList[0].backup2"
                         alt="bank-icon"/>
                    <img v-else width="47" height="48" :src="$route.params.picUrl" alt="bank-icon"/>
                    <div class="text-wrapper">
                        <p class="title" v-if="!$route.params.bankName">
                            {{cardsList[0].bankName}}（{{cardsList[0].bankNumber.substring(cardsList[0].bankNumber.length-4)}}）</p>
                        <p class="title" v-else>{{$route.params.bankName}}（{{$route.params.bankNumber}}）</p>
                        <p class="description">预计24小时内到账</p>
                    </div>
                </div>
                <img width="12" height="22" src="../../assets/img/withdrawal/more.png"/>
            </router-link>
            <div class="noData" v-if="cardsList.length === 0">
                暂无银行卡信息
            </div>
            <button class="btn" @click="openDialog" :disabled="isDisable" :class="{disableClass: isDisable}" ref="btn">提现</button>
        </div>
        <vue-dialog title="支付验证" defaultMsg="请输入支付密码" ref="validation" @confirmCancel="confirm" @confirmSubmit="submit"
                    @getMessage="getCode" :err=errText></vue-dialog>
        <transition>
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import appHeader from '../../components/appHeader'
    import vueDialog from '../../components/vueDialog'

    export default {
        name: "withdrawal",
        data() {
            return {
                errText: '',
                drawAmount: '', // 提现金额
                cardsList: [],
                safeCode: '' // 安全验证码
            }
        },
        created() {
            this.getBankList()
        },
        components: {
            appHeader,
            vueDialog
        },
        computed: {
            ...mapGetters([
                'certification',
                'canDiamond'
            ]),
            isDisable() {
                if (this.cardsList.length === 0 || (!Number(this.drawAmount) > 0)) {
                    return true
                } else {
                    return false
                }
            }
        },
        methods: {
            checkNumber() {
                var reg = /^[0-9]+([.]{1}[0-9]{1,2})?$/
                if (!reg.test(this.drawAmount)) {
                    if (this.drawAmount.includes('.')) {
                        let integer = this.drawAmount.split('.')[0]
                        let decimal = this.drawAmount.split('.')[1].substring(0, 2)
                        this.drawAmount = integer + '.' + decimal
                        if (parseInt(integer.substring(0, 1)) === 0 && parseInt(integer.substring(1, 2)) === 0) {
                            this.drawAmount = 0 + '.' + decimal
                        }
                    } else {
                        this.drawAmount = ''
                    }
                } else {
                    if (parseInt(this.drawAmount.substring(0, 1)) === 0 && parseInt(this.drawAmount.substring(1, 2)) === 0) {
                        this.drawAmount = 0
                    }
                }
            },
            getBankList() {
                this.$fetch.post('/bank/queryBankInfoList', {
                    currency: 'CNY',
                    pageSize: 20,
                    pageIndex: 1
                }).then((res) => {
                    if (res.success) {
                        this.cardsList = res.data
                    }
                })
            },
            openDialog() {
                if (this.drawAmount > 0) {
                    this.errText = ''
                    this.$refs.validation.showModel()
                } else {
                    this.$refs.btn.disabled = true
                }
            },
            confirm() { // 取消操作
                this.$refs.validation.closeModel()
            },
            getCode(msg) {
                this.errText = ''
                this.safeCode = msg
            },
            submit() { // 确定操作
                let bankId
                let remark
                if (this.$route.params.id) {
                    bankId = this.$route.params.id
                    remark = this.$route.params.remark
                } else {
                    bankId = this.cardsList[0].id
                    remark = this.cardsList[0].remark
                }
                this.$fetch.post('/draw/createDrawRecord', {
                    drawAmount: this.drawAmount,
                    bankInfoId: bankId,
                    type: this.certification,
                    remark: remark,
                    tradePwd: this.safeCode
                }).then((res) => {
                    if (res.success) {
                        this.$router.push({
                            path: '/account/withdrawal/withdrawalDetail',
                            query: {transactionid: res.data.userPayTransactionId}
                        })
                    } else {
                        this.errText = res.msg || '填写的信息不正确'
                    }
                })
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .disableClass {
        background-color #e8e8e8 !important
    }

    .noData {
        color #ff2c55
        text-align center
    }

    .childPage
        position: fixed;
        top 0
        bottom 0
        left 0
        right 0
        z-index 100
        background-color #fff
        .content-wrapper
            min-height calc(100vh - 1.12rem)
            height 100%
            padding .5rem .3rem 0rem
            .input-wrapper
                input
                    width 100%
                    height 1rem
                    line-height 1rem
                    border 1px solid #cecece
                    border-radius .1rem
                    font-size .28rem
                    padding-left .3rem
                .unit
                    font-size .28rem
                    position absolute
                    right .6rem
                    line-height 1rem
            p:nth-of-type(1), :nth-of-type(2)
                font-size .22rem
                color #999
            p:nth-of-type(1)
                margin-top .2rem
                margin-bottom .1rem
            p:nth-of-type(2)
                margin-bottom .8rem
            p:nth-of-type(3)
                margin-bottom .4rem
                font-size .28rem
            .bank-box
                padding 0 .3rem
                display flex
                justify-content space-between
                align-items center
                flex-direction row
                border 1px solid #808080
                border-radius .1rem
                height 1.5rem
                .box-left
                    display flex
                    flex-direction row
                    .text-wrapper
                        margin-left .25rem
                        line-height 20px
                        p
                            line-height 25px
                            margin 0
                        p:nth-of-type(1)
                            color #000
                            font-size .28rem
                        p:nth-of-type(2)
                            font-size .24rem
                            color #999
            .btn
                letter-spacing 2px
                margin 0 auto
                position absolute
                height 1rem
                line-height 1rem
                border-radius .04rem
                background-color #12d0e4
                width calc(100% - 0.6rem)
                color #fff
                text-align center
                font-size .28rem
                bottom 0.8rem
</style>
