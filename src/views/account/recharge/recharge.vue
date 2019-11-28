<template>
  <div class="childPage">
    <div class="recharge">
      <app-header>充值</app-header>
      <div class="content-box">
        <div class="title-tip">温馨提示：{{oilprice}}.00CNY = {{oilP}}L石油</div>
        <div class="item-list">
          <ul class="uls">
            <li v-for="(item,index) in OilList" :key="item.index" @click="chooseNum(index, item)" :class="{activeLi: activeNum === index}">
              <div class="oil-img"><img src="../../../assets/img/recharge/oil-recharge.png"></div>
              <div class="number">{{item.size}}L</div>
            </li>
          </ul>
        </div>
        <div class="other-amount">其他数量：</div>
        <div class="input-amount">
        <input type="text"  v-model.trim="otherTotal" placeholder="请输入石油数量" @input="vialteInput('otherTotal')">
        <div class="unit">L</div>
        </div>
        <div class="order-money">订单金额：</div>
        <div class="sum" v-show="amountShow">
          <!--<input type="number"  v-model.trim="orderTotal" readonly onpaste="return false">-->
          <!--<div class="cny">元</div>-->
          <p>{{orderTotal}} 元</p>
        </div>
        <div class="sum" v-show="otherShow">
        <!--<input type="number"  v-model.trim="orderTotal" readonly onpaste="return false">-->
        <!--<div class="cny">元</div>-->
        <p>{{otherSum}} 元</p>
        </div>
        <div class="create-order">
          <div class="btn" @click="createBtn()">创建订单</div>
        </div>
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
        orderTotal: '0.00',
        amountShow: true, // 选择数量
        otherShow: false,// 其他数量
        activeNum: 0,
        chooseAmount: '', // 选择数量
        otherTotal: '', // 其他数量
        proId: '',
        oilprice: '',
        oilP: '',
        OilList: []
      }
    },
    created() {
      this.getOilList()
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
      // 获取石油数据
      getOilList () {
        this.$fetch.post('/product/queryOilList', {
          pageIndex: 1,
          pageSize: 30,
          device: 3
        }).then(res => {
          if (res.success) {
            this.OilList = res.data.results
            this.orderTotal = res.data.results[0].total
            this.proId = res.data.results[0].id
            this.oilprice = res.mapData.oilprice
            this.oilP = Number(res.mapData.oilprice) / 5
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 选择数量
      chooseNum(index, item){
        this.proId = item.id
        this.orderTotal = item.total
        this.amountShow = true
        this.otherShow = false
        this.otherTotal = ''
        this.activeNum = index
      },
      // 创建订单
      createBtn(){
        if (this.amountShow) {
          if (this.orderTotal !== '') {
            this.$router.push({
              path: '/payOrder',
              query: {
                total: this.orderTotal,
                id: this.proId,
              }
            })
          } else {
            this.toastD('请选择石油数量')
          }
        } else if (this.otherShow) {
          if (this.otherTotal === '' || Number(this.otherTotal) === 0) {
            this.toastD('请输入石油数量')
          } else if (Number(this.otherTotal) < 1) {
            this.toastD('最低购买数量1L')
          } else if (Number(this.otherTotal) > 200000) {
            this.toastD('最高购买数量20万L')
          } else {
            this.$router.push({
              path: '/payOrder',
              query: {total: this.otherSum, oilsize: this.otherTotal}
            })
          }
        }
      },
      // 其他数量
      vialteInput (field) {
        let val = this[field]
        if (this[field] < 1) {
          this[field] = ''
        } else if (this[field] > 200000) {
          this[field] = '200000'
        }
        if (!/^\d*\.{0,1}\d{0,2}$/.test(val)) { // 不能输入特殊符号+-等,不能输入多个小数点，不能小数点后面超过2位小数
          this[field] = val.substring(0, val.length - 1)
        }
        if (/^\./.test(this[field])) { // 如果是"."
          this[field] = ''
        }
        this[field] = this[field].replace(/[^0-9/.]/g, '') // 只能是数字或者.
        this.amountShow = false
        this.otherShow = true
        this.activeNum = -1
      }
    },
    computed: {
      // orderTotal() {
      //   if (this.chooseAmount !== '') {
      //     return (parseFloat(this.chooseAmount)).toFixed(2)
      //   } else {
      //     return "0.00"
      //   }
      // },
      otherSum() {
        if (this.otherTotal !== '') {
          return ((parseFloat(this.otherTotal)) * Number(this.oilprice)).toFixed(2)
        } else {
          return "0.00"
        }
      },
    },
    components: {
      appHeader,
    }
  }
</script>

<style lang="less" scoped>
.title-tip{
  margin: .5rem 0 .3rem;
  font-size: .24rem;
  color: #999;
}
.item-list{
  margin-top: .5rem;
  .uls{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    li{
      margin-right: .2rem;
      margin-bottom: .2rem;
      border: 1px solid #b2b2b2;
      background: #fff;
      border-radius: 4px;
      width: 30%;
      height: .8rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: .28rem;
      color: #000000;
      &.activeLi{
        border: 0;
        color: #fff;
        background: #12d0e4;
      }
      &:nth-child(3n){
        margin-right: 0;
      }
      .oil-img{
        width: .28rem;
        height: .37rem;
        img{
          display: block;
          width: 100%;
        }
      }
      .number{
        margin-left: .12rem;
      }
    }
  }
}
.other-amount{
  margin: .8rem 0 .2rem;
  font-size: .28rem;
  color: #999;
}
.input-amount{
  width: 100%;
  height: 1rem;
  position: relative;
  .unit{
    position: absolute;
    right: .3rem;
    top: .35rem;
    font-size: .28rem;
    color: #000;
  }
  input{
    box-sizing: border-box;
    padding: 0 .5rem 0 .3rem;
    height: 1rem;
    border-radius: 4px;
    width: 100%;
    border: 1px solid #b2b2b2;
    font-size: .28rem;
    color: #b3b3b3;
    &::-webkit-input-placeholder {
      color: #b3b3b3;
    }
    &:-moz-placeholder {
      color: #b3b3b3;
    }
    &::-moz-placeholder {
      color: #b3b3b3;
    }
    &:-ms-input-placeholder {
      color: #b3b3b3;
    }
  }
}
.order-money{
  font-size: .28rem;
  color: #999;
  margin: .5rem 0 .3rem;
}
.sum{
  font-size: .32rem;
  color: #000;
  position: relative;
  .cny{
    font-size: .32rem;
    color: #000;
    position: absolute;
    right: .3rem;
    top: 0;
  }
  input{
    width: 100%;
    font-size: .32rem;
    color: #000;
    padding-right: .3rem;
    &::-webkit-input-placeholder {
      color: #000;
    }
    &:-moz-placeholder {
      color: #000;
    }
    &::-moz-placeholder {
      color: #000;
    }
    &:-ms-input-placeholder {
      color: #000;
    }
  }
}
.create-order{
 position: relative;
  .btn{
    padding: 0 .3rem;
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