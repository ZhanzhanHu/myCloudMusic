<template>
<div class="privateFM">
  <div class="list-top">
    <img src="https://lh3.googleusercontent.com/gbR7FXVxNuPGgrz-WczS3lXNyq25WBjo8gwxBpKaoeQC2B6taKI2u0KXh-ezgJ55vw=w170" />
    <p class="title">私人FM</p>
    <!-- <div class='back'>返回</div> -->
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
    this.PrivateFM();

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
    PrivateFM() {
      let PrivateFM = server.getPrivateFM()
      PrivateFM.then((res) => {
        let datas = res.data
        if (datas.code == 405) {
          console.log(res.data.code);
        } else {
          console.log(res.data.data, 'res');
        }
        for (let i in datas.data) {
          (function(that) {
            let mydata = {
              name: '',
              description: ''
            };
            mydata.name = datas.data[i].name
            mydata.description = datas.data[i].album.artists[0].name
            that.datas.push(mydata)
            // console.log(that.datas, 'that');
          })(this);
        }

        // console.log(this.datas, 'datas');
      })
    },
  }
}
</script>
<style lang="less">
@import 'privateFM.less';
</style>
