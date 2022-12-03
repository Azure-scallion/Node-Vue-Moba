<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}管理员</h1>
    <el-form
      label-width="120px"
      @submit.native.prevent="save"
      ref="creatRef"
      :model="model"
    >
      <el-form-item label="管理员" prop="username">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="model.password" type="text"></el-input>
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
  },
  name: "AdminUserCreat",
  data() {
    return {
      model: {
        username: "",
        password: "",
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
        res = await this.$http.put(`rest/admin_users/${this.id}`, this.model);
        this.$router.push("/admin_users/list");
        this.$message.success("保存成功");
      }
      // 添加分类
      if (!this.id && this.model.username.trim().length > 0) {
        res = await this.$http.post("rest/admin_users/", this.model);
        this.$router.push("/admin_users/list");
        this.$message.success("保存成功");
      } else if (!this.id && this.model.username.trim().length <= 0) {
        this.model.username = "";
        this.$message.error("不可为空！");
      }
    },
    // 根据id获取修改分类的信息
    async fetch() {
      const res = await this.$http.get("rest/admin_users/" + this.id);

      this.model = { ...res.data };
    },
    // 获取父级分类信息列表
  },
  beforeRouteLeave(to, from, next) {
    if (to.path === "/admin_users/create") {
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