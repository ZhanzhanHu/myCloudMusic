<template lang="html">
  <div class="home">
    <div class="search" @click='search()'></div>
    <div class="person-center" @click='personCenter()'></div>
    <div class="login" v-if='ShowLogin'>
      <div class="login-left">
            <div class="phone-login" v-show="!isLogined">
              <p>用手机登陆吧！</p>
                <input type="text" v-model='myphone' placeholder="手机号"/>
                <input type="password" v-model='mypassword' placeholder="密码"/>
                <div @click='goLogin()'>确定</div>
            </div>
            <div class="person-message" v-show="isLogined" >
                <img :src="userMsg.avatarUrl">
                <p>{{userMsg.nickname}}</p>
            </div>
      </div>
      <div class="login-right" @click.stop='isShowLogin()'></div>
    </div>
    <swiper :options='homeSwiperOption' ref='homeSwiper'>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-scrollbar" slot="scrollbar"></div>
      <swiper-slide>
        <music></music>
      </swiper-slide>
      <swiper-slide>
        <videos></videos>
      </swiper-slide>
      <swiper-slide>
        <broadcasting></broadcasting>
      </swiper-slide>
    </swiper>

  </div>
</template>

<script>
import music from '../../components/music/music.vue'
import video from '../../components/video/video.vue'
import broadcasting from '../../components/broadcasting/broadcasting.vue'
export default {
  data() {
    return {
      ShowLogin: false,
      myphone: '',
      mypassword: '',
      isLogined: false,
      userMsg: '',
      homeSwiperOption: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        scrollbar: {
          el: '.swiper-scrollbar',
        }
      }
    }
  },
  components: {
    'music': music,
    'videos': video,
    'broadcasting': broadcasting
  },
  methods: {
    search() {
      console.log('search')
    },
    personCenter() {
      this.isShowLogin()
      console.log('person'); //处理数据
    },
    isShowLogin() {
      this.ShowLogin = !this.ShowLogin
    },
    goLogin() {
      axios.get('http://localhost:3000/login/cellphone', {
          params: {
            phone: this.myphone,
            password: this.mypassword
          },
          // withCredentials: true
        })
        .then((response) => {
          if (response.data.code != 200) {
            alter('要输入正确的账号密码')
          } else {
            this.userMsg = response.data.profile
            this.isLogined = !this.isLogined
          }
        })
        .catch((error) => {
          return false;
        });

    }

  }
}
</script>

<style lang="less">
@import 'home.less';
</style>
