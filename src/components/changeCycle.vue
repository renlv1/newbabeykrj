<template>
    <!-- dialog弹出框 -->
    <transition name="mask-bg-fade">
        <div class="mask" v-show="show">
            <div class="mask_bg"></div>
            <transition name="slide-fade">
                <div class="modelBox" v-show="show">
                    <div class="closeModel" v-on:click="closeModel()"></div>
                    <div class="title">修改提现周期</div>
                    <div class="tabs">
                        <ul class="tabs-list">
                            <li v-for="(item, index) in liList" :key="index" @click="choose(index)"
                                :class="{active: currentIndex === index}">{{item}}
                            </li>
                        </ul>
                        <ul class="tabs-content">
                            <li v-for="(item, index) in contentList" :key="index" v-show="currentIndex === index">
                                {{item}}
                            </li>
                        </ul>
                    </div>
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
    import {mapGetters} from 'vuex'

    export default {
        name: "changeCycle",
        data() {
            return {
                show: false,   // 是否显示模态框
                liList: ['月', '周'],
                contentList: ['提示: 按月提现每月10日进行月结', '提示: 每周可提现一次，未月结收入部分提现需要扣除45%，月结日扣除个人所得税后退还多扣除的部分'],
                currentIndex: Number(this.$store.getters.currentcycle) - 1 || 0
            }
        },
        props: {},
        computed: {
            ...mapGetters([
                'currentcycle'
            ])
        },
        methods: {
            closeModel() {
                this.show = false;
            },
            showModel() {
                this.show = true;
            },
            confirmCancel() {
                if (this.$store.getters.currentcycle) {
                    this.currentIndex = Number(this.$store.getters.currentcycle) - 1
                } else {
                    this.currentIndex = 0
                }
                this.$emit('confirmCancel')
            },
            confirmSubmit() {
                this.$emit('confirmSubmit', this.currentIndex)
            },
            choose(index) {
                this.currentIndex = index
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
            .tabs
                height 2.2rem
                .tabs-list
                    width 75%
                    margin 0 auto
                    display flex
                    flex-direction row
                    font-size .24rem
                    height .58rem
                    line-height .58rem
                    li
                        width 50%
                        text-align center
                        border 1px solid #999
                        color #999
                        &.active
                            color #fff
                            background-color #12d0e4
                            border none
                .tabs-content
                    margin .3rem 0 .5rem
                    li
                        color #999
                        line-height 1.4
                        margin 0 auto
                        width 4.8rem
                        text-align center
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
