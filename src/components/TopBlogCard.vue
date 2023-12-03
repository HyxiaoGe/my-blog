<script setup>
import { ref, onMounted  } from 'vue'
import { useRouter } from 'vue-router'
import { getTopBlogs } from '@/api/blogApi'

const topBlogs = ref([])
const router = useRouter()

onMounted(async () => {
  try {
    const response = await getTopBlogs()
    console.log('Data received:', response) // 添加日志查看收到的数据
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
  margin-bottom: 20px; /* 或根据需要进行调整 */
}

.top-blog-title {
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid #eaeaea; /* 添加一条线以分隔标题和列表 */
}

.top-blog-list {
  max-height: 400px; /* 或根据需要进行调整 */
  overflow-y: auto; /* 添加滚动条 */
}

.blog-entry {
  margin-bottom: 10px; /* 每条博客之间的间距 */
}

.blog-link {
  display: block; /* 链接占满整行 */
  white-space: nowrap; /* 不换行 */
  overflow: hidden; /* 超出部分隐藏 */
  text-overflow: ellipsis; /* 超出部分显示省略号 */
  max-width: 100%; /* 限制最大宽度 */
  color: #333; /* 文本颜色，根据需要调整 */
  text-decoration: none; /* 去除下划线 */
}

.blog-link:hover {
  color: #555; /* 鼠标悬浮时的文本颜色，根据需要调整 */
}

.blog-entry {
  transition: background-color 0.3s ease, box-shadow 0.3s ease; /* 添加过渡效果 */
  cursor: pointer; /* 表明可以点击 */
}

.blog-entry:hover, .blog-entry:active {
  background-color: #f0f0f0; /* 鼠标悬停时的背景色 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* 鼠标悬停时的阴影效果 */
}

.blog-link {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  color: #333;
  text-decoration: none;
  transition: color 0.3s ease; /* 添加文本颜色变化的过渡效果 */
}

.blog-link:hover, .blog-link:active {
  color: #555; /* 鼠标悬停和点击时文本颜色变化 */
}
</style>

