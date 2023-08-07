<script setup>
import { ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getBlogs } from '../api/blogApi'
import useTitle from '../hooks/useTitle'
import BlogCard from '../components/BlogCard.vue'

useTitle('首页')

// 获取路由对象
const $route = useRoute()
const $router = useRouter()

// 定义 list total
const list = ref([])
const total = ref(0)
const currentPage = ref(1)
const pageSizeRef = ref(10)

// 使用 watchEffect 监听 url 参数 page pageSize category keyword 变化，并获取博客列表和总数
watchEffect(async () => {
  const query = $route.query
  currentPage.value = parseInt(query.page) || 1
  const page = parseInt(query.page) || 1
  pageSizeRef.value = parseInt(query.pageSize) || 10

  const pageSize = parseInt(query.pageSize) || 10
  const category = query.category
  const keyword = query.keyword
  const res = await getBlogs(page, pageSize, category, keyword)
  list.value = res.list
  total.value = res.total
})

function handleCurrentChange(newPage) {
  $router.push({
    query: {
      ...$route.query,
      page: newPage,
    },
  })
}
</script>

<template>
  <main>
    <h1>Home</h1>
    <div class="blog-container" v-for="item in list" :key="item.id">
      <BlogCard :blog="item" />
    </div>

    <div class="pagination-container">
      <el-pagination
        :current-page="currentPage"
        :page-size="pageSizeRef"
        :total="total"
        layout="prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </main>
</template>

<style scoped>
.blog-container {
  margin-bottom: 20px;
  border: 1px solid #f5f5f5;
}

.pagination-container {
  display: flex;
  justify-content: center; /* 水平居中显示 */
  margin-top: 20px;
}
</style>
