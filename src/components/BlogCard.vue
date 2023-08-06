<template>
  <div class="blog-card" @click="handleClick">
    <!-- 上层显示 -->
    <div class="top">
      <div class="author"><i class="el-icon-user"></i> {{ author }}</div>
      <div class="category-time">
        <i class="el-icon-folder"></i> {{ category }} &nbsp;&nbsp;&nbsp;
        <i class="el-icon-time"></i> {{ formatTime(updatedAt) }}
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
      <div class="likes"><i class="el-icon-thumb-up"></i> {{ likes }}</div>
      <div class="favorites"><i class="el-icon-star-on"></i> {{ favorites }}</div>
      <div class="comments"><i class="el-icon-chat-dot-round"></i> {{ comments }}</div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

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
    const { author, category, updatedAt, title, summary, description, likes, favorites, comments } =
      blog.value

    // 格式化时间为"YYYY-MM-DD"格式
    function formatTime(time) {
      const date = new Date(time)
      return date.toISOString().slice(0, 10)
    }

    return {
      author,
      category,
      updatedAt,
      title,
      summary,
      description,
      likes,
      favorites,
      comments,
      handleClick,
      formatTime
    }
  }
}
</script>

<style>
.blog-card {
  padding: 10px;
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
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #666;
}

.author,
.category-time {
  display: flex;
  align-items: center;
}

.middle {
  margin: 10px 0;
}

.title {
  font-size: 20px;
  cursor: pointer;
}

.title a {
  color: #1890ff; /* 蓝色字体 */
  text-decoration: underline; /* 添加下划线效果 */
}

.summary {
  color: #666;
  line-height: 1.5;
}

.description {
  color: #999;
  line-height: 1.5;
}

.bottom {
  display: flex;
  justify-content: flex-end;
  font-size: 14px;
  color: #999;
}

.bottom div {
  margin-left: 10px;
}
</style>
