<script setup>
import useTitle from '../hooks/useTitle'
import BlogCard from '../components/BlogCard.vue'
import TopBlogCard from '../components/TopBlogCard.vue'
import useGetBlogList from '../hooks/useGetBlogList'
import ListPage from '../components/ListPage.vue'

useTitle('首页')

const { rows, total, currentPage, pageSizeRef } = useGetBlogList()

</script>

<template>
  <main class="content-container">
    <div class="blog-list">
      <div class="blog-container" v-for="item in rows" :key="item.id">
        <BlogCard :blog="item" />
      </div>
      <ListPage :total="total" :currentPage="currentPage" :pageSizeRef="pageSizeRef" />
    </div>
    <div class="top-blog">
      <TopBlogCard />
    </div>
  </main>
</template>

<style scoped>
.content-container {
  display: flex;
  justify-content: space-between;
}

.blog-list {
  flex: 3; /* 博客列表占据更多空间 */
  margin-right: 20px; /* 右边栏和左边栏之间的空隙 */
}

.blog-container {
  margin-bottom: 20px;
  border: 1px solid #f5f5f5;
}

.top-blog {
  flex: 1; /* TopBlogCard占据较少的空间 */
  width: 20%; /* 或者你可以设置一个具体的宽度 */
  /* 如果TopBlogCard内容太多，可能需要滚动 */
  overflow: auto;
}
</style>

