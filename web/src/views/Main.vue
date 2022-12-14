<template>
  <div>
    <!-- 顶部头像 -->
    <div class="topbar bg-black py-2 px-4 d-flex ai-center">
      <img src="../assets/OIP-C.jpg" alt="" height="30" class="bdr" />
      <div class="px-2 flex-1">
        <div class="text-white">王者荣耀</div>
        <div class="text-grey-1 fs-xxs">团队成就更多</div>
      </div>
      <button type="button" class="btn bg-primary">立即下载</button>
    </div>
    <!-- 导航栏区域 -->
    <div class="bg-primary pt-3 pb-2">
      <div class="nav nav-inverse js-around pb-1">
        <div class="nav-item active">
          <router-link to="/" tag="div" class="nav-link">首页</router-link>
        </div>
        <div class="nav-item">
          <router-link to="/" tag="div" class="nav-link">攻略中心</router-link>
        </div>
        <div class="nav-item">
          <router-link to="/" tag="div" class="nav-link">赛事中心</router-link>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Main",
  components: {},
};
</script>
<style lang="scss">
.topbar {
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>
