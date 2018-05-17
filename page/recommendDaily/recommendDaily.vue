<template>
<div class="recommend-daily">
  <div class="list-top" style="background:url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515068139054&di=a09f3f12b6609ac58798635a35856cb0&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F02d87f587def66a801219c7727ac38.png%40800w_1l_2o_100sh.jpg');background-size: 100% 100%;background-repe">
    <img src="http://www.tekilaklub.com/inspyre/wp-content/uploads/2012/04/oh-yeah-inspiration-typography.jpg" />
    <p class="title">生生世世生生世世生生世世生生世世说</p>

  </div>
  <musicList :message='datas'></musicList>
</div>
</template>
<script>
import server from '../../server/server.js'
import musicList from '../../components/musicList/musicList.vue'
export default {
  mounted() {
    this.DaliyRecommend();
  },
  data() {
    return {
      datas: [],
    }
  },
  components: {
    'musicList': musicList
  },
  methods: {
    DaliyRecommend() {
      let DaliyRecommend = server.getDaliyRecommend()
      DaliyRecommend.then((res) => {
        let data = res.data
        if (data.code == 301) {
          // this.$router.back()
        } else {
          console.log(res.data);
        }



      })
    }
  }
}
</script>
<style lang="less">
.recommend-daily {
    width: 100%;
    height: 100%;
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
            color: #fff;
            width: 45%;
            float: right;
            margin-right: 0.5rem;
            margin-top: 0.5rem;
            clear: both;
        }
    }

}
</style>
