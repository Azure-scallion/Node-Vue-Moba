<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}物品</h1>
    <el-form
      label-width="120px"
      @submit.native.prevent="save"
      ref="creatRef"
      :model="model"
    >
      <el-form-item label="名称" prop="name">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model="model.price"></el-input>
      </el-form-item>

      <el-form-item label="属性">
        <el-button icon="el-icon-plus" @click="model.properties.push({})"
          >添加属性</el-button
        >
      </el-form-item>
      <el-form-item v-for="(item, i) in model.properties" :key="i">
        <el-input class="h-input" v-model="item.value"></el-input>
        <el-button type="danger" @click="model.properties.splice(i, 1)"
          >删除</el-button
        >
      </el-form-item>

      <el-row>
        <el-form-item label="效果">
          <el-button icon="el-icon-plus" @click="model.effects.push({})"
            >添加效果</el-button
          >
        </el-form-item>
        <el-form-item v-for="(effect, j) in model.effects" :key="j">
          <el-col :md="11">
            <el-input type="textarea" v-model="effect.effect"></el-input>
          </el-col>
          <el-col>
            <el-button type="danger" @click="model.effects.splice(j, 1)"
              >删除</el-button
            >
          </el-col>
        </el-form-item>
      </el-row>

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
  name: "itemCreat",
  data() {
    return {
      model: {
        name: "",
        iconL: "",
        price: "",
        properties: [
          {
            values: "",
          },
        ],
        effects: [
          {
            effect: "",
          },
        ],
      },
    };
  },
  methods: {
    // 创建与修改分类
    async save() {
      let res;
      if (this.id) {
        // 修改分类
        res = await this.$http.put(`rest/items/${this.id}`, this.model);
        this.$router.push("/items/list");
        this.$message.success("保存成功");
      }
      // 添加分类
      if (!this.id && this.model.name.trim().length > 0) {
        res = await this.$http.post("rest/items/", this.model);
        this.$router.push("/items/list");
        this.$message.success("保存成功");
      } else if (!this.id && this.model.name.trim().length <= 0) {
        this.model.name = "";
        this.$message.error("不可为空！");
      }
    },
    // 根据id获取修改分类的信息
    async fetch() {
      const res = await this.$http.get("rest/items/" + this.id);

      this.model = res.data;
    },
    //图片上传成功触发
    afterUpload(res) {
      this.$set(this.model, "icon", res.url);
      console.log(res);
    },
    // 添加文本框
    addProp() {},
  },
  beforeRouteLeave(to, from, next) {
    if (to.path === "/items/create") {
      this.$refs.creatRef.resetFields();
      // console.log("@@@", to);
      // console.log("%%%", from);
    }
    next();
  },
};
</script>

<style >
.h-input {
  width: 50%;
}
</style>