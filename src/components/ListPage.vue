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

const handleCurrentChange = (newPage) => {
  $router.push({
    query: {
      ...$route.query,
      page: newPage
    }
  })
};
</script>

<template>
  <div class="pagination">
    <el-pagination
      background
      :current-page= currentPage
      :page-size="pageSizeRef"
      :total="total"
      layout="total, size, prev, pager, next"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  justify-content: center; /* 水平居中显示 */
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
