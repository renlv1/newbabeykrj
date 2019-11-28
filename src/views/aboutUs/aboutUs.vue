<template>
    <div class="aboutUs-wrap">
        <div class="banner">
            <div class="content-box">
                <div class="img"><img src="../../assets/img/aboutUs/banner-img.png" alt=""></div>
                <div class="title">享受Newbabe,享受生活</div>
                <div class="text">Newbabe，为您筛选最优社交关系，为您打造贵族社交生态，让最优秀的您找到最优秀的TA。</div>
            </div>
        </div>
        <div class="one-main">
            <div class="major-titles">
                <div class="title">关于我们</div>
                <div class="con">财、貌、才，就是Newbabe最闪亮的标签</div>
            </div>
            <div class="our-box">
                <div class="title">我们的介绍</div>
                <div class="img-box">
                    <div class="img-l"><img src="../../assets/img/aboutUs/img-l.png" alt=""></div>
                    <div class="icon"></div>
                    <div class="img-r"><img src="../../assets/img/aboutUs/img-r.png" alt=""></div>
                </div>
                <div class="text-p">Newbabe是⼀个“以豪⻋交友”的⾼端社交APP。我们希望为用户打造一个高品质的豪车社交平台，让用户获得最好的社交体验。</div>
            </div>
            <div class="our-box">
                <div class="title">我们的宗旨</div>
                <div class="img-box">
                    <div class="img-l-two"><img src="../../assets/img/aboutUs/user.png" alt=""></div>
                    <div class="icon"></div>
                    <div class="img-r-two"><img src="../../assets/img/aboutUs/wine-toast.png" alt=""></div>
                </div>
                <div class="text-p">致力于创造一个优质的社交平台，打造专属于贵族的社交世界，让有才、有财、有貌的精英人士能够更好的进行社交。</div>
            </div>
        </div>
        <div class="team-introduction">
            <div class="title">团队介绍</div>
            <div class="list-box">
                <div class="li" v-for="(item,index) in teamListDatas" :key="index">
                    <div class="info">
                        <div class="img">
                            <img :src="item.img" alt="">
                        </div>
                        <div class="name"><span class="con-name">{{item.name}}</span><span class="position">{{item.position}}</span>
                        </div>
                        <div class="text-p">{{item.textp}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                teamListDatas: [
                    {
                        img: require('../../assets/img/aboutUs/team-img03.jpg'),
                        name: 'Rachel',
                        position: 'CEO',
                        textp: '毕业乌鲁木齐职业大学，豪车达人，从事品牌豪车销售六年，一年法拉利品牌，五年迈凯伦品牌，超豪二手车纽北名车联合创始人，项目发起人之一。',
                    },
                    {
                        img: require('../../assets/img/aboutUs/team-img01.jpg'),
                        name: '刘雅雯',
                        position: '人力资源总监',
                        textp: '毕业于深圳大学企业管理，三正集团任职副总经理，自主创业国内贸易，主攻企业礼品，超豪二手车纽北名车法人，有丰富的人事架构管理经验及市场拓展资源。',
                    }
                    ,
                    {
                        img: require('../../assets/img/aboutUs/team-img02.jpg'),
                        name: '盖洪伟',
                        position: '高级旧机动车鉴定评估师',
                        textp: '2011年御翔超跑名车联合创始人之一，从业10年进行精品高端二手车相关信息咨询与高端二手车服务。',
                    }
                ]
            }
        },
        components: {},
        computed: {},
        created() {
        },
        mounted() {
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
    @padding: 0 .4rem;
    @titFont: .4rem;
    @titColor: #323233;
    @center: center;
    @textFont: .24rem;
    @infoTitle: .28rem;
    @textColor: #979699;
    @main-titleColor: #000;
    .aboutUs-wrap {
        width: @100vw;
        min-height: 100vh;
        background-color: #fff;
        .banner {
            width: @hundred;
            height: 5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            .content-box {
                width: @100vw;
                .img {
                    width: 2.98rem;
                    height: 1.77rem;
                    margin: @margin;
                    img {
                        width: @hundred;
                    }
                }
                .title {
                    font-size: @titFont;
                    color: @titColor;
                    text-align: @center;
                    padding: .4rem 0;
                }
                .text {
                    line-height: 1.5;
                    font-size: @textFont;
                    color: @textColor;
                    text-align: @center;
                }
            }
        }
        .one-main {
            width: @hundred;
            background-color: #F7F7F7;
            text-align: center;
            padding: @padding;
            .major-titles {
                .title {
                    font-size: @titFont;
                    color: @main-titleColor;
                    padding: .8rem 0 .3rem;
                }
                .con {
                    font-size: @textFont;
                    line-height: 1.5;
                }
            }
            .our-box {
                width: @hundred;
                .title {
                    font-size: @infoTitle;
                    text-align: @center;
                    padding-bottom: .6rem;
                }
                .img-box {
                    width: @hundred;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .img-l {
                        width: 1rem;
                        height: .63rem;
                        img {
                            width: @hundred;
                        }
                    }
                    .img-l-two {
                        width: .91rem;
                        height: .62rem;
                        img {
                            width: @hundred;
                        }
                    }
                    .icon {
                        width: .25rem;
                        height: .25rem;
                        margin: 0 .4rem;
                        background: url("../../assets/img/aboutUs/icon.png") no-repeat center;
                        background-size: cover;
                    }
                    .img-r {
                        width: .76rem;
                        height: .64rem;
                        img {
                            width: @hundred;
                        }
                    }
                    .img-r-two {
                        width: .67rem;
                        height: .61rem;
                        img {
                            width: @hundred;
                        }
                    }
                }
                .text-p {
                    width: @hundred;
                    font-size: @textFont;
                    color: @main-titleColor;
                    padding-bottom: 1rem;
                    padding-top: .6rem;
                    text-align: center;
                    line-height: 1.5;
                }
            }
        }
        .team-introduction {
            width: @hundred;
            padding-bottom: 1rem;
            .title {
                font-size: @titFont;
                color: @main-titleColor;
                text-align: @center;
                padding-top: .8rem;
                padding-bottom: .6rem;
            }
            .list-box {
                width: 4.8rem;
                height: auto;
                margin: @margin;
                .li {
                    width: 100%;
                    border: 1px solid @main-titleColor;
                    height: auto;
                    margin-bottom: .6rem;
                    .info {
                        width: @hundred;
                        padding: .4rem 0 .4rem .4rem;
                        .img {
                            width: @hundred;
                            height: @hundred;
                            position: relative;
                            &:after {
                                content: '';
                                display: block;
                                position: absolute;
                                width: 1px;
                                height: 100%;
                                right: -1px;
                                bottom: 0;
                                z-index: 10;;
                                background-color: #F6F7FB;
                            }
                            img {
                                width: @hundred;
                            }
                        }
                        .name {
                            padding: .4rem 0 .4rem 0;
                            font-size: @infoTitle;
                            width: 100%;
                            text-align: center;
                            .con-name {
                                padding-top: .06rem;
                            }
                            .position {
                                display: inline-block;
                                line-height: 1.5;
                                color: #12d0e4;
                                font-size: @textFont;
                                padding-left: .2rem;
                            }
                        }
                        .text-p {
                            font-size: @textFont;
                            color: @titColor;
                            line-height: 1.5;
                            padding-right: .4rem;
                        }
                    }
                }
            }
        }
    }
</style>
