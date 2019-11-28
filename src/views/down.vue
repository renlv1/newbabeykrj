<template>
  <div class="down-page c-page">
    <img src="../assets/img/down/img2.png" width="160" alt="">
      <h3>下载Newbabe，即刻开启高端社交</h3>
      <div class="banner">
        <img src="../assets/img/down/img1.png" alt="">
      </div>
      <div class="intro">
        <p>Newbabe，这里是高端社区的入口，也是精英生活的开端。新世界就在你手中，即刻下载，即刻享受</p>
        <div class="down">
          <div class="link" :class="{ios: ios, android: android}" @click="downHandle">立即下载</div>
        </div>
      </div>
      <div v-show="showWxTips" @click="showWxTips = !showWxTips" class="wx-share"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ua: navigator.userAgent.toLowerCase(),
      androidAppUrl: '',
      ios: false,
      android: false,
      showWxTips: false
    }
  },
  methods: {
    downHandle () {
      if (this.ua.includes("micromessenger")) {
        this.showWxTips = true
      } else if (this.ios) {
        window.location.href = 'https://itunes.apple.com/cn/app/newbabe!/id1440465011?l=en&mt=8'
      } else if (this.android) {
        if (this.androidAppUrl) {
          window.location.href = this.androidAppUrl
        } else {
          alert('网络错误， 请刷新重试')
        }
      } else if(this.ua.match(/MicroMessenger/i) === "micromessenger") {
        return true
      }
    }
  },
  mounted () {
    if (this.ua.includes('android')) {
      this.android = true
    }
    if (this.ua.includes('iphone') || this.ua.includes('ipad')) {
      this.ios = true
    }
    this.$fetch.get('https://webapi.newbabe.com/version/version?clientType=4').then(res => {
      if (res.success) {
        this.androidAppUrl = res.data.webUrl
      }
    })
  }
};
</script>

<style lang="less" scoped>
  .down-page{
    text-align: center;
    padding-top: 50px;
    font-size: 16px;
    line-height: 1.4;
  }
  h3{
    color: #000000;
    font-weight: bold;
    font-size: 18px;
    padding: 24px 40px;
  }
  .wx-share{
    background: #17161f url(../assets/img/down/wx.jpg) no-repeat right top;
    background-size: 90%;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 99999;
  }
  img{
    max-width: 100%;
  }
  .intro{
    padding: 0 30px;

  }
  .intro p{
    font-size: 14px;
    padding: 32px 0;
  }
  .down{
    border: 1px solid #000;
  }
  .link{
    line-height: 44px;
    height: 42px;
    padding-left: 26px;
    display: inline-block;
    background-size: 18px !important;
  }
  .ios.link{
    background: url(../assets/img/down/ios.png) no-repeat left center;
  }
  .android.link{
    background: url(../assets/img/down/android.png) no-repeat left center;
  }
  @media screen and (max-width: 375px) {
    .intro p{
      font-size: 13px;
      padding: 20px 0;
    }

  }
  @media screen and (max-width: 320px) {
    .down-page{
      padding-top: 20px;
      > img{
        max-width: 40%;
      }
    }
    .intro p{
      font-size: 13px;
      padding: 20px 0;
    }
  }
</style>
