<template>
  <transition>
    <div class="childPageNext">
      <div class="rechargeDetail">
        <app-header>充值详情</app-header>
        <div class="common-detail">
          <div class="content-title">充值数量：</div>
          <div class="money-box">
            <div class="money">{{rechargeData.size | f2}} L</div>
            <div class="img-box"><img src="../../../assets/img/recharge/oil-recharge.png"></div>
          </div>
        </div>
        <div class="data-box">
          <ul>
            <li>
              <div class="common">充值订单编号：</div>
              <div class="common">{{rechargeData.id}}</div>
            </li>
            <li>
              <div class="common">充值金额：</div>
              <div class="common">￥{{rechargeData.amount | f2}}</div>
            </li>
            <li>
              <div class="common">支付渠道：</div>
              <div class="common">{{paymethod(rechargeData.paymethod)}}</div>
            </li>
            <li v-show="rechargeData.paymethod === 1">
              <div class="common">支付账号：</div>
              <div class="common">{{rechargeData.payBankNumber}}</div>
            </li>
            <li>
              <div class="common">交易时间：</div>
              <div class="common">{{$changeDate(rechargeData.createTime, '/', 1)}}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import appHeader from '../../../components/appHeader'
  export default {
    data() {
      return {
        rechargeData: ''
      }
    },
    created(){
      this.getDetail()
    },
    methods: {
      paymethod(index) {
        if (index === 1) return '银行卡'
        if (index === 2) return '微信'
        if (index === 3) return '支付宝'
        if (index === 4) return '苹果内部'
      },
      getDetail() {
        this.$fetch.post('/order/queryDepositDetail', {
          orderid: this.$route.query.orderid
        }).then(res => {
          if(res.success === true) {
            this.rechargeData = res.data
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
</style>