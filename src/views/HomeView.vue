<script setup>
import useTitle from '../hooks/useTitle'
import BlogCard from '../components/BlogCard.vue'
import useGetBlogList from '../hooks/useGetBlogList'
import ListPage from '../components/ListPage.vue'

useTitle('首页')

const { list, total, currentPage, pageSizeRef } = useGetBlogList()
</script>

<template>
  <main>
    <div class="blog-container" v-for="item in list" :key="item.id">
      <BlogCard :blog="item" />
    </div>
    <ListPage :total="total" :currentPage="currentPage" :pageSizeRef="pageSizeRef" />
  </main>
</template>

<style scoped>
.blog-container {
  margin-bottom: 20px;
  border: 1px solid #f5f5f5;
}
</style>
