<template>
  <div class="childPage">
    <div class="transaction">
      <!--<app-header :hidePull="true" @hideTrade="hideTrade" :dropDown2="dropDown2">{{tradeType}}</app-header>-->
      <div class="app-header">
        <div class="back"  @click="goBack"></div>
        <div class="title" @click="pullDown()">
          {{tradeType}}
          <div class="pull-icon" :class="{down: tradeTypeShow}"></div>
        </div>
      </div>
      <div class="trade-box" v-show="tradeTypeShow">
        <div class="type-box">
          <ul class="uls">
            <li v-for="(item, index) in tradeList" :key="index" @click="chooseType(index, item.tradeType)" :class="{activeLi: activeNum === index}">
              {{item.tradeType}}
            </li>
          </ul>
        </div>
      </div>
      <!--充值-->
      <div class="close-show" v-show="closeTypeShow" @click="closeShow()"></div>
      <div class="recharge" v-show="tradeShow === 0" ref="rechargeRef">
        <ul class="ul-recharge">
          <li v-for="(item, index) in rechargeList" :key="index" @click="$router.push({path:'/rechargeDetail', query:{orderid: item.id}})">
            <div class="li-up">
              <div class="up-left">订单号：{{item.id}}</div>
              <div class="up-right">{{$changeDate(item.createTime, '/', 1)}}</div>
            </div>
            <div class="li-down">
              <div class="down-left">充值石油 {{item.size | f2}}L</div>
              <div class="down-right">￥ {{item.amount | f2}}</div>
            </div>
          </li>
          <v-loading v-show="loadingShow"></v-loading>
          <div class="empty-data" v-show="emptyRecharge">
            <div class="noData"><img src="../../../assets/img/recharge/emptyData.png"></div>
            <p class="text">暂无数据</p>
          </div>
          <!--<v-turnPage v-show="rechargeList.length !== 0" :propsPage="rechargeTotal" @rechargeTrun="rechargeTrunPage" ref="turnPage1"></v-turnPage>-->
        </ul>
      </div>
      <!--提现-->
      <div class="recharge" v-show="tradeShow === 1" ref="withdraw">
        <ul class="ul-recharge">
          <li v-for="(item, index) in WithdrawalList" :key="index" @click="$router.push({path:'/account/withdrawal/withdrawalDetail', query:{transactionid: item.id}})">
            <div class="li-up">
              <div class="up-left">订单号：{{item.id}}</div>
              <div class="up-right">{{$changeDate(item.createDate, '/', 1)}}</div>
            </div>
            <div class="li-down">
              <div class="down-left">提现{{drawCurrency(item.currency)}}</div>
              <div class="down-right" v-show="item.currency === 1"> {{item.amount}}L {{drawCurrency(item.currency)}}</div>
              <div class="down-right" v-show="item.currency === 2 || item.currency === 3"> {{item.amount}} {{drawCurrency(item.currency)}}</div>
            </div>
          </li>
          <v-loading v-show="loadingShow2"></v-loading>
          <div class="empty-data" v-show="emptyWithdrawal">
            <div class="noData"><img src="../../../assets/img/recharge/emptyData.png"></div>
            <p class="text">暂无数据</p>
          </div>
          <!--<v-turnPage v-show="WithdrawalList.length !== 0" :propsPage="withdrawalTotal" @withdrawalTrun="withdrawalTrunPage" ref="turnPage2"></v-turnPage>-->
        </ul>
      </div>
      <!--消费-->
      <div class="recharge" v-show="tradeShow === 2" ref="consumeRef">
        <ul class="ul-recharge">
          <li v-for="(item, index) in consumeList" :key="index" @click="toConsume(item)">
            <div class="li-up">
              <div class="up-left">订单号：{{item.id}}</div>
              <div class="up-right">{{item.createDate}}</div>
            </div>
            <div class="li-down">
              <div class="down-left">{{consumeType(item.consumeType)}}</div>
              <div class="down-right" v-show="item.currency === 1"> {{item.amount | f2}}L <span>{{sendCurrency(item.currency)}}</span></div>
              <div class="down-right" v-show="item.currency === 2"> {{item.amount | f2}} <span>{{sendCurrency(item.currency)}}</span></div>
            </div>
          </li>
          <v-loading v-show="loadingShow3"></v-loading>
          <div class="empty-data" v-show="emptyConsume">
            <div class="noData"><img src="../../../assets/img/recharge/emptyData.png"></div>
            <p class="text">暂无数据</p>
          </div>
          <!--<v-turnPage v-show="consumeList.length !== 0" :propsPage="consumeTotal" @consumeTrun="consumeTrunPage" ref="turnPage3"></v-turnPage>-->
        </ul>
      </div>
      <!--收益-->
      <div class="recharge" v-show="tradeShow === 3" ref="incomeRef">
        <ul class="ul-recharge">
          <li v-for="(item, index) in incomeList" :key="index" @click="toIncomeDetail(item)">
            <div class="li-up">
              <div class="up-left">{{item.nickName}}</div>
              <div class="up-right">{{item.createDate}}</div>
            </div>
            <div class="li-down">
              <div class="down-left">{{incomeType(item.incomeType)}}</div>
              <div class="down-right">{{item.amount | f2}} {{incomeCurrency(item.currency)}}</div>
            </div>
          </li>
          <v-loading v-show="loadingShow4"></v-loading>
          <div class="empty-data" v-show="emptyIncome">
            <div class="noData"><img src="../../../assets/img/recharge/emptyData.png"></div>
            <p class="text">暂无数据</p>
          </div>
          <!--<v-turnPage v-show="incomeList.length !== 0" :propsPage="incomeTotal" @incomeTrun="incomeTrunPage" ref="turnPage4"></v-turnPage>-->
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  // import appHeader from '../../../components/appHeader'
  import BScroll from 'better-scroll'
  export default {
    data() {
      return{
        closeTypeShow: false,
        pageIndex: 1,
        pageIndex2: 1,
        pageIndex3: 1,
        pageIndex4: 1,
        loadingShow: true,
        loadingShow2: true,
        loadingShow3: true,
        loadingShow4: true,
        emptyRecharge: false,
        emptyWithdrawal: false,
        emptyConsume: false,
        emptyIncome: false,
        dropDown: false,
        tradeTypeShow: false,
        activeNum: 0,
        tradeShow: 0,
        tradeType: '充值记录',
        tradeList: [
          {tradeType: '充值记录'},
          {tradeType: '提现记录'},
          {tradeType: '消费记录'},
          {tradeType: '收入记录'}
        ],
        rechargeList: [],
        WithdrawalList: [],
        consumeList: [],
        incomeList: [],
        pageSize: 15,
        rechargeTotal: 0,
        rechargePage: '', // 充值翻页
        withdrawalTotal: 0,
        withdrawalPage: '', // 提现翻页
        consumeTotal: 0,
        consumePage: '', // 消费翻页
        incomeTotal: 0,
        incomePage: '', // 收入翻页
      }
    },
    created() {
      // this.getLogin()
      this.getRechargeList(1)
      // this.getWithdrawalList(1)
      // this.getConsumeList(1)
      // this.getIncomeList(1)
    },
    mounted() {
      this.$nextTick(() => {
        setTimeout(() => {
          this.scroll1 && this.scroll1.refresh()
          this.scroll2 && this.scroll2.refresh()
          this.scroll3 && this.scroll3.refresh()
          this.scroll4 && this.scroll4.refresh()
          this._initScroll()
        }, 20)
        let _this = this
        window.onresize = function () {
          this.scroll1 && _this.scroll1.refresh()
          this.scroll2 && _this.scroll2.refresh()
          this.scroll3 && _this.scroll3.refresh()
          this.scroll4 && _this.scroll4.refresh()
        }
        // if (this.$route.path === '/rechargeRecord') {
        //   window.addEventListener('scroll', this.scrollMoreData, true)
        //   window.addEventListener('scroll', this.scrollMoreData2, true)
        //   window.addEventListener('scroll', this.scrollMoreData3, true)
        //   window.addEventListener('scroll', this.scrollMoreData4, true)
        // }
      })
    },
    methods: {
      // getLogin() {
      //   this.$fetch.post('/user/weblogin', {
      //     phoneCode: 86,
      //     phoneNumber: '13713910329',
      //     password: '123123aA'
      //   }).then(res => {
      //     if (res.success) {
      //       this.$store.dispatch('getAccountList')
      //       this.$router.push('/account')
      //     }
      //   })
      // },
      closeShow() {
        this.closeTypeShow = false
        this.tradeTypeShow = false
      },
      _initScroll () { // 滚动区域
        // if (!this.$refs.dredge) {
        //   return
        // }
        // if (this.scroll) {
        //   this.scroll = new BScroll(this.$refs.dredge, {
        //     click: true,
        //     probeType: 1,
        //     scrollY: true
        //   })
        // }
        // 充值
        this.scroll1 = new BScroll(this.$refs.rechargeRef, {
          click: true,
          probeType: 1,
          pullup: true,
          pulldown: true
        })
        // console.log(this.scroll1)
        // 提现
        this.scroll2 = new BScroll(this.$refs.withdraw, {
          click: true,
          probeType: 1,
          pullup: true,
          pulldown: true
        })
        // 消费
        this.scroll3 = new BScroll(this.$refs.consumeRef, {
          click: true,
          probeType: 1,
          pullup: true,
          pulldown: true
        })
        // 收入
        this.scroll4 = new BScroll(this.$refs.incomeRef, {
          click: true,
          probeType: 1,
          pullup: true,
          pulldown: true
        })
        // 充值数据
        this.scroll1.on('scrollEnd', (pos) => {
          if (!this.loadingShow) {
            return
          }
          if (this.scroll1.y <= (this.scroll1.maxScrollY + 50)) {
            this.pageIndex++
            this.$fetch.post('/order/queryDepositList', {
              status: 2,
              pageIndex: this.pageIndex,
              pageSize: this.pageSize
            }).then(res => {
              if (res.success === true) {
                // this.loadingShow = false
                let getList =  res.data.results
                this.rechargeList = this.rechargeList.concat(getList)
                if (!getList.length || getList.length < this.pageSize) {
                  this.loadingShow = false
                } else {
                  this.loadingShow = true
                }
              } else {
                this.loadingShow = false
                this.emptyRecharge = true
              }
            }).catch(err => {
              this.loadingShow = false
              console.log(err)
            })
          }
        })
        this.scroll1.on('touchEnd', (pos) => {
          if (pos.y > 50) {
            this.pageIndex = 1
            this.getRechargeList(1)
            this.loadingShow = true
          }
        })
        // 提现数据
        this.scroll2.on('scrollEnd', (pos) => {
          if (!this.loadingShow2) {
            return
          }
          if (this.scroll2.y <= (this.scroll2.maxScrollY + 50)) {
            this.pageIndex2++
            this.$fetch.post('/draw/queryDrawListNew', {
              pageIndex: this.pageIndex2,
              pageSize: this.pageSize
            }).then(res => {
              if (res.success === true) {
                // this.loadingShow = false
                let getList =  res.data.results
                this.WithdrawalList = this.WithdrawalList.concat(getList)
                if (!getList.length || getList.length < this.pageSize) {
                  this.loadingShow2 = false
                } else {
                  this.loadingShow2 = true
                }
              } else {
                this.loadingShow2 = false
              }
            }).catch(err => {
              this.loadingShow2 = false
              console.log(err)
            })
          }
        })
        this.scroll2.on('touchEnd', (pos) => {
          if (pos.y > 50) {
            this.pageIndex2 = 1
            this.getWithdrawalList(1)
            this.loadingShow2 = true
          }
        })
        // 消费数据
        this.scroll3.on('scrollEnd', (pos) => {
          if (!this.loadingShow3) {
            return
          }
          if (this.scroll3.y <= (this.scroll3.maxScrollY + 50)) {
            this.pageIndex3++
            this.$fetch.post('/reward/paymentList', {
              pageIndex: this.pageIndex3,
              pageSize: this.pageSize
            }).then(res => {
              if (res.success === true) {
                // this.loadingShow = false
                let getList = res.data.transactionList
                this.consumeList = this.consumeList.concat(getList)
                if (!getList.length || getList.length < this.pageSize) {
                  this.loadingShow3 = false
                } else {
                  this.loadingShow3 = true
                }
              } else {
                this.loadingShow3 = false
              }
            }).catch(err => {
              this.loadingShow3 = false
              console.log(err)
            })
          }
        })
        this.scroll3.on('touchEnd', (pos) => {
          if (pos.y > 50) {
            this.pageIndex3 = 1
            this.getConsumeList(1)
            this.loadingShow3 = true
          }
        })
        // 收入数据
        this.scroll4.on('scrollEnd', (pos) => {
          if (!this.loadingShow4) {
            return
          }
          if (this.scroll4.y <= (this.scroll4.maxScrollY + 50)) {
            this.pageIndex4++
            this.$fetch.post('/reward/incomeList', {
              pageIndex: this.pageIndex4,
              pageSize: this.pageSize
            }).then(res => {
              if (res.success === true) {
                // this.loadingShow = false
                let getList = res.data.transactionList
                this.incomeList = this.incomeList.concat(getList)
                if (!getList.length || getList.length < this.pageSize) {
                  this.loadingShow4 = false
                } else {
                  this.loadingShow4 = true
                }
              } else {
                this.loadingShow4 = false
              }
            }).catch(err => {
              this.loadingShow4 = false
              console.log(err)
            })
          }
        })
        this.scroll4.on('touchEnd', (pos) => {
          if (pos.y > 50) {
            this.pageIndex4 = 1
            this.getIncomeList(1)
            this.loadingShow4 = true
          }
        })
      },
      // 消费
      consumeType(type){
        if (type === 1) return '视频打赏'
        if (type === 2) return '聊天打赏'
        if (type === 3) return '平台打赏'
        if (type === 4) return '活动参与'
        if (type === 5) return '赠送聊天礼物'
      },
      sendCurrency(index) {
        if (index === 1) return '石油'
        if (index === 2) return '钻石'
        if (index === 3) return '积分'
      },
      drawCurrency(index) {
        if (index === 1)  return '石油'
        if (index === 2)  return '钻石'
        if (index === 3)  return '星星'
      },
      //  1 视频打赏  2 聊天打赏  3 退税  4 用户打赏  5 视频打赏抽成  6 聊天打赏退款 7 活动异常退款 9 充值抽成
      incomeType(type) {
        if (type === 1) return '视频打赏'
        if (type === 2) return '聊天打赏'
        if (type === 3) return '退税'
        if (type === 4) return '用户打赏'
        if (type === 5) return '视频打赏抽成'
        if (type === 6) return '聊天打赏退款'
        if (type === 7) return '活动异常退款'
        if (type === 9) return '充值抽成'
        if (type === 10) return '聊天礼物退款'
      },
      incomeCurrency(index) {
        if (index === 1) return '石油'
        if (index === 2) return '钻石'
        if (index === 3) return '积分'
      },
      chooseType(index, type) {
        this._initScroll()
        this.tradeShow = index
        this.activeNum = index
        this.tradeType = type
        this.tradeTypeShow = false
        this.closeTypeShow = false
        this.pageIndex = 1
        this.pageIndex2 = 1
        this.pageIndex3 = 1
        this.pageIndex4 = 1
        if (index === 0) {
          if (this.$refs.turnPage1) {
            this.$refs.turnPage1.resetPage(1)
          }
          this.getRechargeList(1)
        } else if (index === 1) {
          if (this.$refs.turnPage2) {
            this.$refs.turnPage2.resetPage(1)
          }
          this.getWithdrawalList(1)
        } else if (index === 2) {
          if (this.$refs.turnPage3) {
            this.$refs.turnPage3.resetPage(1)
          }
          this.getConsumeList(1)
        } else if (index === 3) {
          if (this.$refs.turnPage4) {
            this.$refs.turnPage4.resetPage(1)
          }
          this.getIncomeList(1)
        }
      },
      // 获取滚动条当前的位置
      getScrollTop () {
        // var scrollTop = 0
        // if (document.documentElement && document.documentElement.scrollTop) {
        //   scrollTop = document.documentElement.scrollTop
        // } else if (document.body) {
        //   scrollTop = document.body.scrollTop
        // }
        return Math.max(document.documentElement.scrollTop, document.body.scrollTop)
      },
      // 获取当前可视区范围的高度
      getClientHeight () {
        var clientHeight = 0
        if (document.body.clientHeight && document.documentElement.clientHeight) {
          clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight)
        } else {
          clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight)
        }
        return clientHeight
      },
      // 获取文档完整的高度
      getScrollHeight () {
        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
      },
      // 充值数据
      // scrollMoreData () {
      //   if (this.rechargeList.length > 0 && this.$route.path === '/rechargeRecord') {
      //     if ((this.getScrollTop() + this.getClientHeight() + 57) >= this.getScrollHeight()) {
      //       if (!this.loadingShow) {
      //         return
      //       }
      //       // alert(this.getScrollTop() + this.getClientHeight())
      //       this.pageIndex++
      //       this.loadingShow = false
      //       this.$fetch.post('/order/queryDepositList', {
      //         status: 2,
      //         pageIndex: this.pageIndex,
      //         pageSize: this.pageSize
      //       }).then(res => {
      //         if (res.success === true) {
      //           // this.loadingShow = false
      //           let getList =  res.data.results
      //           this.rechargeList = this.rechargeList.concat(getList)
      //           if (!getList.length || getList.length < 20) {
      //             this.loadingShow = false
      //           } else {
      //             this.loadingShow = true
      //           }
      //         } else {
      //           this.loadingShow = false
      //           this.emptyRecharge = true
      //         }
      //       }).catch(err => {
      //         this.loadingShow = false
      //         console.log(err)
      //       })
      //     }
      //   }
      // },
      // 提现数据
      // scrollMoreData2 () {
      //   // console.log(this.loadingShow3)
      //   // console.log((this.getScrollTop() + this.getClientHeight() + 57) >= this.getScrollHeight(),1111)
      //   if (this.WithdrawalList.length > 0 && this.$route.path === '/rechargeRecord') {
      //     if ((this.getScrollTop() + this.getClientHeight() + 57) >= this.getScrollHeight()) {
      //       if (!this.loadingShow2) {
      //         return
      //       }
      //       // alert(this.getScrollTop() + this.getClientHeight())
      //       this.pageIndex2++
      //       this.loadingShow2 = false
      //       this.$fetch.post('/draw/queryDrawListNew', {
      //         pageIndex: this.pageIndex2,
      //         pageSize: this.pageSize
      //       }).then(res => {
      //         if(res.success === true) {
      //           // console.log(res.data.transactionList)
      //           let getList =  res.data.results
      //           this.WithdrawalList = this.WithdrawalList.concat(getList)
      //           if (!getList.length || getList.length < 20) {
      //             this.loadingShow2 = false
      //           } else {
      //             this.loadingShow2 = true
      //           }
      //         } else {
      //           this.loadingShow2 = false
      //         }
      //       }).catch(err => {
      //         console.log(err)
      //       })
      //     }
      //   }
      // },
      // 消费数据
      // scrollMoreData3 () {
      //   // console.log(this.loadingShow3)
      //   // console.log((this.getScrollTop() + this.getClientHeight() + 57) >= this.getScrollHeight(),1111)
      //   if (this.consumeList.length > 0 && this.$route.path === '/rechargeRecord') {
      //     if ((this.getScrollTop() + this.getClientHeight() + 57) >= this.getScrollHeight()) {
      //       if (!this.loadingShow3) {
      //         return
      //       }
      //       // alert(this.getScrollTop() + this.getClientHeight())
      //       this.pageIndex3++
      //       this.loadingShow3 = false
      //       this.$fetch.post('/reward/paymentList', {
      //         pageIndex: this.pageIndex3,
      //         pageSize: this.pageSize
      //       }).then(res => {
      //         if(res.success === true) {
      //           // console.log(res.data.transactionList)
      //           let getList =  res.data.transactionList
      //           this.consumeList = this.consumeList.concat(getList)
      //           if (!getList.length || getList.length < 10) {
      //             this.loadingShow3 = false
      //           } else {
      //             this.loadingShow3 = true
      //           }
      //         } else {
      //           this.loadingShow3 = false
      //         }
      //       }).catch(err => {
      //         console.log(err)
      //       })
      //     }
      //   }
      // },
      // 收入数据
      // scrollMoreData4 () {
      //   // console.log(this.loadingShow3)
      //   // console.log((this.getScrollTop() + this.getClientHeight() + 57) >= this.getScrollHeight(),1111)
      //   if (this.incomeList.length > 0 && this.$route.path === '/rechargeRecord') {
      //     if ((this.getScrollTop() + this.getClientHeight() + 57) >= this.getScrollHeight()) {
      //       if (!this.loadingShow4) {
      //         return
      //       }
      //       // alert(this.getScrollTop() + this.getClientHeight())
      //       this.pageIndex4++
      //       this.loadingShow4 = false
      //       this.$fetch.post('/reward/paymentList', {
      //         pageIndex: this.pageIndex4,
      //         pageSize: this.pageSize
      //       }).then(res => {
      //         if(res.success === true) {
      //           // console.log(res.data.transactionList)
      //           let getList =  res.data.transactionList
      //           this.incomeList = this.incomeList.concat(getList)
      //           if (!getList.length || getList.length < 20) {
      //             this.loadingShow4 = false
      //           } else {
      //             this.loadingShow4 = true
      //           }
      //         } else {
      //           this.loadingShow4 = false
      //         }
      //       }).catch(err => {
      //         console.log(err)
      //       })
      //     }
      //   }
      // },
      // 充值数据
      getRechargeList(page) {
        this.$fetch.post('/order/queryDepositList', {
          status: 2,
          pageIndex: page,
          pageSize: this.pageSize
        }).then(res => {
          if (res.success === true) {
            // this.loadingShow = false
            let getList =  res.data.results
            if (getList.length < this.pageSize) {
              this.loadingShow = false
            } else {
              this.loadingShow = true
            }
            if (res.data.results.length === 0) {
              this.emptyRecharge = true
            } else {
              this.rechargeList = res.data.results
              this.emptyRecharge = false
              this.rechargeTotal = res.data.totalPage
            }
          } else {
            this.loadingShow = false
            this.emptyRecharge = true
          }
        }).catch(err => {
          this.loadingShow = false
          console.log(err)
        })
      },
      // 提现数据
      getWithdrawalList(page) {
        this.$fetch.post('/draw/queryDrawListNew', {
          pageIndex: page,
          pageSize: this.pageSize
        }).then(res => {
          if (res.success === true) {
            let getList =  res.data.results
            if (getList.length < this.pageSize) {
              this.loadingShow2 = false
            } else {
              this.loadingShow2 = true
            }
            if (res.data.results.length === 0) {
              this.emptyWithdrawal = true
            } else {
              this.WithdrawalList = res.data.results
              this.emptyWithdrawal = false
              this.withdrawalTotal = res.data.totalPage
            }
          } else {
            this.loadingShow2 = false
            this.emptyWithdrawal = true
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 消费数据
      getConsumeList(page) {
        this.$fetch.post('/reward/paymentList', {
          pageIndex: page,
          pageSize: this.pageSize
        }).then(res => {
          if(res.success === true) {
            // console.log(getList.length < 10,this.loadingShow3)
            if (res.data.transactionList.length === 0) {
              this.emptyConsume = true
            } else {
              this.consumeList = res.data.transactionList
              this.emptyConsume = false
            }
            let getList =  res.data.transactionList
            if (getList.length < this.pageSize) {
              this.loadingShow3 = false
            } else {
              this.loadingShow3 = true
            }
          } else {
            this.loadingShow3 = false
            this.emptyConsume = true
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 收入数据
      getIncomeList(page) {
        this.$fetch.post('/reward/incomeList', {
          pageIndex: page,
          pageSize: this.pageSize
        }).then(res => {
          if(res.success === true) {
            let getList =  res.data.transactionList
            if (getList.length < this.pageSize) {
              this.loadingShow4 = false
            } else {
              this.loadingShow4 = true
            }
            if(res.data.transactionList.length === 0) {
              this.emptyIncome = true
            } else {
              this.incomeList = res.data.transactionList
              this.emptyIncome = false
            }
          } else {
            this.loadingShow4 = false
            this.emptyIncome = true
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 消费详情
      toConsume(item) {
        let data = {
          id: item.id,
          amount: item.amount,
          paymentAmount: item.paymentAmount,
          nickName: item.nickName,
          giftName: item.giftName,
          giftNum: item.giftNum,
          videoTitle: item.videoTitle,
          createDate: item.createDate,
          consumeType: item.consumeType,
          activityName: item.activityName,
          currency: item.currency
        }
        this.$router.push({
          path: '/consumeDetail',
          query: {
            dataInfo: JSON.stringify(data)
          }
        })
      },
      // 收入详情
      toIncomeDetail(item) {
          let data = {
            id: item.id,
            incomeType: item.incomeType,
            nickName: item.nickName,
            giftName: item.giftName,
            giftNum: item.giftNum,
            refundType: item.refundType,
            createDate: item.createDate,
            systemFee: item.systemFee,
            videoTitle: item.videoTitle,
            amount: item.amount,
            remark: item.remark,
            currency: item.currency
          }
          this.$router.push({
            path: '/incomeDetail',
            query: {
              dataInfo: JSON.stringify(data)
            }
          })
      },
      // 充值翻页
      rechargeTrunPage (page) {
        this.rechargePage = page
        this.getRechargeList(page)
      },
      // 提现翻页
      withdrawalTrunPage(page) {
        this.withdrawalPage = page
        this.getWithdrawalList(page)
      },
      // 消费翻页
      consumeTrunPage(page) {
        this.consumePage = page
        this.getConsumeList(page)
      },
      // 收入翻页
      incomeTrunPage(page) {
        this.incomePage = page
        this.getIncomeList(page)
      },
      goBack () {
        if (this.to) {
          this.$router.replace(this.to)
        } else {
          this.$router.go(-1)
        }
      },
      pullDown() {
        this.closeTypeShow = !this.closeTypeShow
        this.tradeTypeShow = !this.tradeTypeShow
      }
    },
    components: {
      vTurnPage: resolve => require(['@/components/turnPage.vue'], resolve),
      vLoading: resolve => require(['@/components/loading.vue'], resolve)
    },
  }
</script>

<style lang="less" scoped>
.header{
  position: relative;
  height: 1.12rem;
}
.app-header{
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 999;
    line-height: 1.12rem;
    text-align: center;
    font-size: 0.36rem;
    font-weight: bold;
    border-bottom: 1px solid #e5e5e5;
    background: #fff;
    .back{
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      background: url("../../../assets/img/recharge/back.png") no-repeat center center;
      width: 0.7rem;
      background-size: .15rem;
    }
    .pull-icon{
      position: absolute;
      left:62%;
      top: 50%;
      transform: translateY(-50%);
      background: url("../../../assets/img/recharge/pull-2.png") no-repeat center center;
      width: .33rem;
      height: .4rem;
      background-size: .2rem;
      &.down{
        position: absolute;
        background: url("../../../assets/img/recharge/pull.png") no-repeat center center;
        left:62%;
        top: 50%;
        transform: translateY(-50%);
        width: .33rem;
        height: .4rem;
        background-size: .2rem;
      }
    }
    .title{
      font-weight: bold;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: inline-block;
      vertical-align: top;
      max-width: 70%;
      font-size: .36rem;
      color: #000000;
    }
  }
.close-show{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 3.92rem;
  left: 0;
  z-index: 98;
  background-color: rgba(0, 0, 0, 0.6);
}
.trade-box{
  width: 100%;
  height: 2.8rem;
  position: fixed;
  top: 1.12rem;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);
  .type-box{
    background: #fff;
    height: 2.8rem;
    width: 100%;
    .uls{
      padding: .4rem .3rem 0;
      display: flex;
      flex-wrap: wrap;
      li{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 32%;
        margin-right: 2%;
        height: .8rem;
        background: #ddd;
        font-size: .28rem;
        color: #999;
        margin-bottom: .4rem;
        &:nth-child(3n){
          margin-right: 0;
        }
        &.activeLi{
          color: #fff;
          background: #12d0e4;
        }
      }
    }
  }
}
.recharge{
  width: 100%;
  overflow: hidden;
  position: fixed;
  top: 1.12rem;
  left: 0;
  bottom: 0;
  /*margin-top: 1.12rem;*/
  .ul-recharge{
    padding-bottom: .2rem;
    position: relative;
    li{
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0 .3rem;
      height: 1.46rem;
      border-bottom: 1px solid #ddd;
      .li-up{
        font-size: .24rem;
        color: #999;
        margin-bottom: .2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .li-down{
        font-size: .28rem;
        color: #19191a;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}
</style>
