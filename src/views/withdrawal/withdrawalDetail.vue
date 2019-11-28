<template>
    <transition>
        <div class="childPageNext">
            <app-header>提现详情</app-header>
            <div class="box-c">
                <div class="value">
                    <h3>提现金额</h3>
                    <p>￥{{Number(res.drawAmount) * 10}}</p>
                </div>
                <ul class="list">
                    <li>
                        <span>提现订单编号:</span>
                        <span>{{res.id}}</span>
                    </li>
                    <li>
                        <span>提现数量:</span>
                        <span>{{res.drawAmount}}<img class="diamond-icon" width="18" height="15"
                                                     src="../../assets/img/withdrawal/diamondDetail.png"
                                                     alt="diamond-icon"></span>
                    </li>
                    <li>
                        <span>预扣税款:</span>
                        <span>￥{{res.withholdAmount}}</span>
                    </li>
                    <li>
                        <span>到账银行卡:</span>
                        <span v-if="drawBankAccount.bankNumber"><img class="bank-icon" width="23" height="24"
                                                                     :src="res.bankimg"
                                                                     alt="bank-icon">{{drawBankAccount.bankName}}({{drawBankAccount.bankNumber.substring(drawBankAccount.bankNumber.length-4)}})</span>
                    </li>
                </ul>
                <div class="step-wrapper">
                    <p class="title">提现进度</p>
                    <el-steps direction="vertical" :active="2" :space="80">
                        <el-step title="提交提现申请"></el-step>
                        <el-step title="系统处理中" description="预计24小时到账"></el-step>
                        <el-step title="提现结果" :status="errTitle" :description=statusText></el-step>
                    </el-steps>
                    <div class="date-group">
                        <p>{{$changeDate(res.createTime)}}</p>
                        <p>{{$changeDate(res.createTime)}}</p>
                        <p>{{$changeDate(res.updateTime)}}</p>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import appHeader from '../../components/appHeader'

    export default {
        name: "withdrawalDetail",
        data() {
            return {
                statusText: '',
                res: {},
                drawBankAccount: {}
            }
        },
        components: {
            appHeader
        },
        computed: {
            errTitle() {
                if (this.res.status === 4 || this.res.status === 5 || this.res.status === 6) {
                    return 'error'
                } else if (this.res.status === 0 || this.res.status === 1) {
                    return 'default'
                } else {
                    return ''
                }
            }
        },
        created() {
            this.getDetail()
        },
        methods: {
            getDetail() {
                this.$fetch.post('/draw/drawDetail', {
                    transactionid: this.$route.query.transactionid,
                }).then((res) => {
                    if (res.success) {
                        this.res = res.data
                        this.drawBankAccount = JSON.parse(res.data.drawBankAccount)
                        this.statusText = this.$statusType(res.data.status)
                    }
                })
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
        overflow auto
        background-color #fff
        .box-c
            padding: 0 0.3rem;
            position relative
            .value
                width 100%
                padding .5rem 0 .8rem
                h3
                    font-size .28rem
                p
                    margin-top .3rem
                    margin-left -.15rem
                    color #12d0e4
                    font-size .58rem
            .list
                margin-top 1px
                &::after
                    left 0
                    content ''
                    position absolute
                    height 1px
                    width 100%
                    background-color #e8e8e8
                li
                    height .8rem
                    line-height .8rem
                    display flex
                    justify-content space-between
                    span:nth-of-type(2)
                        display flex
                        align-items center
                        .diamond-icon
                            margin-left 5px
                        .bank-icon
                            margin-right 5px
                    &::after
                        left 0
                        content ''
                        position absolute
                        height 1px
                        width 100%
                        background-color #e8e8e8
            .step-wrapper
                position relative
                margin-top 1px
                .title
                    height .8rem
                    line-height .8rem
                .date-group
                    display flex
                    flex-direction column
                    position absolute
                    top 1.3rem
                    right 0
                    font-size .28rem
                    color #999
                    p
                        flex-basis 80px
</style>
