<template>
  <div class="turnPage" v-if="pages !== 0">
    <div class="pagelist">
      <span class="phTurnPage" :class="{disabled: pstart}" @click="jumpPage(--current_page)">&lt; 上一页</span>
      <span class="jump" :class="{disabled: pstart}" @click="jumpPage(--current_page)">&lt;</span>
      <span v-show="current_page > 5 && pages !== 7 && pages !== 6" class="jump" @click="jumpPage(1)">1</span>
      <span class="ellipsis" v-show="efont">...</span>
      <span class="jump" v-for="num in indexs" :key="num" :class="{bgprimary:current_page==num}" @click="jumpPage(num)">{{num}}</span>
      <span class="ellipsis" v-show="ebehind">...</span>
      <span v-show="current_page > 5 && current_page <= pages - 5" class="jump" @click="jumpPage(pages)">{{pages}}</span>
      <span :class="{disabled: pend}" class="jump" @click="jumpPage(++current_page)">&gt;</span>
      <span class="phTurnPage" :class="{disabled: pend}" @click="jumpPage(++current_page)">下一页 &gt;</span>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
$btn31 = #999// 按钮颜色
.turnPage
  text-align center
  margin-top 40px
  @media screen and (max-width 768px)
    margin-bottom 100px
  .pagelist
    user-select none
    /*margin 30px 0*/
    @media screen and (max-width 768px)
      display flex
      justify-content space-around
    .ellipsis
      color #999
      @media screen and (max-width 768px)
        display none
    .jump
      font-size 20px
      padding 5px 8px
      cursor pointer
      margin-left 5px
      color #999
      &.disabled
        pointer-events none
      @media screen and (max-width 768px)
        display none
      &.bgprimary
        display inline-block
        color $btn31
        @media screen and (max-width 768px)
          font-size 14px
    .phTurnPage
      display none
      font-size 14px
      padding 5px
      &.disabled
        pointer-events none
        color #999
      @media screen and (max-width 768px)
        display inline-block
</style>

<script>
export default{
  props: [
    'propsPage'
  ],
  data () {
    return {
      current_page: 1, // 当前页
      nowIndex: 0
    }
  },
  computed: {
    pages () {
      return this.propsPage
    },
    show () {
      return this.pages && this.pages !== 1
    },
    pstart () {
      return this.current_page === 1
    },
    pend () {
      return this.current_page === this.pages
    },
    efont () {
      if (this.pages <= 7) return false
      return this.current_page > 5
    },
    ebehind () {
      if (this.pages <= 7) return false
      var nowAy = this.indexs
      return nowAy[nowAy.length - 1] !== this.pages
    },
    indexs () {
      var left = 1
      var right = this.pages
      var ar = []
      if (this.pages >= 7) {
        if (this.current_page > 5 && this.current_page < this.pages - 4) {
          left = Number(this.current_page) - 3
          right = Number(this.current_page) + 3
        } else {
          if (this.current_page <= 5) {
            left = 1
            right = 7
          } else {
            right = this.pages
            left = this.pages - 6
          }
        }
      }
      while (left <= right) {
        ar.push(left)
        left++
      }
      return ar
    }
  },
  methods: {
    jumpPage (page) {
      this.current_page = page
      this.$emit('achievementTrunPage', page) // 查看业绩
      this.$emit('rechargeTrun', page) // 充值记录
      this.$emit('withdrawalTrun', page) // 提现记录
      this.$emit('consumeTrun', page) // 消费记录
      this.$emit('incomeTrun', page) // 收入记录
    },
    resetPage (val) {
      this.current_page = val
    }
  }
}
</script>
