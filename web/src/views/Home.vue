<template>
  <div>
    <!-- 轮播图 -->
    <swiper :options="swiperOption">
      <swiper-slide>
        <img class="w-100" src="../assets/images/16699806958604.jpg" alt="" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/16633135373244.jpg" alt="" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/16680726176490.jpg" alt="" />
      </swiper-slide>
      <div
        class="swiper-pagination pagination-home text-right px-3 pb-2"
        slot="pagination"
      ></div>
    </swiper>

    <!-- 功能区 -->
    <div class="nav-icons bg-white mt-3 pt-3 text-center text-grey-1">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="(icon, index) in icons" :key="index">
          <span class="iconfont" v-html="icon"></span>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-xs">
        <i class="iconfont fs-xs">&#xe62c;</i>
        <span>收起</span>
      </div>
    </div>

    <!-- 一级题头 -->
    <m-list-card iconPic="&#xe622;" title="新闻资讯" :categories="newsCats">
      <template #items="{ category }">
        <router-link
          tag="div"
          :to="`/articles/${item._id}`"
          class="py-2 fs-lg d-flex"
          v-for="(item, i) in category.newsList"
          :key="i"
        >
          <span class="text-info">[{{ item.categoryName }}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{
            item.title
          }}</span>
          <span class="text-grey fs-sm">{{
            dayjs(item.createdAt).format("MM/DD")
          }}</span>
        </router-link>
      </template>
    </m-list-card>

    <!-- 一级题头 -->
    <m-list-card iconPic="&#xe60a;" title="英雄列表" :categories="heroList">
      <template #items="{ category }">
        <div class="d-flex flex-wrap" style="margin: 0 -0.4rem">
          <router-link
            tag="div"
            :to="`hero/${hero._id}`"
            class="p-2 text-center fs-xxs"
            style="width: 20%"
            v-for="(hero, i) in category.heroList"
            :key="i"
          >
            <img class="w-100" :src="hero.avatar" alt="" />
            <div>{{ hero.name }}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>
  </div>
</template>


<script>
import dayjs from "dayjs";

export default {
  name: "Home",

  data() {
    return {
      // swiper组件属性
      swiperOption: {
        pagination: {
          el: ".pagination-home",
        },
      },
      // 图标
      icons: [
        "&#xe61b;",
        "&#xe621;",
        "&#xe680;",
        "&#xe62a;",
        "&#xe61f;",
        "&#xe600;",
        "&#xe632;",
        "&#xe647;",
        "&#xe637;",
        "&#xe624;",
      ],
      // 分类数据
      newsCats: [],
      heroList: [],
    };
  },
  created() {
    this.fetchNewsCats();
    this.fetchHeroCats();
  },
  methods: {
    // 获取新闻
    async fetchNewsCats() {
      const res = await this.$http.get("news/list");
      this.newsCats = res.data;
      // console.log(res.data);
    },
    // 获取英雄
    async fetchHeroCats() {
      const res = await this.$http.get("heroes/list");
      this.heroList = res.data;
      console.log(res.data);
    },
  },
};
</script>

<style lang="scss">
.pagination-home {
  .swiper-pagination-bullet {
    background: #fff;
    opacity: 0.6;
    &.swiper-pagination-bullet-active {
      opacity: 1;
    }
  }
}
.nav-icons {
  border-top: 1px solid #d4d9de;
  border-bottom: 1px solid #d4d9de;
  .nav-item {
    width: 25%;
    border-right: 0.0769rem solid #d4d9de;
    &.iconfont {
      font-size: 1.7692rem;
    }
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
.nav {
  display: flex;
  .nav-item {
    border-bottom: 3px solid transparent;
    padding-bottom: 0.2rem;
    &.active {
      color: orange;
      border-bottom-color: orange;
    }
  }
  &.nav-inverse {
    .nav-item {
      color: white;
      &.active {
        border-bottom-color: white;
      }
    }
  }
}
</style>
