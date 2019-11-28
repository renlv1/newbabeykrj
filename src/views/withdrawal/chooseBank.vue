<template>
    <transition>
        <div class="childPageNext">
            <app-header>选择银行卡</app-header>
            <ul class="content-box">
                <li class="item" v-for="item in cardsList" :key="item.index"
                    @click="$router.push({
                      name: 'withdrawal',
                      params: {bankName: item.bankName, bankNumber: item.bankNumber.substring(item.bankNumber.length-4), picUrl: item.backup2, id: item.id, remark: item.remark}
                    })">
                    <img width="51" height="51" :src="item.backup2"/>
                    <div class="text-wrapper">
                        <p>{{item.bankName}}</p>
                        <p>{{item.bankNumber}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </transition>
</template>

<script>
    import appHeader from '../../components/appHeader'

    export default {
        name: "chooseBank",
        data() {
            return {
                cardsList: []
            }
        },
        created() {
            this.getBankList()
        },
        methods: {
            getBankList() {
                this.$fetch.post('/bank/queryBankInfoList', {
                    currency: 'CNY',
                    pageSize: 20,
                    pageIndex: 1
                }).then((res) => {
                    this.cardsList = res.data
                })
            },
        },
        components: {
            appHeader
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
</style>
