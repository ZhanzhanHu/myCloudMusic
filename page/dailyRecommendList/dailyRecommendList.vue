<template lang="html">
<div class=" dailyRecommendList">
    <div class="list-top">
        <img :src="datas.coverImgUrl" />
        <p class="title">{{datas.name}}</p>
    </div>
    <musicList :message='musicList'></musicList>

</div>

</template>

<script>
import server from '../../server/server.js'
import musicList from '../../components/musicList/musicList.vue'
export default {
  mounted() {
    //do something after mounting vue instance
    this.DaliyRecommend()
  },
  data() {
    return {
      datas: [],
      musicList: [],
    }
  },
  components: {
    'musicList': musicList
  },
  methods: {
    DaliyRecommend() {
      let DaliyRecommend = server.getDaliyRecommend()
      DaliyRecommend.then((res) => {
        this.datas = res.data.playlists[0]
        this.getMusicListDetail(res.data.playlists[0].id)
      })
    },
    getMusicListDetail(id) {
      let MusicListDetail = server.getMusicListDetail(id)
      MusicListDetail.then((res) => {
        let datas = res.data.playlist.tracks
        // console.log(datas);
        for (let i in datas) {
          (function(that) {
            let mydata = {
              name: '',
              description: '',
              id: '',
              imgSrc: ''
            };
            mydata.id = datas[i].id
            mydata.name = datas[i].name
            mydata.description = datas[i].ar[0].name
            mydata.imgSrc = datas[i].al.picUrl
            that.musicList.push(mydata)
            // console.log(that.datas, 'that');
          })(this);
        }
      })
    }
  }
}
</script>
<style lang="less">
.dailyRecommendList {
    width: 100%;
    // height: 100%;
    .list-top {
        height: 40%;
        padding-top: 0.4rem;
        padding-left: 0.4rem;
        img:nth-of-type(1) {
            width: 3rem;
            height: 3rem;
            display: inline-block;
        }
        .title {
            font-size: 0.4rem;
            color: rgba(226, 19, 19,0.7);
            width: 45%;
            float: right;
            margin-right: 0.5rem;
            margin-top: 0.5rem;
            clear: both;
        }
    }

}
</style>
