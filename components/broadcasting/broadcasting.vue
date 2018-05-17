<style lang="less">
@import 'broadcasting.less';
</style>

<template lang="html">

<div class="broadcasting">
    <swiper ref='broadcastingSwiper'>
        <swiper-slide>
            <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1407708856,3623981425&fm=27&gp=0.jpg"/>
        </swiper-slide>
        <swiper-slide>
            <img src="http://upload.guigutang.com:8082/images/20170124/d1561346-7ced-4526-9aa3-c83035c64262.jpg"/>
        </swiper-slide>
        <swiper-slide>
            <img src="http://img.zcool.cn/community/0113e1598db37700000021291ad0b6.jpg"/>
        </swiper-slide>
        <swiper-slide>
            <img src="http://img.zcool.cn/community/01712058a54c64a801219c77341422.jpg@900w_1l_2o_100sh.jpg"/>
        </swiper-slide>
        <swiper-slide>
            <img src="http://img.zcool.cn/community/01c63a598db3b600000021297dcfbf.jpg"/>
        </swiper-slide>
    </swiper>
    <div class="nav">
        <div>
            <p>电台分类</p>
            <img src='../../assets/image/broadcast/brodcastType.png' />
        </div>
        <div>
            <p>节目推荐</p>
            <img src='../../assets/image/broadcast/broadcastRank.png' />
        </div>
    </div>
    <div class="broadcast-recommend">
        <div class="title">电台个性推荐&nbsp></div>
        <div class="broadcast-recommend-group">

            <div class="group-member" v-for="item in broadcastBanner" :key="item.key">
                <div>
                    <img :src="item.picUrl"/>
                    <p>{{item.name}}</p>
                </div>
                <p class="description">{{item.copywriter}}</p>
            </div>

        </div>
    </div>

</div>

</template>

<script>
import server from '../../server/server.js'
export default {
  created() {
    //do something after creating vue instance
    this.linkBroadcastBanner()
  },
  data() {
    return {
      broadcastBanner: [],
    }
  },
  methods: {
    linkBroadcastBanner() {
      let broadcastBanners = server.getBroadcastBanner()
      broadcastBanners.then((res) => {
        this.broadcastBanner = res.data.result
        // console.log(this.broadcastBanner);
      })
    },

  }

}
</script>
