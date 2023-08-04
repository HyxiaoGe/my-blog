<script setup>
import {ref, onMounted} from 'vue'
import { getBlogs } from '../api/blogApi';

// 获取博客列表
const blogList = ref([])
onMounted(async () => {
  const res = await getBlogs()
  blogList.value = res.data
  console.log("blogList", blogList.value)
})
</script>

<template>
  <main>
    <h1>Home</h1>
  </main>
</template>
