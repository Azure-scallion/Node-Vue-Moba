<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}分类</h1>
    <el-form
      label-width="120px"
      @submit.native.prevent="save"
      ref="creatRef"
      :model="model"
    >
      <el-form-item label="上级分类" prop="parent">
        <el-select v-model="model.parent">
          <el-option
            v-for="item in parentOption"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
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
    this.fetchParentOption();
  },
  name: "CategoryCreat",
  data() {
    return {
      model: {
        name: "",
      },
      parentOption: [],
    };
  },
  methods: {
    // 创建与修改分类
    async save() {
      let res;
      if (this.id) {
        // 修改分类
        res = await this.$http.put(`rest/categories/${this.id}`, this.model);
        this.$router.push("/categories/list");
        this.$message.success("保存成功");
      }
      // 添加分类
      if (!this.id && this.model.name.trim().length > 0) {
        res = await this.$http.post("rest/categories/", this.model);
        this.$router.push("/categories/list");
        this.$message.success("保存成功");
      } else if (!this.id && this.model.name.trim().length <= 0) {
        this.model.name = "";
        this.$message.error("不可为空！");
      }
    },
    // 根据id获取修改分类的信息
    async fetch() {
      const res = await this.$http.get("rest/categories/" + this.id);

      this.model = res.data;
    },
    // 获取父级分类信息列表
    async fetchParentOption() {
      const res = await this.$http.get(`rest/categories`);
      this.parentOption = res.data;
      // console.log(this.parentOption);
    },
  },
  beforeRouteLeave(to, from, next) {
    if (to.path === "/categories/create") {
      this.$refs.creatRef.resetFields();
      console.log("@@@", to);
      console.log("%%%", from);
    }

    next();
  },
};
</script>

<style>
</style>