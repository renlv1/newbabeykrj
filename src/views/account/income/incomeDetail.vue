<template>
  <div class="rechargeDetail">
    <app-header>收入详情</app-header>
    <!--收益类型 1 视频打赏  2 聊天打赏  3 退税  4 用户打赏  5 视频打赏抽成  6 聊天打赏退款 7活动异常退款-->
    <div class="common-detail" v-if="dataInfo.incomeType === 6 || dataInfo.incomeType === 10">
      <div class="content-title">退款数量：</div>
      <div class="money-box">
        <div class="money">{{dataInfo.amount | f2}} L</div>
        <div class="img-box"><img src="../../../assets/img/recharge/oil-recharge.png"></div>
      </div>
    </div>
    <div class="common-detail" v-else-if="dataInfo.incomeType === 7">
      <div class="content-title">退款数量：</div>
      <div class="money-box" v-if="dataInfo.currency === 1">
        <div class="money">{{dataInfo.amount | f2}} L</div>
        <div class="img-box"><img src="../../../assets/img/recharge/oil-recharge.png"></div>
      </div>
      <div class="money-box" v-if="dataInfo.currency === 2">
        <div class="money">{{dataInfo.amount | f2}}</div>
        <div class="box-img"><img src="../../../assets/img/recharge/diamond-detail.png"></div>
      </div>
    </div>
    <div class="common-detail" v-else>
      <div class="content-title">收入数量：</div>
      <div class="money-box">
        <div class="money">{{dataInfo.amount | f2}}</div>
        <div class="box-img"><img src="../../../assets/img/recharge/diamond-detail.png"></div>
      </div>
    </div>
    <div class="data-box" v-show="dataInfo.incomeType === 3 || dataInfo.incomeType === 5 || dataInfo.incomeType === 9">
      <ul>
        <li>
          <div class="common">订单编号：</div>
          <div class="common">{{dataInfo.id}}</div>
        </li>
        <li>
          <div class="common">收入类型：</div>
          <div class="common">{{incomeType(dataInfo.incomeType)}}</div>
        </li>
        <li>
          <div class="common">收入来源：</div>
          <div class="common">{{dataInfo.nickName}}</div>
        </li>
        <li>
          <div class="common">交易时间：</div>
          <div class="common">{{dataInfo.createDate}}</div>
        </li>
      </ul>
    </div>
    <div class="data-box" v-show="dataInfo.incomeType === 1 || dataInfo.incomeType === 2 || dataInfo.incomeType === 4 || dataInfo.incomeType === 10">
      <ul>
        <li>
          <div class="common">订单编号：</div>
          <div class="common">{{dataInfo.id}}</div>
        </li>
        <li>
          <div class="common">收入类型：</div>
          <div class="common">{{incomeType(dataInfo.incomeType)}}</div>
        </li>
        <li>
          <div class="common">收入来源：</div>
          <div class="common">{{dataInfo.nickName}}</div>
        </li>
        <li>
          <div class="common">赠送礼物：</div>
          <div class="common">{{dataInfo.giftName}} * {{dataInfo.giftNum}}</div>
        </li>
        <li v-show="dataInfo.incomeType === 1">
          <div class="common">视频标题：</div>
          <div class="common">{{dataInfo.videoTitle}}</div>
        </li>
        <li>
          <div class="common">交易时间：</div>
          <div class="common">{{dataInfo.createDate}}</div>
        </li>
      </ul>
    </div>
    <div class="data-box" v-show="dataInfo.incomeType === 6">
      <ul>
        <li>
          <div class="common">订单编号：</div>
          <div class="common">{{dataInfo.id}}</div>
        </li>
        <li>
          <div class="common">收入类型：</div>
          <div class="common">{{incomeType(dataInfo.incomeType)}}</div>
        </li>
        <li>
          <div class="common">收入来源：</div>
          <div class="common">{{dataInfo.nickName}}</div>
        </li>
        <li>
          <div class="common">赠送礼物：</div>
          <div class="common">{{dataInfo.giftName}}</div>
        </li>
        <li>
          <div class="common">退款理由：</div>
          <div class="common">{{refundType(dataInfo.refundType)}}</div>
        </li>
        <li>
          <div class="common">交易时间：</div>
          <div class="common">{{dataInfo.createDate}}</div>
        </li>
      </ul>
    </div>
    <div class="data-box" v-show="dataInfo.incomeType === 7">
      <ul>
        <li>
          <div class="common">订单编号：</div>
          <div class="common">{{dataInfo.id}}</div>
        </li>
        <li>
          <div class="common">收入类型：</div>
          <div class="common">{{incomeType(dataInfo.incomeType)}}</div>
        </li>
        <li>
          <div class="common">收入来源：</div>
          <div class="common">{{dataInfo.nickName}}</div>
        </li>
        <li>
          <div class="common">赠送礼物：</div>
          <div class="common">{{dataInfo.giftName}}</div>
        </li>
        <li>
          <div class="common">退款理由：</div>
          <div class="common">{{dataInfo.remark}}</div>
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
        consumeShow: 6,
        dataInfo: JSON.parse(this.$route.query.dataInfo)
      }
    },
    methods: {
      //  1 视频打赏  2 聊天打赏  3 退税  4 用户打赏  5 视频打赏抽成  6 聊天打赏退款 7 活动异常退款 9 充值抽成
      incomeType(index) {
        if (index === 1) return '视频打赏'
        if (index === 2) return '聊天打赏'
        if (index === 3) return '退税'
        if (index === 4) return '用户打赏'
        if (index === 5) return '视频打赏抽成'
        if (index === 6) return '聊天打赏退款'
        if (index === 7) return '活动异常退款'
        if (index === 9) return '充值抽成'
        if (index === 10) return '聊天礼物退款'
      },
      refundType(index) {
        if (index === 1) return '用户拒绝'
        if (index === 2) return '超时自动退'
      }
    },
    components: {
      appHeader
    }
  }
</script>
<style lang="less" scoped>
  .box-img{
    img{
      width: .36rem;
      height: .3rem;
    }
  }
</style>