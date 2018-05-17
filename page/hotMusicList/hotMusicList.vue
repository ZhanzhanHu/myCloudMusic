<template lang="html">
  <div class="hotMusicList">
    <div class="boutiquePlaylist-top" :style="{'background':'url('+bg+')'}">
      <img :src="coverImgUrl">
      <div>
      <p>Hot歌单&nbsp></p>
      <p>{{title}}</p>
      </div>
    </div>
    <div class="playlist-group">

      <div class="playlist-member" v-for="(item,index) in datas" :key="datas.key" v-if="index>0" >
        <div class="top" @click='goMusicList(index)'>
          <img :src="item.coverImgUrl">
          <div class='headset'>
            <div></div>
            <p>{{item.commentCount}}万</p>
          </div>
          <div class="person">
            <div></div>
            <p>{{item.name}}</p>
          </div>
        </div>
         <p>{{item.description}}</p>
      </div>



    </div>
  </div>

</template>

<script>
import server from '../../server/server.js'
export default {
  mounted() {
    //do something after mounting vue instance
    this.getHotMusicList()
  },
  data() {
    return {
      datas: '',
      coverImgUrl: '',
      title: '',
      bg: '',
    }
  },
  methods: {
    getHotMusicList() {
      let hotMusicList = server.getHotMusicList()
      hotMusicList.then((res) => {
        let datas = res.data.playlists
        this.coverImgUrl = datas[0].coverImgUrl
        this.title = datas[0].name
        this.bg = datas[0].creator.backgroundUrl
        this.datas = datas
      })
    },
    goMusicList(index) {
      this.$router.push({
        name: 'list',
        params: {
          id: this.datas[index].id
        }
      });
    }

  },
}
</script>

<style lang="less">
@import 'hotMusicList.less';
</style>
