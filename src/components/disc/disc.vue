<template>
  <transition name="slide" appear>
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
import MusicList from 'components/music-list/music-list'
import { getSongList } from 'api/recommend'
import { getSongVkey } from 'api/singer'
import { mapGetters } from 'vuex'
import { createSong } from 'common/js/song'
import { parseSongUrl } from 'common/js/utils'

export default {
  computed: {
    title() {
      return this.disc.dissname
    },
    bgImage() {
      return this.disc.imgurl
    },
    ...mapGetters([
      'disc'
    ])
  },
  data() {
    return {
      songs: []
    }
  },
  created() {
    this._getSongList()
    window.onerror = function() { return true }
  },
  methods: {
    _getSongList() {
      if (!this.disc.dissid) {
        this.$router.push('/recommend')
        return
      }
      // 7256912512
      getSongList(this.disc.dissid).then((res) => {
        const temDiv = document.createElement('div')
        temDiv.innerHTML = res
        const aScript = [].slice.call(temDiv.querySelectorAll('script'))
        const theOne = aScript.find(s => s.innerText.includes('songlist'))
        const data = JSON.parse(theOne.innerText.match(/\{.*\}/g)[0])
        this.songs = this._normalizeSongs(data.taogeData.songlist)
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach(musicData => {
        getSongVkey(musicData.mid).then(res => {
          const { id, mid, singer, name, album, interval } = musicData
          const url = parseSongUrl(res)
          const data = {
            songid: id,
            songmid: mid,
            singer,
            songname: name,
            albumname: album.name,
            interval,
            albummid: album.id,
            image: `https://y.qq.com/music/photo_new/T002R300x300M000${album.mid}_1.jpg?max_age=2592000`
          }
          if (data.songid && data.albummid) { // 必须的值
            ret.push(createSong(data, url ? unescape(url) : ''))
          }
        })
      })
      return ret
    }
  },
  beforeDestroy() {
    window.onerror = null
  },
  components: {
    MusicList
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.slide-enter-active, .slide-leave-active
  transition: all 0.3s

.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
</style>