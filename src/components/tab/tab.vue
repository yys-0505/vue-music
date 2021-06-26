<template>
  <div class="tab">
    <router-link custom v-slot="{ navigate, isActive }" to="/recommend">
      <div class="tab-item" @click="navigate" role="link" :class="[isActive && 'router-link-active']">
        <span class="tab-link">推荐</span>
      </div>
    </router-link>
    <router-link custom v-slot="{ navigate, isActive }" to="/singer">
      <div class="tab-item" @click="navigate" role="link" :class="[isActive && 'router-link-active']">
        <span class="tab-link">歌手</span>
      </div>
    </router-link>
    <router-link custom v-slot="{ navigate, isActive }" to="/rank">
      <div class="tab-item" @click="navigate" role="link" :class="[isActive && 'router-link-active']">
        <span class="tab-link">排行</span>
      </div>
    </router-link>
    <router-link custom v-slot="{ navigate, isActive }" to="/search">
      <div class="tab-item" @click="navigate" role="link" :class="[isActive && 'router-link-active']">
        <span class="tab-link">搜索</span>
      </div>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .tab
    display: flex
    height: 44px
    line-height: 44px
    font-size: $font-size-medium
    .tab-item
      flex: 1
      text-align: center
      .tab-link
        padding-bottom: 5px
        color: $color-text-l
      &.router-link-active
        .tab-link
          color: $color-theme
          border-bottom: 2px solid $color-theme
</style>