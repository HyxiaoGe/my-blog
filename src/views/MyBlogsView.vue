<script setup>
import { useRouter } from 'vue-router'
import useTitle from '../hooks/useTitle'
import useNavToLogin from '../hooks/useNavToLogin'
import useGetBlogList from '../hooks/useGetBlogList'
import ListPage from '../components/ListPage.vue'

const $router = useRouter()

useNavToLogin() //未登录时跳转到登录页

useTitle('我的博客')

const { list, total, currentPage, pageSizeRef } = useGetBlogList({ my: true })

// 编辑博客，跳转到博客编辑页
function handleEdit(row) {
  $router.push(`/blog/${row.id}/edit`)
}
</script>

<template>
  <!-- 用table 显示博客列表，包括 title category likes favorites comments createdAt，再加两个操作按钮“编辑” “删除” -->
  <el-table :data="list" border style="width: 100%">
    <!-- 标题列，点击标题链接到博客详情页 -->
    <el-table-column prop="title" label="标题" width="180">
      <template #default="{ row }">
        <router-link :to="`/blog/${row.id}`">{{ row.title }}</router-link>
      </template>
    </el-table-column>
    <el-table-column prop="category" label="分类" width="180"></el-table-column>
    <el-table-column prop="likes" label="点赞" width="180"></el-table-column>
    <el-table-column prop="favorites" label="收藏" width="180"></el-table-column>
    <el-table-column prop="comments" label="评论" width="180"></el-table-column>
    <el-table-column prop="createdAt" label="创建时间" width="180"></el-table-column>
    <el-table-column label="操作" width="180">
      <template #default="{ row }">
        <el-button type="primary" size="mini" @click="handleEdit(row)">编辑</el-button>
        <el-button type="danger" size="mini" @click="handleDelete(row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <ListPage :total="total" :currentPage="currentPage" :pageSizeRef="pageSizeRef" />
</template>

<style scoped>
.el-table {
  margin-bottom: 20px;
}

.el-table-column {
  text-align: center;
}

.el-button {
  margin-left: 10px;
}

.el-button:first-child {
  margin-left: 0;
}

.el-button--mini {
  padding: 0 10px;
}

.el-button--primary {
  background-color: #409eff;
  border-color: #409eff;
}

.el-button--primary:hover {
  background-color: #66b1ff;
  border-color: #66b1ff;
}

.el-button--danger {
  background-color: #f56c6c;
  border-color: #f56c6c;
}

.el-button--danger:hover {
  background-color: #f78989;
  border-color: #f78989;
}

.el-table__row {
  height: 50px;
}

.el-table__row:hover {
  background-color: #f5f5f5;
}

.el-table__row--striped:hover {
  background-color: #f5f5f5;
}

.el-table__row--striped {
  background-color: #fafafa;
}

.el-table__row--current {
  background-color: #e6f7ff;
}
</style>
