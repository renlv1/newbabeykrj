<template>
  <div class="childPageNext">
    <div class="payOrder">
      <app-header>支付订单</app-header>
      <div class="pay-box">
        <div class="pay-title">订单金额</div>
        <div class="total-money">{{total}}元</div>
      </div>
      <div class="pay-type">选择支付方式</div>
      <div class="type-box">
        <ul class="uls">
          <li v-for="(item,index) in typeList" :key="item.index" @click="chooseNum(index)">
            <div class="choose-type">
              <div class="img-box"><img :src="item.imgUrl"></div>
              <div class="number">{{item.text}}</div>
            </div>
            <div class="oil-img" :class="{activeLi: activeNum === index}">
            </div>
          </li>
        </ul>
      </div>
      <div class="create-order">
        <div class="btn" @click="payBtn()">支付订单</div>
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
        activeNum: 0,
        htmls: '',
        typeList: [
          // {
          //   imgUrl: require('../../../assets/img/recharge/WeChat.png'),
          //   text: '微信支付'
          // },
          {
            imgUrl: require('../../../assets/img/recharge/Alipay.png'),
            text: '支付宝支付'
          }
          // {
          //   imgUrl: require('../../../assets/img/recharge/bank-card.png'),
          //   text: '银行卡支付'
          // }
        ],
        total: this.$route.query.total
      }
    },
    created() {
    },
    methods: {
      toastD (text) {
        this.toast = this.$createToast({
          txt: text,
          time: 2000,
          type: 'txt'
        })
        this.toast.show()
      },
      chooseNum(index) {
        this.activeNum = index
      },
      payBtn() {
        this.$fetch.post('/order/createOrder', {
          productid: this.$route.query.id,
          paymethod: this.activeNum + 1,
          oilsize: this.$route.query.oilsize
        }).then(res => {
          if (res.success === true) {
            if (this.activeNum === 3) { // 微信支付
              this.$fetch.post('/wechat/wechatOrder', {
                orderid: res.data.id,
                isIos: 3,
                tradetype: 'MWEB'
              }).then(res => {
                console.log(res)
              })
            } else if (this.activeNum === 0) { // 支付宝支付
                this.$fetch.post('/alipay/alipayOrder', {
                  orderid: res.data.id,
                  type: 3,
              }).then(res => {
                if(res) {
                  let routerData = this.$router.resolve({path:'/pay',query:{htmls:res}})
                  this.htmls = res
                  // window.open(routerData.href,'_ blank')
                  const div = document.createElement('div')
                  div.innerHTML = this.htmls
                  document.body.appendChild(div)
                  document.forms [0] .submit()
                  }
                }).catch(err => {
                  console.log(err)
                })
            } else if (this.activeNum === 2) { // 银行支付
              this.$fetch.post('/bankpay/bankPayOrder', {
                orderId: res.data.id,
                txnAmt: this.$route.query.total
              })
            }
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    components: {
      appHeader
    }
  }
</script>

<style lang="less" scoped>
.pay-box{
  margin-top: .64rem;
  text-align: center;
  padding-bottom: .6rem;
  .pay-title{
    font-size: .28rem;
    color: #333;
    margin-bottom: .46rem;
  }
  .total-money{
    font-size: .5rem;
    color: #000;
  }
}
.pay-type{
  width: 100%;
  background: #f5f5f5;
  height: 1rem;
  line-height: 1rem;
  padding-left: .3rem;
  font-size: .28rem;
  color: #999;
}
.type-box{
  padding: 0 .3rem;
  .uls{
    li{
      align-items: center;
      height: 1.2rem;
      border-bottom: 1px solid #ddd;
      display: flex;
      justify-content: space-between;
      .choose-type{
        display: flex;
        align-items: center;
        .img-box{
          margin-right: .2rem;
          img:nth-of-type(1){
            width: .6rem;
            height: .54rem;
          }
          img:nth-of-type(2){
            width: .66rem;
            height: .66rem;
          }
          img:nth-of-type(3){
            width: .76rem;
            height: .39rem;
          }
        }
        .number{
          font-size: .28rem;
          color: #000;
        }
      }
      .activeLi{
        background: url('../../../assets/img/recharge/choose.png') no-repeat center center;
        width: 34px;
        height: 34px;
        background-size: .4rem;
        img{
          display: block;
          width: 100%;
        }
      }
    }
  }
}
.create-order{
  position: relative;
  padding: 0 .3rem;
  .btn{
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
