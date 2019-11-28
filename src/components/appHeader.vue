<template>
    <div class="container">
        <div class="app-header">
            <div class="back" v-show="!hideReturn" @click="goBack"></div>
            <div class="title" @click="pullDown()">
                <template v-if="title">
                    {{title}}
                </template>
                <slot v-else></slot>
            </div>
            <div class="add" v-show="isAdd" @click="addBank()"></div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dropDown: false
            }
        },
        props: {
            to: String,
            title: String,
            hideReturn: {
                type: Boolean,
                default: false
            },
            isAdd: {
                default: false
            },
            dropDown2: {
                type: Boolean,
                default: false
            },
            hidePull: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            goBack() {
                if (this.to) {
                    this.$router.replace(this.to)
                } else {
                    this.$router.go(-1)
                }
            },
            addBank() {
                this.$emit('addBank')
            },
            pullDown() {
                this.dropDown = !this.dropDown
                this.$emit('hideTrade', false)
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .container {
        height: 1.12rem;
        position: relative;
        .app-header {
            position: fixed;
            width: 100%;
            z-index: 99;
            top 0
            line-height: 1.12rem;
            text-align: center;
            font-size: 0.36rem;
            font-weight: bold;
            border-bottom: 1px solid #e5e5e5;
            background: #fff;
            .back {
                z-index 2
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                background: url(../assets/img/recharge/back.png) no-repeat center center;
                width: 0.7rem;
                background-size: .15rem;
            }
            .pull-icon {
                position: absolute;
                left: 62%;
                top: 50%;
                transform translateY(-50%)
                background: url(../assets/img/recharge/pull-2.png) no-repeat center center;
                width: .33rem;
                height: .4rem;
                background-size: .2rem;
                &.down {
                    position: absolute;
                    background: url(../assets/img/recharge/pull.png) no-repeat center center;
                    left: 62%;
                    top: 50%;
                    transform translateY(-50%)
                    width: .33rem;
                    height: .4rem;
                    background-size: .2rem;
                }
                &.down2 {
                    position: absolute;
                    left: 62%;
                    top: 50%;
                    transform translateY(-50%)
                    background: url(../assets/img/recharge/pull-2.png) no-repeat center center;
                    width: .33rem;
                    height: .4rem;
                    background-size: .2rem;
                }
            }
            .title {
                position relative
                font-size: .36rem;
                color: #000000;
            }
            .add {
                z-index 2
                position: absolute;
                right: 0.3rem;
                top: 0.36rem;
                bottom: 0;
                background: url(../assets/img/header/add.png) no-repeat center center;
                width: 0.4rem;
                height 0.4rem
                background-size: cover;
            }
        }
    }
</style>
