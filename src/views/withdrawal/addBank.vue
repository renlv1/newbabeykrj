<template>
    <transition>
        <div class="childPageNext">
            <app-header>添加银行卡</app-header>
            <div class="container">
                <input @input="clearErrMsg" v-model="userName" placeholder="姓名"/>
                <input @input="clearErrMsg" v-model="idNum" placeholder="身份证号码"/>
                <input @input="clearErrMsg" v-model="bankNum" placeholder="银行卡号"/>
                <input @input="clearErrMsg" v-model="bankName" placeholder="支行名称"/>
                <input @input="clearErrMsg" v-model="numPhone" placeholder="银行预留手机号码"/>
                <p class="errText">{{errMsg}}</p>
                <div class="btn" @click="submit">确定</div>
            </div>
        </div>
    </transition>
</template>

<script>
    import appHeader from '../../components/appHeader'

    export default {
        name: "addBank",
        data() {
            return {
                fullscreenLoading: false,
                errMsg: '',
                userName: '',
                idNum: '',
                bankNum: '',
                bankName: '',
                numPhone: ''
            }
        },
        components: {
            appHeader
        },
        methods: {
            clearErrMsg() {
                this.errMsg = ''
            },
            submit() {
                if (this.userName && this.idNum && this.bankNum && this.bankName && this.numPhone) {
                    const loading = this.$loading({
                        lock: true,
                        text: '信息正在保存中...',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    this.$fetch.post('/bank/addBankInfo', {
                        bankNumber: this.bankNum,
                        realName: this.userName,
                        phone: this.numPhone,
                        subBankName: this.bankName,
                        idNo: this.idNum
                    }).then((res) => {
                        if (res.success) {
                            loading.close();
                            this.$router.go(-1)
                        } else {
                            loading.close();
                            this.errMsg = res.msg
                        }
                    })
                    // this.$router.go(-1)
                } else {
                    this.errMsg = '请填写相关信息'
                }
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .errText {
        margin-top .3rem
        padding-left .3rem
        color #ff2c55
    }

    .childPageNext
        position: fixed;
        top 0
        bottom 0
        left 0
        right 0
        z-index 200
        background-color #fff
        .container
            padding 0 .3rem
            display flex
            flex-direction column
            input
                height 1rem
                line-height 1rem
                padding-left .3rem
                color #000
                margin-top .3rem
                border 1px solid #cecece
                border-radius 4px
                &:nth-of-type(1)
                    margin-top .5rem
            input:
            :-webkit-input-placeholder { /* 使用webkit内核的浏览器 */
                color #b3b3b3
            }

            input:
            :-moz-placeholder { /* Firefox版本4-18 */
                color #b3b3b3
            }

            input:
            :-moz-placeholder { /* Firefox版本19+ */
                color #b3b3b3
            }

            input:
            :-ms-input-placeholder { /* IE浏览器 */
                color #b3b3b3
            }
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
