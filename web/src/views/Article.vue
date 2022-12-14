<template>
  <div class="page-Article" v-if="model">
    <div class="d-flex py-3 px-2 border-bottom" @click="$router.push('/')">
      <i class="iconfont text-info">&#xe62f;</i>
      <strong class="flex-1 text-info">{{ model.title }}</strong>
      <div class="fs-sm text-grey">2022-12-6</div>
    </div>

    <div class="box py-2 d-flex ai-center flex-wrap" v-html="model.body"></div>
    <div class="px-3 border-top py-2">
      <div class="py-2 d-flex ai-center">
        <i class="iconfont">&#xe61f;</i>
        <span class="text-info fs-lg">相关资讯</span>
      </div>
      <router-link
        class="py-1"
        tag="div"
        v-for="item in model.related"
        :key="item._id"
        :to="`/articles/${item._id}`"
        >{{ item.title }}</router-link
      >
    </div>
  </div>
</template>
<script>
export default {
  name: "Article",
  props: {
    id: { required: true },
  },
  watch: {
    id() {
      this.fetch();
    },
  },
  created() {
    this.fetch();
  },
  data() {
    return {
      model: null,
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`articles/${this.id}`);
      this.model = res.data;
    },
  },
};
</script>

<style lang="scss">
.page-Article {
  .box {
    img {
      max-width: 100%;
      height: auto;
    }
    iframe {
      max-width: 100%;
      height: auto;
    }
  }
}
</style>
