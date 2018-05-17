import Vue from 'vue'
import Router from 'vue-router'
import home from '@/page/home/home.vue'
import list from '@/page/list/list.vue'
import privateFM from '@/page/privateFM/privateFM.vue'
import boutiquePlaylist from '@/page/boutiquePlaylist/boutiquePlaylist.vue'
import recommendDaily from '@/page/recommendDaily/recommendDaily.vue'
import rank from '@/page/rank/rank.vue'
import dailyRecommendList from '@/page/dailyRecommendList/dailyRecommendList.vue'
import hotMusicList from '@/page/hotMusicList/hotMusicList.vue'
import config from '../page/routerConfig.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CloudMusic',
      component: config,
      children: [
        {
          path: '/',
          name: 'home',
          component: home
        },
        {
          path: '/recommendDaily',
          name: 'recommendDaily',
          component: recommendDaily
        },
        {
          path: '/list',
          name: 'list',
          component: list
        },
        {
          path: '/boutiquePlaylist',
          name: 'boutiquePlaylist',
          component: boutiquePlaylist
        },
        {
          path: '/rank',
          name: 'rank',
          component: rank
        }, {
          path: '/privateFM',
          name: 'privateFM',
          component: privateFM
        }, {
          path: '/dailyRecommendList',
          name: 'dailyRecommendList',
          component: dailyRecommendList
        }, {
          path: '/hotMusicList',
          name: 'hotMusicList',
          component: hotMusicList
        }
      ]
    },
  ]
})
