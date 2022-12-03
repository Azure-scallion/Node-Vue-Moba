<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}英雄</h1>
    <el-form
      label-width="120px"
      @submit.native.prevent="save"
      ref="creatRef"
      :model="model"
    >
      <el-tabs value="basic" type="border-card">
        <el-tab-pane label="基本信息" name="basic">
          <el-form-item label="名称" prop="name">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号" prop="title">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="头像" prop="avatar">
            <el-upload
              class="avatar-uploader"
              :headers="getAuthHeaders()"
              :action="$http.defaults.baseURL + '/upload'"
              :show-file-list="false"
              :on-success="afterUpload"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="难度" prop="scores">
            <el-rate
              v-model="model.scores.difficult"
              :max="9"
              show-score
              style="margin-top: 0.8rem"
            ></el-rate>
          </el-form-item>
          <el-form-item label="技能" prop="scores">
            <el-rate
              v-model="model.scores.skills"
              :max="9"
              show-score
              style="margin-top: 0.8rem"
            ></el-rate>
          </el-form-item>
          <el-form-item label="攻击" prop="scores">
            <el-rate
              v-model="model.scores.attack"
              :max="9"
              show-score
              style="margin-top: 0.8rem"
            ></el-rate>
          </el-form-item>
          <el-form-item label="生存" prop="scores">
            <el-rate
              v-model="model.scores.survive"
              :max="9"
              show-score
              style="margin-top: 0.8rem"
            ></el-rate>
          </el-form-item>
          <el-form-item label="类型" prop="categories">
            <el-select v-model="model.categories" placeholder="请选择" multiple>
              <el-option
                v-for="item in categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="装备建议" name="suppose">
          <el-form-item label="顺风出装" prop="items1.sugges">
            <el-select
              v-model="model.items1.sugges"
              placeholder="请选择"
              multiple
            >
              <el-option
                v-for="item in items"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="顺风出装描述" prop="items1">
            <el-input type="textarea" v-model="model.items1.tips"></el-input>
          </el-form-item>
          <el-form-item label="逆风出装" prop="items2.sugges">
            <el-select
              v-model="model.items2.sugges"
              placeholder="请选择"
              multiple
            >
              <el-option
                v-for="item in items"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装描述" prop="items2">
            <el-input type="textarea" v-model="model.items2.tips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <el-button icon="el-icon-plus" @click="model.skills.push({})"
            >添加技能</el-button
          >
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item, i) in model.skills" :key="i">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL + '/upload'"
                  :headers="getAuthHeaders()"
                  :show-file-list="false"
                  :on-success="(res) => $set(item, 'icon', res.url)"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item label="消耗">
                <el-input type="text" v-model="item.tips"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="model.skills.splice(i, 1)"
                  >删除</el-button
                >
              </el-form-item>
            </el-col>
            <el-col :md="12"> </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>

      <el-form-item style="margin-top: 1rem">
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {},
  },
  created() {
    this.id && this.fetch();
    this.fetchCategories();
    this.fetchItems();
  },
  name: "HeroCreat",
  data() {
    return {
      model: {
        name: "",
        avatar: "",
        scores: {
          difficult: 0,
          attack: 0,
          skills: 0,
          survive: 0,
        },
        // 顺风
        items1: {
          sugges: [],
          tips: "",
        },
        // 逆风
        items2: {
          sugges: [],
          tips: "",
        },
        skills: [
          {
            icon: "",
            description: "",
            name: "",
            tips: "",
          },
        ],
      },
      //英雄分类列表
      categories: [],
      // 装备列表
      items: [],
    };
  },
  methods: {
    // 创建与修改分类
    async save() {
      let res;
      if (this.id) {
        // 修改分类
        res = await this.$http.put(`rest/heroes/${this.id}`, this.model);
        this.$router.push("/heroes/list");
        this.$message.success("保存成功");
        console.log(this.model);
      }
      // 添加分类
      if (!this.id && this.model.name.trim().length > 0) {
        res = await this.$http.post("rest/heroes/", this.model);
        this.$router.push("/heroes/list");
        this.$message.success("保存成功");
      } else if (!this.id && this.model.name.trim().length <= 0) {
        this.model.name = "";
        this.$message.error("不可为空！");
      }
    },
    // 根据id获取修改分类的信息
    async fetch() {
      const res = await this.$http.get("rest/heroes/" + this.id);
      this.model = { ...this.model, ...res.data };
      console.log(this.model);
    },
    // 获取英雄分类列表
    async fetchCategories() {
      const res = await this.$http.get("rest/categories");
      this.categories = res.data;
      // console.log(this.model.categories);
    },
    // 获取装备列表
    async fetchItems() {
      const res = await this.$http.get("rest/items");
      this.items = res.data;
      // console.log(this.model.categories);
    },
    //图片上传成功触发
    afterUpload(res) {
      this.model.avatar = res.url;
      console.log(res);
    },
  },
  beforeRouteLeave(to, from, next) {
    if (to.path === "/heroes/create") {
      this.$refs.creatRef.resetFields();
      console.log("@@@", to);
      console.log("%%%", from);
    }

    next();
  },
};
</script>

<style >
</style>