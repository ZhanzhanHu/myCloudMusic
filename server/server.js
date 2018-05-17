const API_URL = 'http://localhost:3000'
window.axios = require('axios');

class Myaxios {
  constructor(params) {
    this.params = params
  }
  Axios() {
    return new Promise((resolve, reject) => {
      axios({
        method: this.params.method,
        url: this.params.url,
        ...this.params.data,
        // withCredentials: true
      }).then((res) => {
        resolve(res)
      }).catch((error) => {
        reject(error)
      })
    })
  }
  getType() {
    return new Promise((resolve, reject) => {
      axios.get(this.params.url)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        });
    })

  }


}

export default {
  getBanner() {
    let params = {
        method: 'get',
        url: '/banner',
      },
      myaxios = new Myaxios(params)
    return myaxios.Axios()
  },
  getRecommendMusicList() {
    let params = {
        method: 'get',
        url: '/personalized',
      },
      myaxios = new Myaxios(params)
    return myaxios.Axios()
  },
  getExclusiveBroadcast() {
    let params = {
        method: 'get',
        url: '/personalized/privatecontent',
      },
      myaxios = new Myaxios(params)
    return myaxios.Axios()
  },
  getNewMusic() {
    let params = {
        method: 'get',
        url: '/personalized/newsong',
      },
      myaxios = new Myaxios(params)
    return myaxios.Axios()
  },
  getRecommendMV() {
    let params = {
        method: 'get',
        url: '/personalized/mv',
      },
      myaxios = new Myaxios(params)
    return myaxios.Axios()
  },
  getBroadcastBanner() {
    let params = {
        method: 'get',
        url: '/personalized/djprogram',
      },
      myaxios = new Myaxios(params)
    return myaxios.Axios()
  },
  getPrivateFM() {
    let params = {
        method: 'get',
        url: '/personal_fm',
      },
      myaxios = new Myaxios(params)
    return myaxios.Axios()
  },
  getDaliyRecommend() {
    let params = {
        method: 'get',
        url: '/top/playlist?limit=1&order=new',
      },
      myaxios = new Myaxios(params)
    return myaxios.getType()
  },
  getHotMusicList() {
    let params = {
        method: 'get',
        url: '/top/playlist?limit=11&order=hot',
      },
      myaxios = new Myaxios(params)
    return myaxios.getType()
  },
  getRankList(idx) {
    let params = {
        method: 'get',
        url: `/top/list?idx=${idx}`,
      },
      myaxios = new Myaxios(params)
    return myaxios.Axios()
  },
  getMusicListDetail(id) {
    let params = {
        method: 'get',
        url: `/playlist/detail?id=${id}`,
      },
      myaxios = new Myaxios(params)
    return myaxios.getType()
  },
  getRankMusicListId(index) {
    let params = {
        method: 'get',
        url: `/top/list?idx=${index}`,
      },
      myaxios = new Myaxios(params)
    return myaxios.getType()
  },
  getMusicSrc(id) {
    let params = {
        method: 'get',
        url: `/music/url?id=${id}`,
      },
      myaxios = new Myaxios(params)
    return myaxios.getType()
  }



}
