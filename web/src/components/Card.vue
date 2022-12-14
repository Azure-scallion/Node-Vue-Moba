<template>
  <div class="card p-3 bg-white p-3 mt-3">
    <div class="card-header d-flex js-between pb-3">
      <i class="iconfont" v-html="iconPic"></i>
      <p class="px-2 fs-xl flex-1">{{ title }}</p>
      <i class="iconfont">&#xe60c;</i>
    </div>
    <div class="card-body pt-3">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, require: true },
    iconPic: { type: String, require: true },
  },
};
</script>

<style lang='scss'>
.card {
  border-bottom: 1px solid #ccc;
  .card-header {
    border-bottom: 1px solid #ccc;
  }
}
</style>