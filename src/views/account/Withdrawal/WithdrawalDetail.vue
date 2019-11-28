<template>
  <div class="rechargeDetail">
    <app-header>提现详情</app-header>
    <div class="common-detail">
      <div class="content-title">提现金额：</div>
      <div class="box-money">￥5000.00</div>
    </div>
    <div class="data-box">
      <ul>
        <li>
          <div class="common">充值订单编号：</div>
          <div class="common">2555</div>
        </li>
        <li>
          <div class="common">充值金额：</div>
          <div class="common">￥2555</div>
        </li>
        <li>
          <div class="common">支付渠道：</div>
          <div class="common">银联支付</div>
        </li>
        <li>
          <div class="common">支付账号：</div>
          <div class="common">***5555</div>
        </li>
        <li>
          <div class="common">交易时间：</div>
          <div class="common">2019/2/6 1229</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import appHeader from '../../../components/appHeader'
  export default {
    data() {
      return {

      }
    },
    components: {
      appHeader
    }
  }
</script>
<style lang="less" scoped>
.box-money{
  text-align: left;
  font-size: .58rem;
  color: #12d0e4;
}
</style>