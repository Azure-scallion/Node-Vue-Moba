<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}文章</h1>
    <el-form
      label-width="120px"
      @submit.native.prevent="save"
      ref="creatRef"
      :model="model"
    >
      <el-form-item label="所属分类" prop="categories">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in parentOption"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情" prop="body">
        <vue-editor
          v-model="model.body"
          useCustomImageHandler
          :headers="getAuthHeaders()"
          @image-added="handleImageAdded"
        ></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  props: {
    id: {},
  },
  components: { VueEditor },
  created() {
    this.id && this.fetch();
    this.fetchCategories();
  },
  name: "ArticleCreat",
  data() {
    return {
      model: {
        title: "",
        categories: [],
        body: "",
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
        res = await this.$http.put(`rest/articles/${this.id}`, this.model);
        this.$router.push("/articles/list");
        this.$message.success("保存成功");
      }
      // 添加分类
      if (!this.id && this.model.title.trim().length > 0) {
        res = await this.$http.post("rest/articles/", this.model);
        this.$router.push("/articles/list");
        this.$message.success("保存成功");
      } else if (!this.id && this.model.title.trim().length <= 0) {
        this.model.title = "";
        this.$message.error("不可为空！");
      }
    },
    // 根据id获取修改分类的信息
    async fetch() {
      const res = await this.$http.get("rest/articles/" + this.id);

      this.model = res.data;
    },
    // 获取父级分类信息列表
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`);
      this.parentOption = res.data;
      // console.log(this.parentOption);
    },
    // 富文本编辑器中上传图片
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post("upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
  },
  beforeRouteLeave(to, from, next) {
    if (to.path === "/articles/create") {
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