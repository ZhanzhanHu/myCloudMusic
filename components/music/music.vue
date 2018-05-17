<style lang="less">
@import 'music.less';
</style>

<template lang="html">

<div class="music">
    <swiper ref='musicSwiper'>
        <swiper-slide v-for="item of bannerSrc" :key="item.key">
            <img :src="item.pic"/>
        </swiper-slide>
    </swiper>
     <div class='nav'>
        <div class="nav-row" @click='navGo(1)'>
            <img src='../../assets/image/musicIndex/privateFM.png' />
            <p>私人FM</p>
        </div>
        <div class="nav-row" @click='navGo(2)'>
            <img src='../../assets/image/musicIndex/daliyRecommend.png' />
            <p>每日推荐</p>
        </div>
        <div class="nav-row" @click='navGo(3)'>
            <img src='../../assets/image/musicIndex/musicList.png' />
            <p>HOT歌单</p>
        </div>
        <div class="nav-row" @click='navGo(4)'>
            <img src='../../assets/image/musicIndex/musicRank.png' />
            <p>排行榜</p>
        </div>
    </div>
    <div class="recommend-musicList">
        <div class="title">推荐歌单&nbsp></div>
        <div class="recommend-musicList-content">

            <div class="recommend-musicList-cover" v-for="(item,index) in recommendMusicList" :key="item.key">
                <div class="recommend-musicList-cover-float">
                    <div></div>
                    {{item.trackCount}}万
                </div>
                <img :src="item.picUrl" @click='goRecommendMusicList(index)'/>
                <p>{{item.name}}</p>
            </div>

        </div>
    </div>
     <div class="exclusive">
        <div class="title">独家放送&nbsp></div>
        <div class="exclusive-content">
          <div class="exclusive-content-cover" v-for="item in exclusiveBroadcast" :key="item.key">
            <div class="videoIcon">
              <img src='../../assets/image/musicIndex/videoIcon.png'/></div>
              <img class="exclusive-img" :src="item.picUrl"/>
              <p>{{item.name}}</p>
          </div>

        </div>
    </div>
    <div class="new-music">
        <div class="title">最新音乐&nbsp></div>
        <div class="new-music-content">
            <div class="new-music-cover" v-for="(item,index) in newSong" :key="item.key">
              <img :src="item.song.album.picUrl"/>
              <p>{{item.song.name}}</p>
              <p>{{item.song.alias[0]}}</p>
            </div>

        </div>
    </div>

    <div class="recommend-MV">
        <div class="title">推荐MV&nbsp></div>
        <div class="recommend-MV-content">

            <div class="recommend-MV-cover" v-for="item in recommendMV" :key="item.key">
              <img :src="item.picUrl"/>
              <p>{{item.name}}</p>
              <p>{{item.copywriter}}</p>
            </div>

        </div>
    </div>
</div>

</template>

<script>
import server from '../../server/server.js'
export default {
  created() {
    this.linkBanner()
    this.linkRecommendMusicList()
    this.linkExclusiveBroadcast()
    this.linkNewMusic()
    this.linkRecommendMV()
  },
  data() {
    return {
      bannerSrc: [],
      recommendMusicList: [],
      exclusiveBroadcast: [],
      newSong: [],
      recommendMV: []
    }
  },
  methods: {
    linkBanner() {
      let bannerData = server.getBanner()
      bannerData.then((res) => {
        this.bannerSrc = res.data.banners
        // console.log(res, 'banner');
      })
    },
    linkRecommendMusicList() {
      let recommendMusicList = server.getRecommendMusicList()
      recommendMusicList.then((res) => {
        // console.log(res, "musiclist");
        let recommendMusicLists = res.data.result
        this.recommendMusicList = recommendMusicLists.filter((value, index) => {
          return index < 6
        })
      })
    },
    linkExclusiveBroadcast() {
      let exclusiveBroadcast = server.getExclusiveBroadcast()
      exclusiveBroadcast.then((res) => {
        let exclusiveBroadcasts = res.data.result
        this.exclusiveBroadcast = exclusiveBroadcasts.filter((value, index) => {
          return index < 2
        })
      })
    },
    linkNewMusic() {
      let newsong = server.getNewMusic()
      newsong.then((res) => {
        let newSongs = res.data.result
        this.newSong = newSongs.filter((value, index) => {
          return index < 6
        })
      })

    },
    linkRecommendMV() {
      let recommendMv = server.getRecommendMV()
      recommendMv.then((res) => {
        let recommendMVs = res.data.result
        this.recommendMV = recommendMVs.filter((value, index) => {
          return index < 3
        })

      })
    },
    navGo(val) {
      switch (val) {
        case 1:
          this.routerPush('privateFM')
          break;
        case 2:
          this.routerPush('dailyRecommendList')
          break;
        case 3:
          this.routerPush('hotMusicList')
          break;
        case 4:
          this.routerPush('rank')
          break;
      }
    },
    goRecommendMusicList(index) {
      this.routerPush('list', this.recommendMusicList[index].id)
    },
    // goNewMusicList(index) {
    //   // console.log(this.newSong[index]);
    //   this.routerPush('dailyRecommendList', {
    //     id: this.newSong[index].id
    //   })
    // },
    routerPush(toName, val = '') {
      // console.log(val);
      this.$router.push({
        name: toName,
        params: {
          val
        }
      });
    },

  }
}
</script>
