<template>
    <!-- dialog弹出框 -->
    <transition name="mask-bg-fade">
        <div class="mask" v-show="show">
            <div class="mask_bg"></div>
            <transition name="slide-fade">
                <div class="modelBox" v-show="show">
                    <div class="closeModel" v-on:click="closeModel()"></div>
                    <div class="title">{{title}}</div>
                    <div class="input-group">
                        <input :placeholder="defaultMsg" v-model="message"/>
                    </div>
                    <div class="errText">{{err}}</div>
                    <div class="model_btnBox">
                        <span class="dh_button" v-on:click="confirmCancel()">取消</span>
                        <span class="dh_button" v-on:click="confirmSubmit()">确定</span>
                    </div>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "vueDialog",
        props: {
            title: {
                require: true,
                type: String
            },
            defaultMsg: {
                require: true,
                type: String
            },
            err: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                show: false,   // 是否显示模态框
                message: ''
            }
        },
        watch: {
            message() {
                this.$emit('getMessage', this.message)
            }
        },
        methods: {
            closeModel() {
                this.message = ''
                this.show = false;
            },
            showModel() {
                this.message = ''
                this.show = true;
            },
            confirmCancel() {
                this.$emit('confirmCancel')
                // this.show = false;
                // if (typeof (this.confirmModalOptions.btnCancelFunction) === 'function') {
                //     this.confirmModalOptions.btnCancelFunction()
                // }
            },
            confirmSubmit() {
                this.$emit('confirmSubmit')
                // this.show = false;
                // if (typeof (this.confirmModalOptions.btnSubmitFunction) === 'function') {
                //     this.confirmModalOptions.btnSubmitFunction()
                // }
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .mask
        .mask_bg
            height 100%
            position fixed
            z-index 1000
            top 0
            right 0
            left 0
            bottom 0
            background rgba(0, 0, 0, 0.6)
        .modelBox
            width 80%
            position fixed
            left 50%
            top 50%
            transform translate(-50%, -50%)
            z-index 3000
            background-color #fff
            border-radius 5px
            .title
                text-align center
                margin .6rem 0 .4rem
                font-size .32rem
            .input-group
                padding 0 .3rem
                input
                    height .68rem
                    width 100%
                    border 1px solid #cecece
                    border-radius .04rem
                    color #000
                    text-align center

                input::-webkit-input-placeholder { /* 使用webkit内核的浏览器 */
                    color #b3b3b3
                 }

                input::-moz-placeholder { /* Firefox版本4-18 */
                    color #b3b3b3
                 }

                input::-moz-placeholder { /* Firefox版本19+ */
                    color #b3b3b3
                 }

                input::-ms-input-placeholder { /* IE浏览器 */
                    color #b3b3b3
                 }
            .errText
                color #ff2c55
                margin .3rem
            .model_btnBox
                display flex
                flex 1
                height .8rem
                line-height .8rem
                border-top 1px solid #ebecf0
                width 100%
                span
                    display inline-block
                    flex 1
                    text-align center
                    font-size .32rem
                span:nth-of-type(1)
                    color #d1d1d1
                span:nth-of-type(2)
                    border-left 1px solid #ebecf0
                    color #12d0e4
</style>
