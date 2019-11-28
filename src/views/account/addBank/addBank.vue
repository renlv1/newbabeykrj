<template>
    <div class="recharge">
        <app-header>添加银行卡</app-header>
        <div class="content-box">
            <div class="input-amount">
                <input type="number" v-model.trim="userName" placeholder="姓名">
            </div>
            <div class="input-amount">
                <input type="number" v-model.trim="IDCard" placeholder="身份证号码">
            </div>
            <div class="input-amount">
                <input type="number" v-model.trim="bankCard" placeholder="银行卡号">
            </div>
            <div class="input-amount">
                <input type="number" v-model.trim="bankName" placeholder="支行名称">
            </div>
            <div class="input-amount">
                <input type="number" v-model.trim="mobile" placeholder="银行预留手机号码">
            </div>
            <div class="input-err">{{errTip}}</div>
            <div class="create-order">
                <div class="btn" @click="sureBtn()">确定</div>
            </div>
        </div>
    </div>
</template>

<script>
    /* eslint-disable */
    import appHeader from '../../../components/appHeader'

    export default {
        data() {
            return {
                userName: '',
                IDCard: '',
                bankCard: '',
                bankName: '',
                mobile: '',
                errTip: '请填写相关信息'
            }
        },
        methods: {
            toastD(text) {
                this.toast = this.$createToast({
                    txt: text,
                    time: 2000,
                    type: 'txt'
                })
                this.toast.show()
            },
            verifyErr() {
                if (this.userName === '') {
                    this.errTip = '请输入姓名'
                    this.toast.show()
                    return
                }
                if (this.IDCard === '') {
                    this.errTip = '请输入身份证号码'
                    return
                }
                if (this.bankCard === '') {
                    this.errTip = '请输入银行卡号'
                    return
                }
                if (this.bankName === '') {
                    this.errTip = '请输入支行名称'
                    return
                }
                if (this.mobile === '') {
                    this.errTip = '请输入银行预留手机号码'
                    return
                }
                return true
            },
            // 创建订单
            sureBtn() {
                if (this.verifyErr()) {
                }
            }
        },
        components: {
            appHeader,
        }
    }
</script>

<style lang="less" scoped>
    .content-box {
        margin-top: .5rem;
    }

    .title-tip {
        margin: .5rem 0 .3rem;
        font-size: .24rem;
        color: #999;
    }

    .item-list {
        .uls {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            li {
                margin-right: .2rem;
                margin-bottom: .2rem;
                border: 1px solid #b2b2b2;
                background: #fff;
                border-radius: 4px;
                width: 30%;
                height: .8rem;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: .28rem;
                color: #000000;
                &.activeLi {
                    border: 0;
                    color: #fff;
                    background: #12d0e4;
                }
                &:nth-child(3n) {
                    margin-right: 0;
                }
                .oil-img {
                    width: .28rem;
                    height: .37rem;
                    img {
                        display: block;
                        width: 100%;
                    }
                }
                .number {
                    margin-left: .12rem;
                }
            }
        }
    }

    .other-amount {
        margin: .8rem 0 .2rem;
        font-size: .28rem;
        color: #999;
    }

    .input-err {
        padding: 0 .3rem;
        color: #ff2c55;
        font-size: .24rem;
    }

    .input-amount {
        width: 100%;
        height: 1rem;
        position: relative;
        margin-bottom: .3rem;
        .unit {
            position: absolute;
            right: .3rem;
            top: .35rem;
            font-size: .28rem;
            color: #000;
        }
        input {
            box-sizing: border-box;
            padding: 0 .5rem 0 .3rem;
            height: 1rem;
            border-radius: 4px;
            width: 100%;
            border: 1px solid #cecece;
            font-size: .28rem;
            color: #999;
            &::-webkit-input-placeholder {
                color: #999;
            }
            &:-moz-placeholder {
                color: #999;
            }
            &::-moz-placeholder {
                color: #999;
            }
            &:-ms-input-placeholder {
                color: #999;
            }
        }
    }

    .order-money {
        font-size: .28rem;
        color: #999;
        margin: .5rem 0 .3rem;
    }

    .sum {
        font-size: .32rem;
        color: #000;
        input {
            padding-right: .3rem;
            width: 20%;
        }
    }

    .create-order {
        position: relative;
        .btn {
            padding: 0 .3rem;
            position: fixed;
            bottom: .8rem;
            width: 92%;
            height: 1rem;
            background: #12d0e4;
            border-radius: 4px;
            font-size: .28rem;
            color: #fff;
            letter-spacing: 2px;
            text-align: center;
            line-height: 1rem;
        }
    }
</style>
