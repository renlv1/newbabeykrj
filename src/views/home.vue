<template>
    <div class="c-page">
        <div class="banner">
            <img src="@home/banner_car.png" alt="">
            <h3 class="home-title">探寻未来，走进纽北</h3>
            <p class="home-small-title">Explore the future, Into Newbae</p>
        </div>
        <div class="section1">
            <div class="tit">Newbabe是什么？</div>
            <p class="sec-desp">Newbabe是一款<span class="light">“以车交友”</span>的社交APP，是一个只属于小众高端人士的社交平台。</p>
            <ul class="middle-uls">
                <li class="item-list" v-for="(item, index) in NewbabeList" :key="index">
                    <img class="icon-img" :src="item.icon" alt="icon"/>
                    <p class="keyword-item">{{item.title}}</p>
                    <div class="line"></div>
                    <p class="description">{{item.description}}</p>
                </li>
            </ul>
        </div>
        <div class="section2">
            <div class="banner2">
<!--                <p class="banner2-text">Direct<span class="light">&</span>Credible<span-->
<!--                        class="light light2">&</span><br>Reliable</p>-->
            </div>
        </div>
        <div class="section3">
            <div class="box-cont"></div>
            <div class="cont-t-s3">
                <h3 class="sectitle">Newbabe<span class="light">主张</span>是什么？</h3>
                <ul class="sec-uls">
                    <li class="sec-list">
                        <img src="@home/n1.png" alt="">
                    </li>
                    <li class="sec-list">
                        <img src="@home/n2.png" alt="">
                    </li>
                    <li class="sec-list">
                        <img src="@home/n3.png" alt="">
                    </li>
                    <li class="sec-list">
                        <img src="@home/n4.png" alt="">
                    </li>
                </ul>
                <p class="description">交友就要大方直接，聊天就要一字千金，约会就要真实靠谱。Newbabe 删减99%无效社交，为你找到属于1%的TA</p>
            </div>
        </div>
        <div class="section4">
            <h3 class="sectitle">Newbabe<span class="light">特色</span>是什么？</h3>
            <div class="section-list-title">
                <img src="@home/numberOne.png" alt=""><span>豪车买卖</span>
            </div>
            <p class="description">线下4S店发布豪车资源，用户可以在Newbabe线上选车，线下试车。未来还有更多品牌豪车入驻，用户还可以自主发布二手豪车买卖信息。</p>
            <!--<ul class="pic-uls">-->
            <!--<li v-for="(img, index) in 8" :key="index" class="list-item-car">-->
            <!--<img :src="require('@home/car_logo/'+index+'.png')" alt="豪车logo"/>-->
            <!--</li>-->
            <!--</ul>-->
            <!-- Swiper -->
            <div class="swiper-container">
                <div class="swiper-wrapper pic-uls">
                    <div class="swiper-slide list-item-car" v-for="(img, index) in 8" :key="index">
                        <img :src="require('@home/car_logo/'+index+'.png')" alt="豪车logo"/>
                    </div>
                </div>
                <div class="swiper-button-next" tabindex="0" role="button" aria-label="Next slide"
                     aria-disabled="false">
                </div>
                <div class="swiper-button-prev" tabindex="0" role="button" aria-label="Previous slide"
                     aria-disabled="false">
                </div>
            </div>
            <div class="line-solid">
                <img src="@home/soild_line.png"/>
            </div>
            <div class="section-list-title">
                <img src="@home/numberTwo.png" alt=""><span>专属社交圈</span>
            </div>
            <p class="description">Newbabe的客户定位为有财富、有颜值、有才华的高端人士群体,因此Newbabe所打造的也是专属于高端社会精英的社交生态圈。</p>
            <p class="description last-desc">
                在NewbabeAPP中，你可以和有风度的豪车主聊天交友，可以为靓丽好看的小姐姐打赏点赞，还可以上传自己制作的短视频，分享生活中的点滴。正如最初所说的那样，Newbabe ，为“豪车+社交”而生。</p>
        </div>
        <div class="section5">
            <h3 class="sec5-title">豪车社群</h3>
            <p class="description">物以类聚，人以群分。Newbabe 建立自动运转的、去中心化的生态圈，让同款豪车车主在 Newbabe 相遇，让更多相同爱好的人在 Newbabe
                产生关系，迸发裂变的火花，创造更多社交机会。</p>
            <ul class="banner-uls">
                <li class="banner-list" v-for="(item, index) in carContent" :key="index"
                    v-show="index === currentIndex">
                    <img :src="item.imgUrl" alt="">
                </li>
            </ul>
            <ul class="icon-uls">
                <li class="icon-list" @click="switchOne(index)" :class="{'active-list': index === currentIndex}"
                    v-for="(item, index) in carContent" :key="index">
                    <img :src="item.icoImg" alt="">
                </li>
            </ul>
            <ul class="text-uls">
                <li class="text-list" v-for="(item, index) in carContent" :key="index" v-show="index === currentIndex">
                    <p class="desc">{{item.description1}}</p>
                    <p class="desc last-desc">{{item.description2}}</p>
                </li>
            </ul>
        </div>
        <div class="section6">
            <!--<p class="text1">下载</p>-->
            <!--<p class="text2">Download</p>-->
            <p class="text3">Newbabe APP</p>
            <p class="text4">更多好玩，更多好看，更多有趣，尽在 Newbabe APP。</p>
            <div class="btn-down-w" @click="$router.push('/down')">
                <div class="down-icon-w">
                    <img src="@home/arrow_bottom.png" alt="">
                </div>
                <span class="dowm-t">下载 Newbabe</span>
            </div>
        </div>
        <div class="section7">
            <h3 class="sec-title">Newbabe 活动专区</h3>
            <p class="title-des">Newbabe 将在建立了前期优势的同时，积极拓展线上+线下的活动，将网络和现实相结合，为高端人士群体提供更多有趣的活动，其中包括：</p>
            <ul class="activity-uls">
                <li v-for="(item, index) in NewbabeActivity" :key="index" class="activity-list">
                    <div class="activity-t">
                        <span class="subtitle">{{item.subtitle}}</span>{{item.title}}
                    </div>
                    <div class="img-box">
                        <img :src="item.urlLink" alt="" class="car-img">
                        <div class="hover-w">
                            <img :src="item.icon" alt="" class="icon-hover">
                            <p class="activity-desc">{{item.description}}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import Swiper from 'swiper'

    export default {
        data() {
            return {
                currentIndex: 0,
                NewbabeActivity: [
                    {
                        subtitle: 'EVENT',
                        title: 'Newbabe皇帝',
                        urlLink: require('@home/activity_car1.jpg'),
                        icon: require('@home/activity_icon1.png'),
                        description: 'Newbabe皇帝”首先会经过系统的筛选，符合条件的男性用户将会进入投票系统，用户通过充值获取选票，投票最多的用户将有机会和Newbabe皇帝共乘一辆豪车参与Newbabe的线下活动。'
                    },
                    {
                        subtitle: 'EVENT',
                        title: 'Newbabe女神',
                        urlLink: require('@home/activity_car2.jpg'),
                        icon: require('@home/activity_icon2.png'),
                        description: 'Newbabe会定期选举“Newbabe女神”，用户可以通过充值获得选票，而且选票可以多次获取，为女神投票最多的用户还有机会亲自为女神颁奖。'
                    },
                    {
                        subtitle: 'EVENT',
                        title: '选秀和亲',
                        urlLink: require('@home/activity_car3.jpg'),
                        icon: require('@home/activity_icon3.png'),
                        description: '系统会自动为等级高的男性用户匹配 520 个女性好友，男性用户可以通过发视频、打赏钻石等方式来提高这些女性好友的排名，维系和这些女性用户的感情，其中排名前 12 位的女性用户会自动划分为男性用户的后宫。如果出现双方的有缘之人，甚至可以“线下和亲”。'
                    },
                    {
                        subtitle: 'EVENT',
                        title: '线下车友比赛',
                        urlLink: require('@home/activity_car4.jpg'),
                        icon: require('@home/activity_icon4.png'),
                        description: 'Newbabe会为会员定期举办线下车友赛，让车迷们不仅能炫车，还能炫技。'
                    }],
                carContent: [
                    {
                        icoImg: require('@home/section5_icon1.png'),
                        imgUrl: require('@home/section5_img1.jpg'),
                        title: '同款车友',
                        description1: '想不想找到和你开同款豪车的车友？想不想和他们就同款豪车痛快交谈? Newbabe，为同款豪车用户创建专属社群。',
                        description2: '这里有：保时捷社群、兰博基尼社群等各种豪车社群。你们可以加好友,聊豪车，秀知识，......'
                    }, {
                        icoImg: require('@home/section5_icon2.png'),
                        imgUrl: require('@home/section5_img2.jpg'),
                        title: '豪车社区',
                        description1: 'Newbabe豪车社群功能，只有同款豪车认证用户才可加入。更有专属同款豪车车友群等你加入。',
                        description2: '搜热点，找话题，社群内的精彩根本停不下来！'
                    }, {
                        icoImg: require('@home/section5_icon3.png'),
                        imgUrl: require('@home/section5_img3.jpg'),
                        title: '豪车聚会',
                        description1: '朋友，这周末你有空吗？豪车、美女和香槟之间充满火花的碰撞，当然少不了大型豪车聚会。',
                        description2: '官方号召，社群组织, 只为了让用户们寻找更多乐趣...'
                    }],
                NewbabeList: [
                    {
                        icon: require('@home/p1.png'),
                        title: '豪',
                        description: '八大品牌，豪车配置，演绎速度与激情'
                    },
                    {
                        icon: require('@home/p2.png'),
                        title: '财',
                        description: '商界精英，低调富豪，在Newbabe与你相遇'
                    },
                    {
                        icon: require('@home/p3.png'),
                        title: '貌',
                        description: '去掉镁光灯和滤镜，依旧是众人的焦点'
                    },
                    {
                        icon: require('@home/p4.png'),
                        title: '才',
                        description: '唱歌跳舞，搞笑逗乐，内容创造价值，才华改变人生'
                    },
                    {
                        icon: require('@home/p5.png'),
                        title: '千分之一',
                        description: '高端小众,私信聊天,Newbabe只为千分之一的人提供社交'
                    }
                ]
            }
        },
        mounted() {
            new Swiper('.swiper-container', {
                slidesPerView: 3,
                spaceBetween: 30,
                slidesPerGroup: 3,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            })
        },
        methods: {
            switchOne(index) {
                this.currentIndex = index
            }
        }
    }
</script>

<style lang="less" scoped>
    @light: #12d0e4;
    .c-page {
        background-color: #fff;
        .banner {
            padding: 1.2rem 0;
            margin: 0 auto;
            img {
                width: 3.7rem;
                display: block;
                margin: 0 auto .6rem;
            }
            .home-title {
                font-size: .4rem;
                color: #323233;
                text-align: center;
            }
            .home-small-title {
                font-size: .2rem;
                color: #b1afb3;
                text-align: center;
                margin-top: .4rem;
            }
        }
        .section1 {
            padding-top: 1rem;
            .tit {
                font-size: .4rem;
                color: #000;
                text-align: center;
            }
            .sec-desp {
                padding: 0 .4rem;
                margin: .4rem 0 1rem;
                font-size: .18rem;
                text-align: center;
                color: #323222;
                line-height: 2;
                .light {
                    color: #12d0e4;
                }
            }
            .middle-uls {
                display: flex;
                // align-items: center;
                flex-wrap: wrap;
                .item-list {
                    width: 50%;
                    display: flex;
                    // align-items: center;
                    // justify-content: center;
                    flex-direction: column;
                    padding: 0 .3rem;
                    margin-bottom: 1rem;
                    .icon-img {
                        width: .72rem;
                        display: block;
                        margin: 0 auto;
                    }
                    .keyword-item {
                        padding: .4rem 0 .3rem;
                        white-space: nowrap;
                        margin: 0 auto;
                        text-align: center;
                        color: #010101;
                        font-size: .3rem;
                    }
                    .line {
                        width: .8rem;
                        margin: 0 auto;
                        border-top: .04rem solid #323233;
                    }
                    .description {
                        font-size: .18rem;
                        line-height: 2;
                        color: #323233;
                        text-align: center;
                        margin-top: .2rem;
                    }
                }
            }
        }
        .section2 {
            padding-bottom: .6rem;
            .banner2 {
                position: relative;
                background: url("../assets/img/home/banner_girl.jpg") no-repeat center / cover;
                width: 100%;
                height: 3.2rem;
                .banner2-text {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    color: #ffffff;
                    text-align: center;
                    font-size: .4rem;
                    letter-spacing: 6px;
                    .light {
                        color: #12d0e4;
                        margin: 0 .2rem;
                        line-height: 2;
                        &.light2 {
                            margin-right: 0;
                        }
                    }
                }
            }
        }
        .section3 {
            background-color: #fff;
            position: relative;
            height: 5rem;
            width: 100%;
            /*padding-bottom: 1.2rem;*/
            margin-bottom: 1.6rem;
            box-sizing: content-box;
            @media screen and (max-width: 320px) {
                height: 5.5rem;
            }
            .box-cont {
                width: 5.6rem;
                height: 5rem;
                border: 1px solid #000;
                position: absolute;
                right: .4rem;
                top: 0;
                background-color: #fff;
                @media screen and (max-width: 320px) {
                    height: 5.5rem;
                }
            }
            .cont-t-s3 {
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                margin: 0 .8rem 0 .6rem;
                padding: .3rem 0;
                background-color: #fff;
                z-index: 10;
            }
            .sectitle {
                font-size: .4rem;
                color: #000;
                .light {
                    color: @light;
                }
            }
            .sec-uls {
                display: flex;
                align-items: center;
                margin: .5rem 0 .6rem;
                .sec-list {
                    margin-right: .5rem;
                    img {
                        width: .6rem;
                        display: block;
                    }
                }
            }
            .description {
                font-size: .18rem;
                color: #323233;
                line-height: 2;
            }
        }
        .section4 {
            background-color: #f7f7f7;
            padding: 1.2rem 0 1rem;
            .sectitle {
                font-size: .4rem;
                color: #000;
                text-align: center;
                .light {
                    color: @light;
                }
            }
            .section-list-title {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: .4rem;
                color: #000;
                margin: 1.2rem auto .6rem;
                img {
                    width: .46rem;
                    margin-right: .2rem;
                }
            }
            .description {
                font-size: .18rem;
                color: #323233;
                line-height: 2;
                padding: 0 .3rem;
                text-align: center;
            }
            .last-desc {
                margin-top: .6rem;
            }
            .swiper-container {
                width: 100%;
                overflow: hidden;
                .swiper-wrapper {
                    margin: .8rem 0;
                    display: flex;
                    align-items: center;
                    // padding: 0 .8rem .2rem;
                    .swiper-slide {
                        // margin-right: .2rem;
                        min-width: 1.4rem;
                        height: 1.4rem;
                        background-color: #fff;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        img {
                            width: .7rem;
                        }
                        &:nth-child(5) img, &:nth-child(7) img, &:nth-child(8) img {
                            width: 1.2rem;
                        }
                        &:nth-child(6) img {
                            width: .6rem;
                        }
                    }
                }
            }
            .line-solid {
                width: 32px;
                margin: 0 auto 1rem;
            }
        }
        .section5 {
            padding: 1.2rem .4rem;
            .sec5-title {
                text-align: center;
                color: #000;
                font-size: .4rem;
                margin-bottom: .6rem;
            }
            .description {
                font-size: .18rem;
                color: #323233;
                line-height: 2;
            }
            .banner-uls {
                width: 100%;
                display: block;
                margin-top: .8rem;
                .banner-list {
                    img {
                        width: 100%;
                        display: block;
                    }
                }
            }
            .icon-uls {
                display: flex;
                align-items: center;
                justify-content: center;
                margin: .6rem 0;
                .icon-list {
                    margin-right: .6rem;
                    padding-bottom: .2rem;
                    width: .6rem;
                    border-bottom: .04rem solid transparent;
                    &.active-list {
                        border-bottom: .04rem solid #000;
                    }
                    &:last-child {
                        margin-right: 0;
                    }
                    img {
                        width: .6rem;
                    }
                }
            }
            .text-uls {
                .text-list {
                    .desc {
                        font-size: .18rem;
                        color: #17161f;
                        line-height: 2;
                    }
                    .last-desc {
                        margin-top: .5rem;
                    }
                }
            }
        }
        .section6 {
            color: #fff;
            width: 100%;
            height: 5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            background: url("../assets/img/home/down_banner_bg.jpg") no-repeat center / cover;
            .text1 {
                font-size: .3rem;
                color: rgba(255, 255, 255, .1);
            }
            .text2 {
                color: #ccc;
                font-size: .18rem;
                margin: .1rem 0 .6rem;
            }
            .text3 {
                font-size: .36rem;
            }
            .text4 {
                margin: .3rem 0 .6rem;
                font-size: .18rem;
            }
            .btn-down-w {
                width: 3rem;
                height: .7rem;
                display: flex;
                align-items: center;
                border: 1px solid #fff;
                .down-icon-w {
                    width: .7rem;
                    height: .7rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #fff;
                    cursor: pointer;
                    img {
                        width: .24rem;
                    }
                }
                .dowm-t {
                    flex: 1;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: .2rem;
                }
            }
        }
        .section7 {
            padding: 1.2rem 0 .6rem;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            .sec-title {
                font-size: .4rem;
                color: #17161f;
            }
            .title-des {
                font-size: .18rem;
                color: #323233;
                line-height: 2;
                text-align: center;
                margin: .6rem 0;
            }
            .activity-uls {
                .activity-list {
                    width: 4rem;
                    height: 6rem;
                    border: 1px solid #000;
                    padding: .6rem 0 .3rem .3rem;
                    margin-bottom: .6rem;
                    .activity-t {
                        display: flex;
                        align-items: center;
                        color: #000;
                        font-size: .18rem;
                        margin-bottom: .5rem;
                        .subtitle {
                            font-size: .16rem;
                            color: #cac8cc;
                            margin-right: .3rem;
                        }
                    }
                    .img-box {
                        width: 100%;
                        position: relative;
                        .car-img {
                            width: 100%;
                            display: block;
                        }
                        .hover-w {
                            display: none;
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            height: 100%;
                            padding: .2rem;
                            background-color: rgba(0, 0, 0, .6);
                            .icon-hover {
                                width: .6rem;
                                margin-bottom: .4rem;
                            }
                            .activity-desc {
                                font-size: .16rem;
                                color: #fff;
                                line-height: 1.4;
                            }
                        }
                        &:hover {
                            .hover-w {
                                display: block;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
