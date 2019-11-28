<template>
    <div>
        <div class="phoneHeader" v-show="menuWhiteBgFlag">
            <div class="top-box">
                <img width="105" height="30" src="../assets/img/header/logo.png" alt="logo"
                     @click="$router.push('/home')">
                <img width="21" height="19" src="../assets/img/header/menu.png" @click="showPhoneMenu()"/>
            </div>
            <div class="menuMask" :class="{activeMask: menuFlag}" @click="closeSliderMenu()"></div>
            <div class="popoverMenu" :class="{activeMenu: menuFlag}">
                <a class="close" @click="closeSliderMenu()"><i></i></a>
                <ul class="phoneNav">
                    <li class="phoneNav-li" v-for="(item, index) in nav" :key="index"
                        :class="{active: currentIndex === index}" @click="goPath(index)" v-show="item.show"> {{item.title}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "vHeader",
        data() {
            return {
                menuWhiteBgFlag: true, // 控制默认的头部
                menuFlag: false, // 控制侧边栏弹出来时候蒙层
                currentIndex: 0, // 默认选择第一个元素
                isActive: Boolean, // 控制目录下每个子元素的高亮
            }
        },
        methods: {
            closeSliderMenu() { // 关闭侧边栏
                this.menuFlag = false
            },
            showPhoneMenu() {
                this.menuFlag = true
            },
            goPath(index) {
                this.currentIndex = index
                this.$router.push(this.nav[index].path)
                this.menuFlag = false
            }
        },
        mounted() {
            this.$store.dispatch('getAccountList')
        },
        computed: {
            ...mapGetters([
                'loginFlag',
            ]),
            nav: function () {
                return [
                    {
                        title: '首页',
                        path: '/home',
                        show: true
                    },
                    {
                        title: '靠谱',
                        path: '/reliable',
                        show: true
                    },
                    {
                        title: 'App下载',
                        path: '/down',
                        show: true
                    },
                    {
                        title: '关于我们',
                        path: '/aboutUs',
                        show: true
                    },
                    {
                        title: '登录/充值',
                        path: '/login',
                        show: !this.loginFlag
                    },
                    {
                        title: '个人中心',
                        path: '/account',
                        show: this.loginFlag
                    }
                ]
            }
        },
        watch: {
            '$route.path': function (newVal) {
                if (newVal === '/home') {
                    this.currentIndex = 0
                }
                if (newVal === '/login') {
                    this.currentIndex = 4
                }
                if (newVal === '/account') {
                    this.currentIndex = 5
                }
            }
        },
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .phoneHeader
        height 1.12rem
        position relative
        display block
        .top-box
            height 1.12rem
            background-color #fff
            position fixed
            top 0
            left 0
            width 100%
            display flex
            justify-content space-between
            align-items center
            padding 0 .3rem
            border-bottom 1px solid #e5e5e5
            z-index 20
        .menuMask
            width 100%
            height 100%
            position fixed
            left 0
            bottom 0
            background-color rgba(0, 0, 0, 0.6)
            display none
            z-index 98
            &.activeMask
                display block
        .popoverMenu
            width 3.6rem
            position fixed
            top 0
            right -3.6rem
            background-color #fff
            overflow hidden
            height 100%
            transition all .2s linear
            &.activeMenu
                position fixed
                transition all .2s linear
                top 0
                right 0
                height 100%
                box-shadow 5px 0px 20px rgba(0, 0, 0, 0.6)
                z-index 9999
            .close
                position absolute
                top 0.35rem
                right 0.35rem
                i
                    display block
                    width .3rem
                    height .3rem
                    background url("../assets/img/header/close.png") no-repeat
                    background-size cover
            .phoneNav
                margin-top 1.48rem
                font-size 0.28rem
                .phoneNav-li
                    display block
                    text-align center
                    position relative
                    height 1rem
                    line-height 1rem
                    transition .3s
                    overflow hidden
                    font-size 0.28rem
                    &.active
                        color #12d0e4
                        font-weight bold
                        background-color #e5e5e5

</style>
