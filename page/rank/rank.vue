<template lang="html">
  <div class="rank">
      <div class="title"><img src='../../assets/image/rank/rank.png'/></div>
      <div @click='goRankDetail(0)'></div>
      <div @click='goRankDetail(1)'></div>
      <div @click='goRankDetail(2)'></div>
      <div @click='goRankDetail(3)'></div>
      <div @click='goRankDetail(4)'></div>
  </div>
</template>

<script>
import server from '../../server/server.js'
export default {
  methods: {
    goRankDetail(index) {
      let getRankMusicListId = server.getRankMusicListId(index)
      getRankMusicListId.then((res) => {
        let datas = res.data
        this.goList(datas.playlist.id)
      })
    },
    goList(val) {
      this.$router.push({
        name: 'list',
        params: {
          id: val
        }
      })
    }
  }
}
</script>
<style lang="less">
@import 'rank.less';
</style>
