<style lang="less">
@import 'player.less';
</style>

<template lang="html">

<div class="player">
    <!--简易播放bar-->
    <div class="play-bar" v-show="playBar">
        <div class="bar-left" @click='showPlayPage()'>
            <img :src='musicInfo[infoIndex].imgSrc' />
            <div class="bar-text">
                <div>{{musicInfo[infoIndex].name}}</div>
                <div>{{musicInfo[infoIndex].description}}</div>
            </div>
        </div>
        <div class="circle" @click.stop='changeCircle()'>
            <div class="center" :class='circle'></div>
        </div>
        <div class="list" @click.stop='showList'>
            <div></div>
        </div>
        <audio :src='musicInfo[infoIndex].path' ref='audio'
                @ended='musicEnd()'></audio>
        <!--后期尝试用watch简化代码-->
    </div>

    <!--音乐播放页-->
    <div class="play-page" v-show='isShowPage'>
      <div class="play-head">
        <div class="arrow" @click='showPlayPage()'></div>
        <div class="play-title">
          <div>{{musicInfo[infoIndex].name}}</div>
          <div>{{musicInfo[infoIndex].description}}</div>
        </div>
     </div>
        <div class="play-circle"></div>
        <div class="play-page-bg" :style="{'background-image':'url(' + musicInfo[infoIndex].imgSrc + ')'}"></div>
        <swiper :options="playerSwiperOption" ref='musicPageSwiper'>
          <swiper-slide v-for='(item,index) in musicInfo'>
            <div class="disc" :class="[index==infoIndex?discAnimation:'',!musicBtn?'disc-animation-stop':'']">
               <img :src='item.imgSrc'/>
            </div>
          </swiper-slide>
        </swiper>
        <div class="player-module">
          <div class="player-module-top"><!--上-->
            <img src="../../assets/image/playPage/like.png" />
            <a :href="musicInfo[infoIndex].path" :download='musicInfo[infoIndex].name'>
              <img src='../../assets/image/playPage/download.png'/>
            </a>
            <img src='../../assets/image/playPage/comment.png' />
          </div>
          <div class="player-module-bar"><!--进度条-->
            <div class="start-time time">{{startTime}}</div>
            <div class="player-bar" :style="{'width':playerWidth+'rem'}" ref='playerBar' @click='changeProgress($event)'>
              <div class="player-progress" :style="{'width':musicProgress+'rem'}"></div>
              <div class="player-spot" :style="{'left':musicProgress+'rem'}" @touchmove='spotMove($event)'><div></div></div>
            </div>
            <div class="end-time time">{{endTime}}</div>
          </div>
          <div class="player-module-bottom">  <!--下-->
            <img :src='changePlayerTypeSrc' @click='changePlayerType'> <!--播放方式-->
            <img src= '../../assets/image/playPage/previous.png'  @click='previousMusic()'>
            <div class="player-circle" @click.stop='changeCircle()'>
                <div class="center" :class='circle'></div>
            </div>
            <img src='../../assets/image/playPage/next.png' @click='nextMusic'>
            <div class="player-list" @click.stop='showList'><div></div></div>
            <transition name='playerCaption'>
            <div class="changePlayerTypeCaption" v-show="showPlayerCaption">{{playerCaption}}</div>
          </transition>
          </div>
        </div>
    </div>

    <!--播放列表-->
        <div class="play-list" v-show='showPlayList'>
          <transition name='bg'>
            <div class="hidden-list" @click='showPlayList=false'></div>
            </transition>
            <transition name="list-up">
                <div class='list-content' v-show='showPlayList'>
                    <div class="li-info" v-for='(item,index) of musicInfo' :class="index==infoIndex?'show-trumpet':' '" @click='selectedMusic(index)'>
                        <img src="../../assets/image/playBar/trumpet.png" class="trumpet">
                        <div>{{item.name}}</div>
                        <div>-{{item.description}}</div>
                        <img src="../../assets/image/playBar/delete.png" class="delate" @click.stop='deleteMusic(index)'>
                    </div>
                </div>
            </transition>
        </div>
</div>

</template>

<script>
//播放列表不为空显示，
//传入播放数组即可
import Swiper from 'swiper'
import server from '../../server/server.js'
let interval = ''
export default {
  created() {
    //请求数据结构
    this.musicInfo = [{
      path: 'http://mp3.qqmusic.cc/yq/207323048.mp3',
      imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGH0B10Vq3Toopm-31Y48eUckUG-n2C2q-SUkpl2LRJAbvadZfmg',
      name: '像风一样',
      description: '薛之谦',
    }]

  },
  mounted() {
    //do something after mounting vue instance
    this.listEventenerMusic()
  },
  data() {
    let that = this,
      frist = 0
    return {
      circle: "stop", //运动的圆
      musicInfo: [], //歌单
      infoIndex: 0, //当前播放index
      showPlayList: false, //是否显示列表
      playBar: true,
      isShowPage: '', //是否显示播放页
      discAnimation: '', //转的动画
      musicBtn: false,
      startTime: '00:00', //启示时间
      endTime: '00:00', //截止时间
      musicProgress: 0, //音乐进度
      playerWidth: 4.5, //播放条长度
      changePlayerTypeSrc: require('../../assets/image/playPage/listCirculate.png'), //当前播放模式
      changePlayerTypeCode: '2', //当前模式
      showPlayerCaption: false,
      playerCaption: '',
      upDate: this.$store.state.playList,
      playerType: {
        listPlayer: false,
        singlePlayer: false,
        adjectivePlayer: false
      },
      playerSwiperOption: {
        initialSlide: 0,
        loop: false,
        fade: {
          crossFade: true,
        },
        on: {
          slideChangeTransitionStart() {
            if (frist == 0) {
              this.realIndex = 0
              frist = 1
            }
            that.infoIndex = this.realIndex
          },

        }
      },

    }

  },
  watch: {
    infoIndex() {
      this.playMusic()
    },
    getStateData(playList) {
      this.musicInfo = playList
      this.infoIndex = this.$store.state.index
      let arrMusic = playList.map((val, index) => {
        let getMusicSrc = server.getMusicSrc(val.id)
        getMusicSrc.then((res) => {
          this.musicInfo[index].path = res.data.data[0].url
        })
      })
      let audio = this.$refs.audio
      if (this.infoIndex == 0) {
        this.playMusic()
      }

    },
    getStateIndex(val) {
      console.log(val);
      this.infoIndex = val
    }
  },
  computed: {
    getStateData() {
      return this.$store.state.playList
    },
    getStateIndex() {
      return this.$store.state.index
    }
  },
  methods: {
    changeCircle() {
      if (!this.musicBtn) {
        this.playMusic()
      } else {
        this.stopMusic()
      }
    },
    playMusic() {
      // console.log(this.musicInfo);
      let audio = this.$refs.audio
      audio.addEventListener('canplay', () => { //获取最后时间要在加载完毕以后执行
        audio.play()
      })
    },
    stopMusic() {
      let audio = this.$refs.audio
      audio.pause()
    },
    musicEnd() {
      this.playerTypeHandle()
    },
    nextMusic() {
      this.playerTypeHandle()
    },
    listEventenerMusic() {
      let audio = this.$refs.audio,
        endTime = 0
      audio.addEventListener('play', () => {
        // this.circle = "start" //控制page播放的样式
        this.circle = "start"
        this.musicBtn = true //控制简易bar播放样式
        this.$refs.musicPageSwiper.swiper.slideTo(this.infoIndex)
        console.log("play")
      })
      audio.addEventListener('pause', () => {
        this.circle = "stop"
        this.musicBtn = false
        console.log("stop")
      })
      audio.addEventListener('timeupdate', () => {
        this.startTime = this.formatTime(audio.currentTime)
        let currentTime = audio.currentTime,
          progressWidth = (currentTime / endTime) * this.playerWidth
        this.musicProgress = progressWidth
        this.discAnimation = 'disc-animation' //控制旋转

      })

      audio.addEventListener('canplay', () => { //获取最后时间要在加载完毕以后执行
        this.endTime = this.formatTime(audio.duration)
        endTime = audio.duration
      })

    },
    playerTypeHandle() {
      if (this.playerType.adjectivePlayer) {
        let num = Math.round(Math.random() * (this.musicInfo.length - 1 - 0) + 0)
        this.$refs.musicPageSwiper.swiper.slideTo(num + 1)
        this.infoIndex = num;
        // console.log(this.infoIndex)
      } else if (this.playerType.singlePlayer) {
        this.playMusic()
      } else { //默认列表播放
        this.infoIndex = this.infoIndex * 1 + 1
        if (this.infoIndex >= this.musicInfo.length) {
          this.infoIndex = 0
        }
        this.$refs.musicPageSwiper.swiper.slideNext()
      }
    },
    previousMusic() {
      this.infoIndex = this.infoIndex * 1 - 1
      if (this.infoIndex < 0) {
        this.infoIndex = 0
      }
      this.$refs.musicPageSwiper.swiper.slidePrev()
      this.playMusic()
    },
    showList() {
      this.showPlayList = true
    },
    selectedMusic(index) {
      this.stopMusic();
      this.infoIndex = index
      this.playMusic()
    },
    deleteMusic(index) {
      // console.log(index)
      console.log(this.$store.state.index);
    },
    showPlayPage() {
      this.playBar = !this.playBar
      this.isShowPage = !this.isShowPage
      this.$emit('showHomePage', this.isShowPage);
    },
    formatTime(time) {
      let minute = Math.floor(time / 60),
        second = Math.floor(time - minute * 60)
      minute = (minute < 10) ? `0${minute}` : minute
      second = (second < 10) ? `0${second}` : second
      return `${minute}:${second}`
    },
    changePlayerType() {
      this.changePlayerTypeCode++
        switch (this.changePlayerTypeCode) {
          case 1:
            this.changePlayerTypeSrc = require('../../assets/image/playPage/listCirculate.png')
            this.listCirculatePlay()
            break
          case 2:
            this.changePlayerTypeSrc = require('../../assets/image/playPage/singleCirculate.png')
            this.singleCirculatePlay()
            break
          default:
            this.changePlayerTypeCode = 0
            this.changePlayerTypeSrc = require('../../assets/image/playPage/adjective.png')
            this.adjectivePlay()
            break
        }
    },
    listCirculatePlay() {
      this.initPlayerType()
      this.showPlayerCaption = true
      this.playerType.listPlayer = true
      this.playerCaption = '列表循环'
      setTimeout(() => {
        this.showPlayerCaption = false
      }, 8000)
    },
    singleCirculatePlay() {
      this.initPlayerType()
      this.showPlayerCaption = true
      this.playerType.singlePlayer = true;
      this.playerCaption = '单曲循环'
      setTimeout(() => {
        this.showPlayerCaption = false
      }, 8000)
    },
    adjectivePlay() {
      this.initPlayerType()
      this.showPlayerCaption = true
      this.playerType.adjectivePlayer = true;
      this.playerCaption = '列表播放'
      setTimeout(() => {
        this.showPlayerCaption = false
      }, 8000)
    },
    initPlayerType() {
      this.playerType.adjectivePlay = false
      this.playerType.singlePlayer = false
      this.playerType.listPlayer = false
    },
    spotMove(event) {
      let playerBar = this.$refs.playerBar,
        spotStart = playerBar.getBoundingClientRect().left,
        spotEnd = event.touches[0].pageX,
        audio = this.$refs.audio,
        musicPrecent = ((spotEnd - spotStart) / playerBar.offsetWidth).toFixed(3)
      if (musicPrecent > 1) {
        musicPrecent = 0.95
      }
      audio.currentTime = audio.duration * musicPrecent
    },
    changeProgress(event) {
      let playerBar = this.$refs.playerBar,
        spotStart = playerBar.getBoundingClientRect().left,
        pageX = event.pageX,
        audio = this.$refs.audio,
        musicPrecent = ((pageX - spotStart) / playerBar.offsetWidth).toFixed(3)
      if (musicPrecent > 1) {
        musicPrecent = 0.95
      }
      audio.currentTime = audio.duration * musicPrecent
    },
  }
}
</script>
