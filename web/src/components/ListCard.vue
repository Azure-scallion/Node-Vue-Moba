<template>
  <m-card :iconPic="iconPic" :title="title">
    <!-- 二级题头 -->
    <div class="nav pt-3 js-between">
      <div
        class="nav-item"
        :class="{ active: active === index }"
        v-for="(category, index) in categories"
        :key="index"
        @click="$refs.list.swiper.slideTo(index)"
      >
        <div class="nav-link">{{ category.name }}</div>
      </div>
    </div>
    <!-- 内容 -->
    <div class="pt-3">
      <swiper
        ref="list"
        :options="{ autoHeight: true }"
        @slide-change="() => (active = $refs.list.swiper.realIndex)"
      >
        <swiper-slide
          v-for="(category, index) in categories"
          :key="index"
          class="pl-1"
        >
          <slot name="items" :category="category"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </m-card>
</template>

<script>
export default {
  props: {
    iconPic: { type: String, required: true },
    title: { type: String, required: true },
    categories: { type: Array, required: true },
  },
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style>
</style>