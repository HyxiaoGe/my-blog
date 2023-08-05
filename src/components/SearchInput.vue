<script setup>
import { ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// 获取路由实例
const route = useRoute();
const router = useRouter();

// 定义 keyword 的 ref
const keyword = ref('');

// 监听路由变化，实时更新 keyword
watchEffect(() => {
  keyword.value = route.query.keyword || '';
});

// 处理搜索事件，跳转到当前路径并加上 keyword 参数
function handleSearch() {
  const query = { ...route.query, keyword: keyword.value };
  router.push({ path: route.path, query });
}

</script>

<template>
    <el-input
      v-model="keyword"
      placeholder="请输入搜索关键字"
      @keyup.enter="handleSearch"
      clearable
      class="search-input"
    />
  </template>
  
  <style>
  .search-input {
    width: 200px;
    height: 40px;
  }
  </style>
  