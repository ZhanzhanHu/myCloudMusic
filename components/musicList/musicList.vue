<template>
<div class="music-list">

  <div class="music-list-member" v-for="(item,index) in message" :key="item.key">
    <span @click='playMusicList(index)'>
      <span class='number'>{{index+1}}</span>
    <div>
      <p>{{item.name}}</p>
      <p>{{item.description}}</p>
    </div>
    </span>
  </div>

</div>
</template>
<script>
export default {
  mounted() {},
  data: () => ({

  }),
  props: ['message'],
  methods: {
    playMusicList(idx) {
      // console.log(idx, 'me');
      this.$store.commit('message', {
        datas: this.message,
        index: idx
      })
    }
  },
}
</script>
<style lang="less" scoped>
.music-list {
    margin-top: 0.5rem;
    padding-bottom: 1.2rem;
    .music-list-member {
        position: relative;
        padding: 0.2rem 0;
        border-bottom: solid 1px rgba(178, 181, 177,0.3);
        .number {
            position: absolute;
            top: 50%;
            left: 0.5rem;
            font-size: 0.4rem;
            transform: translate3d(0,-50%,0);
            color: rgb(160, 162, 160);
        }
        div {
            padding-left: 1rem;
            p:nth-of-type(1) {
                font-size: 0.35rem;
                margin: 0;
            }
            p:nth-of-type(2) {
                font-size: 0.25rem;
                margin: 0;
                color: rgb(100, 102, 100);
            }
        }
    }
}
</style>
