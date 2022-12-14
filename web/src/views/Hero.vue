<template>
  <div class="page-hero">
    <!-- 顶部头像 -->
    <div class="topbar bg-black py-2 px-4 d-flex ai-center">
      <img src="../assets/OIP-C.jpg" alt="" height="30" class="bdr" />
      <div class="text-white pr-3">王者荣耀</div>
      <div class="text-white flex-1">攻略站</div>
      <router-link tag="div" to="/" class="d-flex">
        <div class="text-white fs-xm">更多英雄</div>
        <i class="iconfont text-white">&#xe62e;</i>
      </router-link>
    </div>

    <!-- 皮肤展示区 -->
    <div>
      <div
        v-if="picUrl.pic"
        class="top"
        :style="{
          'background-image': `url(${picUrl.pic})`,
          'background-size': 'cover',
        }"
      >
        <div class="info text-white p-3 d-flex h-100 flex-column js-end">
          <div>{{ picUrl.name }}</div>
          <h2 class="my-2">{{ model.name }}</h2>
          <div>{{ model.categories.map((v) => v.name).join("/") }}</div>
          <div class="scores" v-if="model.scores">
            <span>难度</span>
            <span class="bage bg-primary">{{ model.scores.difficult }}</span>
            <span>技能</span>
            <span class="bage bg-info">{{ model.scores.skills }}</span>
            <span>攻击</span>
            <span class="bage bg-danger">{{ model.scores.attack }}</span>
            <span>生存</span>
            <span class="bage bg-grey">{{ model.scores.survive }}</span>
          </div>
        </div>
      </div>

      <!-- 皮肤选择区 -->
      <m-card iconPic="&#xe607;" title="英雄皮肤">
        <ul class="ulpic">
          <li
            class="pic d-flex ai-center flex-wrap js-center"
            v-for="skin in model.skins"
            :key="skin._id"
            @click="editPic(skin)"
          >
            <img :src="skin.icon" alt="" />
            <span class="fs-xm">{{ skin.name }}</span>
          </li>
        </ul>
      </m-card>
    </div>

    <!-- 推荐装备展示区 -->
    <m-card iconPic="&#xe60a;" title="装备推荐">
      <ul class="ulpic" v-if="model.items1">
        <p>顺风推荐</p>
        <li
          class="pic d-flex ai-center flex-wrap js-center"
          v-for="item in model.items1.sugges"
          :key="item._id"
        >
          <img :src="item.icon" alt="" />
          <span class="fs-xm">{{ item.name }}</span>
        </li>
      </ul>
      <ul class="ulpic py-3" v-if="model.items2">
        <p>逆风推荐</p>
        <li
          class="pic d-flex ai-center flex-wrap js-center"
          v-for="item in model.items2.sugges"
          :key="item._id"
        >
          <img :src="item.icon" alt="" />
          <span class="fs-xm">{{ item.name }}</span>
        </li>
      </ul>
    </m-card>

    <!-- 技能介绍区 -->
    <m-card iconPic="&#xe600;" title="英雄技能">
      <ul class="ulpic" v-if="model.skills">
        <li
          class="pic d-flex ai-center flex-wrap js-center"
          v-for="skill in model.skills"
          :key="skill._id"
          @click="editSkill(skill)"
        >
          <img :src="skill.icon" alt="" />
          <span class="fs-xm">{{ skill.name }}</span>
        </li>
      </ul>
      <div class="skill" v-if="skill">
        <div class="d-flex">
          <strong class="fs-xl">{{ skill.name }}</strong>
          <span class="flex-1">{{ skill.tips }}</span>
        </div>
        <p>技能描述：</p>
        <p>&emsp;&emsp;{{ skill.description }}</p>
      </div>
    </m-card>
  </div>
</template>
<script>
export default {
  name: "About",
  props: {
    id: { required: true },
  },
  created() {
    this.getFetch();
  },
  data() {
    return {
      model: {},
      picUrl: {},
      skill: {},
    };
  },
  methods: {
    async getFetch() {
      const res = await this.$http.get(`heroes/${this.id}`);
      this.model = res.data;
      this.picUrl = this.model.skins[0];
      this.skill = this.model.skills[0];

      console.log(this.model);
    },
    editPic(skin) {
      this.picUrl = skin;
    },
    editSkill(skill) {
      this.skill = skill;
    },
  },
};
</script>

<style lang="scss">
ul {
  list-style: none;
}
.page-hero {
  .top {
    height: 45vw;
    background-size: 100% auto;
  }
}
.middle {
  background-color: white;
}
.ulpic {
  display: flex;
  overflow: auto;
  .pic {
    border: 1px solid transparent;
    width: 80px;
    height: 80px;
    flex-shrink: 0;
    margin: 0 10px;
    img {
      width: 65px;
      height: 65px;
      border-radius: 50%;
    }
  }
}
::-webkit-scrollbar {
  display: none;
}

.info {
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
  .bage {
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
    line-height: 1rem;
    display: inline-block;
    text-align: center;
    font-size: 0.6rem;
  }
}
.skill {
  margin-top: 20px;
  strong {
    margin-bottom: 15px;
    display: inline-block;
    margin-right: 20px;
  }
}
</style>