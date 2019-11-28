<template>
  <div class="rechargeDetail">
    <app-header>消费详情</app-header>
    <div class="common-detail">
      <div class="content-title">消费数量：</div>
      <div class="money-box" v-show="dataInfo.currency === 1">
        <div class="money">{{dataInfo.amount | f2}}L</div>
        <div class="img-box"><img src="../../../assets/img/recharge/oil-recharge.png"></div>
      </div>
      <div class="money-box box-c" v-show="dataInfo.currency === 2">
        <div class="money">{{dataInfo.amount | f2}}</div>
        <div class="img-box"><img src="../../../assets/img/recharge/diamond-detail.png"></div>
      </div>
      <div class="money-box box-c" v-show="dataInfo.currency === 3">
        <div class="money">{{dataInfo.amount | f2}}</div>
      </div>
    </div>
    <div class="data-box" v-show="dataInfo.consumeType === 4">
      <ul>
        <li>
          <div class="common">订单编号：</div>
          <div class="common">{{dataInfo.id}}</div>
        </li>
        <li>
          <div class="common">消费金额：</div>
          <div class="common">￥{{dataInfo.paymentAmount | f2}}</div>
        </li>
        <li>
          <div class="common">活动名称：</div>
          <div class="common">{{dataInfo.activityName}}</div>
        </li>
        <li>
          <div class="common">交易时间：</div>
          <div class="common">{{dataInfo.createDate}}</div>
        </li>
      </ul>
    </div>
    <div class="data-box" v-show="dataInfo.consumeType === 3 || dataInfo.consumeType === 2 || dataInfo.consumeType === 1 || dataInfo.consumeType === 5">
      <ul>
        <li>
          <div class="common">订单编号：</div>
          <div class="common">{{dataInfo.id}}</div>
        </li>
        <li>
          <div class="common">消费金额：</div>
          <div class="common">￥{{dataInfo.paymentAmount | f2}}</div>
        </li>
        <li>
          <div class="common">打赏用户：</div>
          <div class="common">{{dataInfo.nickName}}</div>
        </li>
        <li>
          <div class="common">赠送礼物：</div>
          <div class="common">{{dataInfo.giftName}} * {{dataInfo.giftNum}}</div>
        </li>
        <li v-show="dataInfo.consumeType === 1 && dataInfo.videoTitle">
          <div class="common" >打赏视频：</div>
          <div class="common">{{mTit(dataInfo.videoTitle)}}</div>
        </li>
        <li>
          <div class="common">交易时间：</div>
          <div class="common">{{dataInfo.createDate}}</div>
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
        consumeShow: true,
        dataInfo: JSON.parse(this.$route.query.dataInfo),
        consumeMoney: ''
      }
    },
    created() {
      // this.consumeMoney = this.dataInfo.sendAmount * 5
    },
    methods: {
      mTit (title) {
        if (title.indexOf('&') === title.length - 1) {
          return title.substring(0, title.length - 1)
        } else {
          return title
        }
      },
    },
    components: {
      appHeader
    }
  }
</script>
<style lang="less" scoped>
  .box-c{
    align-items: flex-end;
  }
</style>