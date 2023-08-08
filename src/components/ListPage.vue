<script setup>
import { useRoute, useRouter } from 'vue-router'

// 获取路由对象
const $route = useRoute()
const $router = useRouter()

defineProps({
  total: {
    type: Number,
    required: true
  },
  currentPage: {
    type: Number,
    required: true
  },
  pageSizeRef: {
    type: Number,
    required: true
  }
})

function handleCurrentChange(newPage) {
  $router.push({
    query: {
      ...$route.query,
      page: newPage
    }
  })
}
</script>

<template>
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
</template>

<style scoped>
.pagination-container {
  display: flex;
  justify-content: center; /* 水平居中显示 */
  margin-top: 20px;
}
</style>
