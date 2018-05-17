// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import axios from 'axios';
import Vuex from 'vuex'

Vue.prototype.$http = axios;
Vue.use(VueAwesomeSwiper)
Vue.use(Vuex)


Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    playList: [],
    index: 0
  },
  mutations: {
    message(state, payload) {
      state.playList = payload.datas
      state.index = payload.index
    }
  }

})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
