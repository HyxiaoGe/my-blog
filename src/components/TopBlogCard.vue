<script setup>
import { ref, onMounted  } from 'vue'
import { useRouter } from 'vue-router'
import { getTopBlogs } from '@/api/blogApi'

const topBlogs = ref([])
const router = useRouter()

onMounted(async () => {
  try {
    const response = await getTopBlogs()
    if (response && response.rows) {
      topBlogs.value = response.rows
    } else {
      console.error('Unexpected response structure:', response)
    }
  } catch (error) {
    console.error('Failed to load top blogs:', error)
  }
})

const handleClick = (blogId) => {
  router.push(`/blog/${blogId}`)
}

</script>

<template>
  <div class="top-blog-card">
    <h2 class="top-blog-title">热门博客</h2>
    <div class="top-blog-list">
      <div class="blog-entry" v-for="blog in topBlogs" :key="blog.id" @click=" () => handleClick(blog.id) ">
        <a href="javascript:void(0)" class="blog-link">{{ blog.title }}</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.top-blog-card {
  border: 1px solid #f5f5f5;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.top-blog-card:hover {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
  background-color: #fafafa;
}

.top-blog-title {
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eaeaea;
  font-size: 18px;
  color: #333;
}

.top-blog-list {
  max-height: 400px;
  overflow-y: auto;
}

.blog-entry {
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  transition: background-color 0.3s ease;
}

.blog-entry:last-child {
  border-bottom: none;
}

.blog-entry a {
  display: block;
  padding: 10px;
  text-decoration: none;
  color: #333; /* 统一字体颜色 */
  background-color: #fff;
  transition: color 0.3s ease, background-color 0.3s ease;
  border-radius: 4px;
}

.blog-entry a:hover {
  color: #555;
  background-color: #f0f0f0;
}
</style>


