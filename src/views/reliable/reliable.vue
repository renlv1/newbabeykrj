<template>
  <div class="wrap-reliable">
    <div class="banner">
      <div class="info-box">
        <div class="img"><img src="../../assets/img/reliable/banner-img.png" alt=""></div>
        <div class="title">Newbabe，真豪车，真社交</div>
        <div class="text">靠谱视频，靠谱玩车，靠谱交友。Newbabe，打造最真实的社交生态，建设专属于千分之一精英的社交圈子。</div>
      </div>
    </div>
    <div class="reliable-list">
      <div class="title">靠谱</div>
      <div class="list">
        <div class="li">
          <div class="img"><img src="../../assets/img/reliable/reliable-list-01.png" alt=""></div>
        </div>
        <div class="li">
          <div class="img"><img src="../../assets/img/reliable/reliable-list-02.png" alt=""></div>
        </div>
        <div class="li">
          <div class="img"><img src="../../assets/img/reliable/reliable-list-03.png" alt=""></div>
        </div>
      </div>
      <div class="list-text">我们拒绝“人造美女”、“虚假富豪”、“灌水内容”</div>
      <div class="list list-02">
        <div class="li">
          <div class="img"><img src="../../assets/img/reliable/reliable-list-04.png" alt=""></div>
        </div>
        <div class="li">
          <div class="img"><img src="../../assets/img/reliable/reliable-list-05.png" alt=""></div>
        </div>
        <div class="li">
          <div class="img"><img src="../../assets/img/reliable/reliable-list-06.png" alt=""></div>
        </div>
      </div>
      <div class="list-text">我们只向你推荐豪车、颜值、才华的人</div>
      <div class="reliable-text">当下的各类社交APP上，每个人都想展示最优秀的自己。于是，<span>“人造美女”</span>、<span>“虚假富豪”</span>层出不穷，活跃在社交平台上，严重影响社交的真诚度。Newbabe设立三种认证机制，豪车、颜值、才华，审核严格，让“假富豪”无所遁形，让素颜美大放光彩。在Newbabe，每一个人都是万里挑一，每一次活动都是精英聚会，绝对靠谱，绝对真实。</div>
    </div>
    <div class="newbabe-introduce">
      <div class="title">NewBabe介绍</div>
      <div class="text-p">Newbabe是⼀个“以豪⻋交友”的⾼端社交平台。这里不仅是全国跑⻋爱好者的聚集地，更是⻘春靓丽⼩姐姐们的舞台。同时，还为八大品牌豪车4S店入驻及二手豪车交易提供便捷的服务。</div>
      <div class="text-p">Newbabe 打造内容创造价值的新型视频社交模式，我们注重知识版权，真正为原创视频、⾸发视频、有传播价值的视频打call。平台将不定期举办线上、线下活动，⾸位纽北皇帝/纽北女神也许就是你。Newbabe快速精准打造⾼端社交圈，豪车＋社交，靠谱，就是这么简单。</div>
      <div class="downward"><img src="../../assets/img/reliable/downward.png" alt=""></div>
      <div class="cars">豪车</div>
      <div class="brand">Newbabe汇聚八大品牌豪车，为用户打造高端线上豪车选购平台，让用户在手机上就可以选购喜爱的豪车。但不仅仅是八大品牌，Newbabe要做的是全世界的品牌豪车。</div>
    </div>
    <div class="swiper-relianble">
      <div class="swiper-info-box">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in merchantsImageData" :key="index">
              <div class="li-box">
                <div class="img"><img :src="item.urlImg" alt=""></div>
                <div class="detail">
                  <div class="detail-info">
                    <div class="logo"><img :src="item.logoImg" alt=""></div>
                    <div class="text-box">
                      <div class="name-cn">{{item.nameCn}}</div>
                      <div class="name-en">{{item.nameEn}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--<div class="swiper-pagination"></div>-->
        </div>
      </div>
    </div>
    <div class="vine">
      <div class="title">短视频</div>
      <div class="text-p">既然是专业的社交平台，怎么能错过短视频这个最展现才华的功能呢？</div>
      <div class="text-p">在Newbabe，用户可以上传自己的短视频， 展现自己的才华，秀出自己的颜值，亮出自己的豪车。既然敢秀，就敢打赏！</div>
      <div class="text-p">用户可以通过充值，对自己喜欢的短视频和好看的小姐姐进行点赞打赏，并且通过点赞打赏的方式搭讪交友。Newbabe，一面记录美好生活，一面进行有趣社交。</div>
      <div class="list-img">
        <div class="li"></div>
        <div class="li"></div>
      </div>
    </div>
    <div class="attestation">
      <div class="title">多元化认证</div>
      <div class="text">三大认证方式，让优秀的你成为纽北KING！</div>
      <div class="spec">车主认证</div>
      <div class="spec-img"></div>
      <div class="spec-text">男⽣以⻋主认证⽅式进⾏认证，⽬前⽀持8⼤品牌。</div>
      <div class="level">颜值认证</div>
      <div class="level-img"></div>
      <div class="level-text">⼩姐姐的主要认证⽅式，身份证、⽣活照正⾯、⼩视频，均要求⽆滤镜⽆美颜的素颜照。</div>
      <div class="level level-tit">才华认证</div>
      <div class="level-img oric"></div>
      <div class="level-text">用户不分男⼥均可申请，申请后，经审核开启准认证状态，准⽤户</div>
    </div>
    <div class="online-and-offline">
      <div class="title">线上 + 线下</div>
      <div class="tit">你以为短视频+打赏就完了？NO！NO！NO！除了在线聊天、小视频分享、线上豪车选购，Newbabe还拥有丰富的线上+线下活动。</div>
      <div class="list">
        <div class="li" v-for="(item,index) in onlineAndOfflineData" :key="index">
          <div class="info">
            <div class="in-title">{{item.title}}</div>
            <div class="logo"><img :src="item.ulrImg" alt=""></div>
            <div class="text-p">{{item.text}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Swiper from "swiper";
  export default {
    data() {
      return {
        itemIndex: 0,
        merchantsImageData: [
          {
            urlImg: require('../../assets/img/reliable/motor-01.jpg'),
            logoImg: require('../../assets/img/reliable/logos/motor-logo01.png'),
            nameCn: '保时捷',
            nameEn: 'PorsChe'
          },
          {
            urlImg: require('../../assets/img/reliable/motor-02.jpg'),
            logoImg: require('../../assets/img/reliable/logos/motor-logo02.png'),
            nameCn: '兰博基尼',
            nameEn: 'Lamborghini'
          },
          {
            urlImg: require('../../assets/img/reliable/motor-03.jpg'),
            logoImg: require('../../assets/img/reliable/logos/motor-logo03.png'),
            nameCn: '法拉利',
            nameEn: 'Ferrari'
          },
          {
            urlImg: require('../../assets/img/reliable/motor-04.jpg'),
            logoImg: require('../../assets/img/reliable/logos/motor-logo04.png'),
            nameCn: '劳斯莱斯',
            nameEn: 'Rolls-Royce'
          },
          {
            urlImg: require('../../assets/img/reliable/motor-05.jpg'),
            logoImg: require('../../assets/img/reliable/logos/motor-logo08.png'),
            nameCn: '玛莎拉蒂',
            nameEn: 'Maserati'
          },
          {
            urlImg: require('../../assets/img/reliable/motor-06.jpg'),
            logoImg: require('../../assets/img/reliable/logos/motor-logo06.png'),
            nameCn: '阿斯顿马丁',
            nameEn: 'Aston Matin'
          },
          {
            urlImg: require('../../assets/img/reliable/motor-07.jpg'),
            logoImg: require('../../assets/img/reliable/logos/motor-logo07.png'),
            nameCn: '宾利',
            nameEn: 'Bentley'
          },
          {
            urlImg: require('../../assets/img/reliable/motor-08.jpg'),
            logoImg: require('../../assets/img/reliable/logos/motor-logo05.png'),
            nameCn: '迈凯伦',
            nameEn: 'McLaren'
          }
        ],
        onlineAndOfflineData: [
          {
            title: 'Newbabe皇帝',
            ulrImg: require('../../assets/img/reliable/crown.png'),
            text: '“Newbabe皇帝”首先会经过系统的筛选，符合条件的男性用户将会进入投票系统，用户可通过充值获取选票，投票最多的用户将有机会和Newbabe皇帝共乘同一辆豪车参与Newbabe的线下活动。'
          },
          {
            title: 'Newbabe女神',
            ulrImg: require('../../assets/img/reliable/goddess.png'),
            text: 'Newbabe会定期选举“Newbabe女神”，用户可以通过充值获得选票，而且选票可以多次获取，为女神投票最多的用户还有机会亲自为女神颁奖。'
          },
          {
            title: '选秀和亲',
            ulrImg: require('../../assets/img/reliable/draft.png'),
            text: '系统会自动为等级高的男性用户匹配 520 个女性好友，男性用户可以通过发视频、打赏钻石等方式来提高这些女性好友的排名，维系和这些女性用户的感情，其中排名前 12 位的女性用户会自动划分为男性用户的后宫。如果出现双方的有缘之人，甚至可以“线下和亲”。'
          },
          {
            title: '线下车友赛',
            ulrImg: require('../../assets/img/reliable/game.png'),
            text: 'Newbabe会为会员定期举办线下车友赛，让车迷们不仅能炫车，还能炫技。'
          }
        ]
      }
    },
    components: {},
    computed: {},
    created() {
    },
    mounted() {
      let swiper = new Swiper(".swiper-container", {
        /*pagination: {
          autoplay: false,
          el : '.swiper-pagination',
          type : 'fraction',
          speed: 3000,
          loop : true
        }*/
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      });
      swiper.slideTo(this.itemIndex)
    },
    beforeDestroy() {
    },
    destroyed() {
    },
    methods: {}
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @100vw: 100vw;
  @100vh: 100vh;
  @hundred: 100%;
  @margin: 0 auto;
  @padding: 0 20px;
  @titFont: .4rem;
  @titColor: #323233;
  @textColor: #979699;
  @center: center;
  @12Font: .24rem;
  @14Font: .28rem;
  @main-titleColor: #000;
  .wrap-reliable{
    width: @100vw;
    min-height: @100vh;
    background-color: #fff;
    .banner{
      width: @hundred;
      padding: @padding;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: @center;
      .info-box{
        width: @hundred;
        padding: .6rem 0;
        .img{
          width: 3.7rem;
          height: 1.6rem;
          margin: @margin;
          img{
            width: @hundred;
          }
        }
        .title{
          font-size: @titFont;
          padding: .4rem 0;
        }
        .text{
          font-size: @12Font;
          color: @textColor;
          line-height: 1.5;
        }
      }
    }
    .reliable-list{
      width: @hundred;
      background-color: #f7f7f7;
      height: auto;
      padding: .8rem 20px 1rem;
      text-align: @center;
      .title{
        font-size: @titFont;
        padding-bottom: .8rem;
      }
      .list{
        width: @hundred;
        display: flex;
        align-items: center;
        justify-content: center;
        .li{
          &:nth-child(1){
            .img{
              width: .92rem;
            }
          }
          &:nth-child(2){
            .img{
              width: .8rem;
              margin: 0 1rem 0 1.28rem;
            }
          }
          &:nth-child(3){
            .img{
              width: .97rem;
            }
          }
          .img{
            height: 1rem;
            margin: @margin;
            position: relative;
            &:after{
              content: '';
              display: block;
              width: .4rem;
              height: .4rem;
              background: url("../../assets/img/reliable/error.png") no-repeat center;
              background-size: cover;
              position: absolute;
              left: 50%;
              bottom: -.6rem;
              z-index: 0;
              transform: translateX(-50%);
            }
            img{
              width: @hundred;
            }
          }
        }
      }
      .list-02{
        .li{
          &:nth-child(1){
            .img{
              width: 1rem;
              height: .63rem;
              &:after{
                bottom: -.78rem;
              }
            }
          }
          &:nth-child(2){
            .img{
              width: 1rem;
              height: 1rem;
              margin: 0 1.22rem 0 1.1rem;
            }
          }
          &:nth-child(3){
            .img{
              width: .68rem;
              height: 1rem;
            }
          }
          .img{
            height: 1rem;
            margin: @margin;
            position: relative;
            &:after{
              content: '';
              display: block;
              width: .4rem;
              height: .26rem;
              background: url("../../assets/img/reliable/correct.png") no-repeat center;
              background-size: cover;
              position: absolute;
              left: 50%;
              bottom: -.6rem;
              z-index: 0;
              transform: translateX(-50%);
            }
            img{
              width: @hundred;
            }
          }
        }
      }
      .list-text{
        font-size: @14Font;
        padding: .8rem 0 1rem;
      }
      .reliable-text{
        line-height: 1.5;
        font-size: @14Font;
        color: @titColor;
        span{
          color: #ea3457;
        }
      }
    }
    .newbabe-introduce{
      width: @hundred;
      padding: @padding;
      .title{
        font-size: .4rem;
        text-align: center;
        padding: 1rem 0 .6rem;
      }
      .text-p{
        font-size: @14Font;
        line-height: 1.5;
        color: @titColor;
        padding-bottom: .6rem;
      }
      .downward{
        width: .19rem;
        height: .3rem;
        margin: .4rem auto 1rem;
        img{
          width: @hundred;
        }
      }
      .cars{
        font-size: .3rem;
        color: #12d0e4;
        text-align: center;
      }
      .brand{
        font-size: @14Font;
        color: #17161f;
        line-height: 1.5;
        padding: .6rem 0;
      }
    }
    .swiper-relianble{
      width: @hundred;
      height: 260px;
      position: relative;
      margin-bottom: 1rem;
      .swiper-info-box{
        width: 100%;
        height: @hundred;
        position: absolute;
        z-index: 0;
        left: 0;
        top: 0;
        .swiper-container{
          width: @hundred !important;
          height: @hundred !important;
          left: 0;
          top: 0;
          .swiper-wrapper{
            width: @hundred !important;
            height: @hundred !important;
            position: absolute !important;
            left: -54px !important;
            .swiper-slide{
              width: 200px !important;
              height: @hundred !important;
              .li-box{
                width: @hundred;
                height: 260px;
                background: url("../../assets/img/reliable/info-box.png") no-repeat center;
                background-size: 100% 100%;
                .img{
                  width: 200px;
                  height: 160px;
                  margin: @margin;
                  img{
                    width: 200px;
                    height: 160px;
                  }
                }
                .detail{
                  width: @hundred;
                  height: 100px;
                  position: relative;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  .detail-info{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .logo{
                      height: .7rem;
                      margin-right: .3rem;
                      img{
                        width: @hundred;
                        height: @hundred;
                      }
                    }
                    .text-box{
                      color: #17161f;
                      .name-cn{
                        font-size: .24rem;
                        padding-bottom: .14rem;
                      }
                      .name-en{
                        font-size: .16rem;
                      }
                    }
                  }
                }
              }
              &:nth-child(1){
                .li-box{
                  .detail{
                    .detail-info{
                      .logo{
                        width: .52rem;
                      }
                    }
                  }
                }
              }
              &:nth-child(2){
                .li-box{
                  .detail{
                    .detail-info{
                      .logo{
                        width: .62rem;
                      }
                    }
                  }
                }
              }
              &:nth-child(3){
                .li-box{
                  .detail{
                    .detail-info{
                      .logo{
                        width: .56rem;
                      }
                    }
                  }
                }
              }
              &:nth-child(4){
                .li-box{
                  .detail{
                    .detail-info{
                      .logo{
                        width: .42rem;
                      }
                    }
                  }
                }
              }
              &:nth-child(5){
                .li-box{
                  .detail{
                    .detail-info{
                      .logo{
                        width: .49rem;
                      }
                    }
                  }
                }
              }
              &:nth-child(6){
                .li-box{
                  .detail{
                    .detail-info{
                      .logo{
                        width: 1.2rem;
                        height: .55rem;
                      }
                    }
                  }
                }
              }
              &:nth-child(7){
                .li-box{
                  .detail{
                    .detail-info{
                      .logo{
                        width: 1.22rem;
                        height: .4rem;
                      }
                    }
                  }
                }
              }
              &:nth-child(8){
                .li-box{
                  .detail{
                    .detail-info{
                      .logo{
                        width: 1.24rem;
                        height: .19rem;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    .vine{
      width: @hundred;
      padding: @padding;
      .title{
        font-size: .3rem;
        color: #12d0e4;
        padding: 1rem 0 .6rem;
        text-align: @center;
      }
      .text-p{
        font-size: @14Font;
        color: #17161f;
        line-height: 1.5;
        padding-bottom: .6rem;
      }
      .list-img{
        width: 334px;
        height: auto;
        margin: @margin;
        position: relative;
        padding-bottom: 3.8rem;
        @media screen and (max-width: 320px){
          width: @hundred;
        }
        .li{
          width: 170px;
          height: 130px;
          position: absolute;
          &:nth-child(1){
            left: 12px;
            top: 0;
            background: url("../../assets/img/reliable/vine-img-01.jpg") no-repeat center;
            background-size: 100% 100%;
          }
          &:nth-child(2){
            right: 12px;
            top: .4rem;
            z-index: 0;
            background: url("../../assets/img/reliable/vine-img-02.jpg") no-repeat center;
            background-size: 100% 100%;
            @media screen and (min-width: 768px){
              right: .44rem;
            }
          }
        }
      }
    }
    .attestation{
      width: @hundred;
      padding: 1rem .4rem 0;
      background-color: #F7F7F7;
      color: #17161f;
      text-align: center;
      .title{
        font-size: @titFont;
        color: @main-titleColor;
      }
      .text{
        font-size: @14Font;
        padding: .4rem 0 1rem;
      }
      .spec{
        font-size: .3rem;
      }
      .spec-img{
        width: 1.18rem;
        height: 1.08rem;
        background: url("../../assets/img/reliable/spec-img.png") no-repeat center;
        background-size: 100% 100%;
        margin: .6rem auto;
      }
      .spec-text{
        font-size: @14Font;
      }
      .level{
        font-size: @titFont;
        text-align: @center;
        padding: 1rem 0 .6rem;
      }
      .level-tit{
        padding-top: 0;
      }
      .level-img{
        width: 1.18rem;
        height: 1.08rem;
        background: url("../../assets/img/reliable/level-img.png") no-repeat center;
        background-size: 100% 100%;
        margin: @margin;
      }
      .level-text{
        font-size: @14Font;
        padding: .6rem 0 1rem;
        line-height: 1.5;
      }
      .oric{
        background: url("../../assets/img/reliable/oric-img.png") no-repeat center;
        background-size: 100% 100%;
      }
    }
    .online-and-offline{
      text-align: @center;
      padding: @padding;
      padding-bottom: 2rem;
      .title{
        font-size: @titFont;
        color: @main-titleColor;
        padding: 1rem .4rem .4rem;
      }
      .tit{
        font-size: @14Font;
        line-height: 1.5;
        padding: .4rem 0 .7rem;
      }
      .list{
        width: 4.8rem;
        margin: @margin;
        .li{
          width: @hundred;
          height: auto;
          border: 1px solid @main-titleColor;
          margin-bottom: .6rem;
          padding-bottom: 1rem;
          .info{
            width: @hundred;
            height: @hundred;
            padding: 20px;
            padding-bottom: .8rem;
            .in-title{
              font-size: @14Font;
              padding-top: .3rem;
              text-align: @center;
              position: relative;
              &:after{
                display: block;
                content: 'EVENT';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                z-index: 2;
                font-size: .13rem;
                color: #cac8cc;
                padding-top: .3rem;
              }
            }
            .logo{
              width: .6rem;
              height: .6rem;
              margin: .6rem auto .5rem;
              img{
                width: @hundred;
                height: @hundred;
              }
            }
            .text-p{
              line-height: 1.5;
            }
          }
        }
      }
    }
  }
</style>
