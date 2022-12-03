<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}广告位</h1>
    <el-form
      label-width="120px"
      @submit.native.prevent="save"
      ref="creatRef"
      :model="model"
    >
      <el-form-item label="名称" prop="name">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button icon="el-icon-plus" @click="model.items.push({})"
          >添加链接</el-button
        >
        <el-row type="flex" style="flex-wrap: wrap">
          <el-col :md="24" v-for="(item, i) in model.items" :key="i">
            <el-form-item label="跳转链接（URL）" label-width="130px">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <el-form-item
              label="图片"
              style="margin-top: 0.5rem"
              label-width="130px"
            >
              <el-upload
                class="box"
                :action="$http.defaults.baseURL + '/upload'"
                :show-file-list="false"
                :on-success="(res) => $set(item, 'image', res.url)"
              >
                <img v-if="item.image" :src="item.image" class="box-img" />
                <i v-else class="el-icon-plus box-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="model.items.splice(i, 1)"
                >删除</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
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
  name: "CategoryCreat",
  data() {
    return {
      model: {
        name: "",
        items: [],
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
        res = await this.$http.put(`rest/ads/${this.id}`, this.model);
        this.$router.push("/ads/list");
        this.$message.success("保存成功");
      }
      // 添加分类
      if (!this.id && this.model.name.trim().length > 0) {
        res = await this.$http.post("rest/ads/", this.model);
        this.$router.push("/ads/list");
        this.$message.success("保存成功");
      } else if (!this.id && this.model.name.trim().length <= 0) {
        this.model.name = "";
        this.$message.error("不可为空！");
      }
    },
    // 根据id获取修改分类的信息
    async fetch() {
      const res = await this.$http.get("rest/ads/" + this.id);

      this.model = { ...res.data };
    },
  },
  beforeRouteLeave(to, from, next) {
    if (to.path === "/ads/create") {
      this.$refs.creatRef.resetFields();
      console.log("@@@", to);
      console.log("%%%", from);
    }

    next();
  },
};
</script>

<style scoped>
.box,
.el-uploader {
  border: 1px dashed #c2c2c2;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 10rem;
  height: 5rem;
}
.box,
.el-uploader:hover {
  border-color: #409eff;
}
.box-img {
  width: 10rem;
  height: 5rem;
  display: block;
}
.box-icon {
  font-size: 28px;
  color: #8c939d;
  width: 10rem;
  height: 5rem;
  line-height: 5rem;
  text-align: center;
}
</style>
