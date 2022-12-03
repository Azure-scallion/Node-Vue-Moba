<template>
  <div class="login-container">
    <el-card header="请先登录" class="login-card">
      <el-form ref="loginRef" :model="model">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="model.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      const res = await this.$http.post("login", this.model);
      console.log(res);
      sessionStorage.token = res.data.token;
      this.$router.push("/");
      this.$message.success("登录成功");
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  width: 100%;
  height: 100%;
}
.login-card {
  width: 25rem;
  margin: auto;
}
</style>