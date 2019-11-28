<template>
    <div class="login"  @click="showUl = false">
        <div class="banner">
            <img src="../assets/img/login/banner.jpg" alt="">
        </div>
        <div class="form-w">
            <div class="input-t">
                <div class="area-box" @click.stop>
                    <div class="area-t" @click="showUl = !showUl">
                        <span>+{{phoneCode}}</span>
                        <div class="sanjiao" :class="{'rotate-san': showUl}"></div>
                    </div>
                    <ul class="code-uls" :class="{'show-uls': showUl}">
                        <li v-for="(item, index) in codeArr" :key="index" class="code-list" @click="switchOne(item)">
                            +{{item.code}}
                        </li>
                    </ul>
                </div>
                <input type="text" placeholder="手机号码" v-model.trim="phoneNumber" maxlength="11" class="input-num"
                       @input="checkNum"/>
            </div>
            <input type="password" placeholder="密码" v-model.trim="password" class="input" @input="pwdCheck"/>
            <!--<span class="forget">忘记密码？</span>-->
            <div class="btn-w">
                <button class="btn login-btn no-btn" @click.prevent="submit" :class="{'ok-btn': okLogin, 'loading-btn': loadingLogin}">
                  <img src="../assets/img/login/loading.gif" alt="" class="img" v-show="loadingLogin">
                  <span>登录</span>
                </button>
                <!--<button class="btn regist-btn">注册账号</button>-->
            </div>
            <div class="third-login-btn" @click="thirdLogin">使用Newbabe App登录</div>
            <p class="error">{{errText}}</p>
            <div class="guide-w">
                <h6 class="desc">引导说明</h6>
                <p class="desc">1.您在Newbabe APP的账号，可以在Newbabe官网上登录使用；</p>
                <p class="desc">2.您在Newbabe官网上购买的石油,可以在Newbabe APP上使用;</p>
                <p class="desc">3.您在Newbabe APP上收到的打赏和礼物，同样可以在Newbabe官网兑换成钻石，然后进行提现。</p>
            </div>
        </div>
    </div>
</template>

<script>
    /*eslint-disable*/
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
	              noLogin: false,
	              loadingLogin: false,
	              okLogin: false,
                showUl: false,
                phoneNumber: '',
                password: '',
                phoneCode: '86',
                errText: '',
                codeArr: require('../assets/js/telcode.json'),
                isAndroid: Boolean,
                isiOS: Boolean,
                // flag: true
            }
        },
        created() {
            var u = navigator.userAgent;
            this.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            this.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            this.isweixin = u.toLowerCase().indexOf("micromessenger") >= 0; // 微信
            let _this = this
            document.onkeydown = function (e) {
                if (_this.$route.path === '/login') {
                    let code = e.charCode || e.keyCode
                    if (code === 13) {
                        _this.submit()
                    }
                }
            }
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
                    time: 2000,
                    type: 'txt'
                })
                this.toast.show()
            },
            refresh(sessionid) {
                // let sessionid = localStorage.getItem("sessionid")
                this.$fetch.post('/user/scanLogin', {
                    sessionId: sessionid
                }).then((res) => {
                    if (res.success) {
                        // this.toastD(JSON.stringify(res))
                        this.$router.push('/account')
                        // this.$store.commit('USERINFO', res.data.user)
                        // this.toastD(JSON.stringify(res))
                    }
                })
            },
            thirdLogin() {-
                this.$fetch.post('/user/mobileMakeConn').then((res) => {
                    if (res.success) {
                        let sessionid = res.data
                        if (this.isiOS) {
                            let loadTime = new Date().getTime();
                            location.href = `newbabe://sessionid=${sessionid}`
                            setTimeout(() => {
                                let outTime = new Date().getTime()
                                if (outTime - loadTime < 800) {
                                    this.$router.push('/down')
                                } else {
                                    window.close()
                                }
                            }, 1500)
                        } else if (this.isAndroid) {
                            let loadTime = new Date().getTime();
                            location.href = `newbabe://com.nbmc.nb?sessionid=${sessionid}`;
                            setTimeout(function () {
                                let outTime = new Date().getTime()
                                if (outTime - loadTime < 800) {
                                   this.$router.push('/down')
                                } else {
                                    window.close()
                                }
                            }, 1500)
                        }
                        setInterval(() => {
                           this.refresh(sessionid)
                        }, 5000)
                    }
                })
            },
            pwdCheck () {
	              this.errText = ''
                if (this.phoneNumber !== '' && this.password !== '') {
                    this.okLogin = true
                } else {
                    this.okLogin = false
                }
            },
            checkNum () {
                this.errText = ''
                this.phoneNumber = this.phoneNumber.replace(/[^0-9]/g, '')
                if (this.phoneNumber !== '' && this.password !== '') {
                    this.okLogin = true
                } else {
                    this.okLogin = false
                }
            },
            switchOne(item) {
                this.showUl = false
                this.phoneCode = item.code
            },
            submit() {
                this.errText = ''
                if (this.phoneNumber === '') {
                    this.errText = '请输入手机号码'
                    return
                }
                if (this.password === '') {
                    this.errText = '请输入密码'
                    return
                }
                this.loadingLogin = true
                if (this.phoneNumber !== '' && this.password !== '') {
                    this.$fetch.post('/user/weblogin', {
                        phoneCode: this.phoneCode,
                        phoneNumber: this.phoneNumber,
                        password: this.password
                    }).then(res => {
                        if (res.success) {
                            this.$store.dispatch('getAccountList')
                            this.$router.push('/account')
                        } else {
                            this.errText = res.msg
                        }
	                      this.loadingLogin = false
                    }).catch(() => {
	                      this.loadingLogin = false
                    })
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .login {
        background-color: #fff;
        .banner {
            width: 100%;
            padding: .2rem 0 .6rem;
            img {
                display: block;
                width: 100%;
            }
        }
        .form-w {
            padding: 0 .3rem .8rem .3rem;
            .input-t {
                width: 100%;
                height: .9rem;
                margin-bottom: .4rem;
                display: flex;
                align-items: center;
                border: 1px solid #000;
                .area-box {
                    width: 1.6rem;
                    height: .9rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    cursor: pointer;
                    position: relative;
                    .code-uls {
                        transform: translate(0, 0);
                        overflow: hidden;
                        height: 0;
                        width: 100%;
                        position: absolute;
                        top: 100%;
                        left: -1px;
                        transition: all .3s linear;
                        &.show-uls {
                            border: 1px solid #000;
                            border-top: none;
                            overflow: auto;
                            height: 3rem;
                        }
                        .code-list {
                            width: 100%;
                            height: .6rem;
                            line-height: .6rem;
                            font-size: 12px;
                            text-align: center;
                            background-color: #fff;
                        }
                    }
                    .area-t {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-right: 1px solid #000;
                        width: 1.6rem;
                        height: .9rem;
                        .sanjiao {
                            margin-left: .1rem;
                            width: 0;
                            height: 0;
                            border-left: 6px solid transparent;
                            border-right: 6px solid transparent;
                            border-top: 6px solid #000;
                            transform: rotate(0deg);
                            transition: all .3s linear;
                            &.rotate-san {
                                transform: rotate(180deg);
                            }
                        }
                    }
                }
                .input-num {
                    flex: 1;
                    padding: 0 .3rem;
                    box-sizing: border-box;
                    color: #000;
                    font-size: 12px;
                }
            }
            .forget {
                margin: .1rem 0 .4rem;
                float: right;
                padding: .1rem 0 .1rem .1rem;
            }
            .btn-w {
                width: 100%;
                padding-bottom: .2rem;
                .btn {
                    width: 100%;
                    height: .9rem;
                    font-size: .24rem;
                    line-height: .9rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #fff;
                    img{
                      width: 20px;
                      margin-right: 10px;
                    }
                    &.no-btn{
                        background-color: #dddddd;
                    }
                    &.ok-btn{
                      background-color: #12d0e4;
                    }
                    &.loading-btn{
                        pointer-events: none;
                    }
                }
            }
            .third-login-btn {
                margin: 10px auto;
                width: 100%;
                display: inline-block;
                text-align: center;
                color: #12d0e4;
            }
            .error {
                font-size: .24rem;
                color: #ea3457;
                position: relative;
                margin-top: 0.26rem;
            }
            .guide-w {
                margin-top: .8rem;
                .desc {
                    font-size: .2rem;
                    color: #000;
                    line-height: 2;
                }
            }
        }
        .input {
            width: 100%;
            line-height: .9rem;
            padding: 0 .3rem;
            border: 1px solid #000;
            margin-bottom: .4rem;
        }
    }


</style>


