<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { formatDate } from '../utils/date'

export default {
  props: {
    blog: Object // 声明props
  },
  setup(props) {
    const blog = ref(props.blog)

    const router = useRouter()

    // 点击卡片跳转到博客详情页
    function handleClick() {
      router.push(`/blog/${blog.value.id}`)
    }

    // 解构 blog 对象的属性
    const {
      author,
      category,
      updatedTime,
      title,
      summary,
      description,
      likes,
      comments
    } = blog.value

    // 格式化 category
    let categoryName = category

    if (category === 'frontend') {
      categoryName = '前端'
    } else if (category === 'java') {
      categoryName = 'Java'
    } else if (category === 'python') {
      categoryName = 'Python'
    } else if (category === 'mini-program') {
      categoryName = '小程序'
    }

    return {
      author,
      categoryName,
      updatedTime,
      title,
      summary,
      description,
      likes,
      comments,
      handleClick,
      formatDate
    }
  }
}
</script>

<template>
  <div class="blog-card" @click="handleClick">
    <!-- 上层显示 -->
    <div class="top">
      <div class="left-info">
        <div class="author">
          <el-icon><User /></el-icon> {{ author }}
        </div>
        <div class="category-time">
          <i class="el-icon-folder"></i> {{ categoryName }} &nbsp;&nbsp;&nbsp;
          <i class="el-icon-time"></i> {{ formatDate(updatedTime) }}
        </div>
      </div>
    </div>
    <!-- 中层显示 -->
    <div class="middle">
      <h2 class="title">
        <a href="javascript:void(0)" class="link">{{ title }}</a>
      </h2>
      <p class="summary">{{ summary }}</p>
      <p class="description">{{ description }}</p>
    </div>
    <!-- 下层显示 -->
    <div class="bottom">
      <div class="left-info">
        <div class="likes">
          <el-icon><Pointer /></el-icon> {{ likes }}
        </div>
        <div class="comments">
          <el-icon><Comment /></el-icon> {{ comments }}
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.blog-card {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: background-color 0.3s;
  cursor: pointer;
}

.blog-card:hover {
  background-color: #f5f5f5;
}

.top {
  display: flex;
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
}

.left-info {
  display: flex;
  align-items: center;
}

.author,
.category-time,
.likes,
.comments {
  margin-right: 8px;
}

.category-time {
  margin-left: 8px;
}

.gray-text {
  color: #999;
}

.middle {
  margin: 4px 0;
}

.title {
  font-size: 20px;
  cursor: pointer;
}

.title a {
  color: #1890ff;
  text-decoration: underline;
}

.summary,
.description {
  color: #666;
  line-height: 1.5;
}

.bottom {
  display: flex;
  justify-content: flex-start; /* 靠左显示 */
  font-size: 14px;
  color: #999;
}

.bottom div {
  margin-right: 10px; /* 调整间距 */
}
</style>
