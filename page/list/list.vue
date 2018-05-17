<style lang="less">
@import 'list.less';
</style>

<template lang="html">

<div class=" list">
    <div class="list-top" :style="{backgroundImage:'url('+bg+')',backgroundSize:'cover'}" >
        <img :src="cover" />
        <p class="title">{{name}}</p>
        <div class="icons">
            <div>
                <img src='../../assets/image/list/collect.png'>
                <p>{{subscribedCount}}</p>
            </div>
            <div>
                <img src='../../assets/image/list/comment.png'>
                <p>{{commentCount}}</p>
            </div>
            <div>
                <img src='../../assets/image/list/share.png'>
                <p>{{shareCount}}</p>
            </div>
            <div>
                <img src='../../assets/image/list/download.png'>
                <p>{{trackCount}}</p>
            </div>
        </div>
    </div>
    <musicList :message='datas'></musicList>

</div>

</template>

<script>
import server from '../../server/server.js'
import musicList from '../../components/musicList/musicList.vue'
export default {
  mounted() {
    //do something after mounting vue instance
    this.getMusicListDetail()
  },
  data() {
    return {
      datas: [],
      cover: '',
      bg: '',
      name: '',
      commentCount: '评论',
      shareCount: '分享',
      subscribedCount: '订阅',
      trackCount: '',
      styleObject: {
        'background-size': '100% 100%',
      }
    }
  },
  components: {
    'musicList': musicList
  },
  methods: {
    getMusicListDetail() {
      let id
      if (this.$route.params.id) {
        id = this.$route.params.id
      } else {
        id = this.$route.params.val
      }
      let getMusicListDetail = server.getMusicListDetail(id)
      getMusicListDetail.then((res) => {
        let datas = res.data.playlist
        this.cover = datas.coverImgUrl
        this.name = datas.name
        this.bg = datas.creator.backgroundUrl
        this.commentCount = datas.commentCount
        this.shareCount = datas.shareCount
        this.subscribedCount = datas.subscribedCount
        this.trackCount = datas.trackCount
        for (let i in datas.tracks) {
          // console.log(datas.tracks[i]);
          (function(that) {
            let mydata = {
              name: '',
              description: '',
              id: '',
              imgSrc: '',
            };
            mydata.id = datas.tracks[i].id
            mydata.name = datas.tracks[i].name
            mydata.description = datas.tracks[i].ar[0].name
            mydata.imgSrc = datas.tracks[i].al.picUrl
            that.datas.push(mydata)
            // console.log(that.datas, 'that');
          })(this);
        }


      })

    },

  }
}
</script>
