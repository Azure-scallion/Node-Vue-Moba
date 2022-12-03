<template>
  <div>
    <h1>分类列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="230"></el-table-column>
      <el-table-column prop="parent.name" label="上级分类"></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template v-slot="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/categories/create/${scope.row._id}`)"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="remove(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "CategoryList",
  data() {
    return {
      items: [],
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    // 获取分类列表
    async fetch() {
      const res = await this.$http.get("rest/categories");

      this.items = res.data;
    },
    // 移除分类
    async remove(row) {
      const confirmResult = await this.$confirm(
        `此操作将永久删除分类${row.name}, 是否继续?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }
      const res = await this.$http.delete(`rest/categories/${row._id}`);
      if (res.status !== 200) {
        return this.$message.error("删除分类失败");
      }
      this.$message.success("删除成功");

      this.fetch();
    },
  },
};
</script>

<style>
</style>