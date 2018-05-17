<template>
<div class="config">
  <router-view v-show="isShowHome" />
  <player @showHomePage='isShowHomePage'></player>
</div>
</template>
<script>
import player from '../components/player/player.vue'
export default {
  data() {
    return {
      isShowHome: true,
    }
  },
  components: {
    'player': player
  },
  methods: {
    isShowHomePage(val) {
      this.isShowHome = !val
    },
  }
}
</script>
<style lang="less">
.config {
    width: 100%;
    height: 100%;
}
</style>
