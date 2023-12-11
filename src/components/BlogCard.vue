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
      category,
      createdTime,
      updatedTime,
      title,
      summary,
      description,
      views,
      likes,
      comments
    } = blog.value

    // 格式化 category
    let categoryName = category

    if (category === 'frontend') {
      categoryName = '前端'
    } else if (category === 'java') {
      categoryName = 'Java'
    } else if (category === 'mysql') {
      categoryName = 'MySQL'
    } else if (category === 'computer-network') {
      categoryName = '计算机网络'
    } else if (category === 'linux') {
      categoryName = 'Linux'
    } else if (category === 'cloud-native') {
      categoryName = '云原生'
    } else if (category === 'mq') {
      categoryName = '消息队列'
    } else if (category === 'es') {
      categoryName = 'Elasticsearch'
    } else if (category === 'redis') {
      categoryName = 'Redis'
    }

    return {
      categoryName,
      createdTime,
      updatedTime,
      title,
      summary,
      description,
      views,
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
    <!-- 上层显示：分类和时间 -->
    <div class="top">
      <div>
        <i class="el-icon-folder icon-style"></i>
        <el-icon><List /></el-icon>
        <span class="category-name">{{ categoryName }}</span>
        <i class="el-icon-time icon-style"></i>
        <span class="created-time">{{ formatDate(createdTime) }}</span>
      </div>
    </div>
    <!-- 中层显示：标题、概述和描述 -->
    <div class="middle">
      <h2 class="title">
        {{ title }}
      </h2>
      <p class="summary">{{ summary }}</p>
      <p class="description">{{ description }}</p>
    </div>
    <!-- 下层显示：浏览量、喜欢和评论数 -->
    <div class="bottom">
      <div class="interaction-info">
        <i class="el-icon-view icon-style"></i>
        <el-icon><View /></el-icon>
        <span>{{ views }}</span>
        <i class="el-icon-pointer icon-style"></i>
        <el-icon><Pointer /></el-icon>
        <span>{{ likes }}</span>
        <i class="el-icon-comment icon-style"></i>
        <el-icon><Comment /></el-icon>
        <span>{{ comments }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.blog-card {
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: box-shadow 0.3s, transform 0.3s;
  cursor: pointer;
  overflow: hidden; /* 防止内容溢出 */
}

.blog-card:hover {
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transform: translateY(-2px); /* 轻微提升效果 */
}

.icon-style {
  margin-right: 4px;
}

.top {
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-bottom: 8px;
  color: #666;
}

.middle {
  margin-bottom: 12px;
}

.title {
  font-size: 22px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.summary {
  font-size: 16px;
  color: #555;
  margin-bottom: 4px;
}

.description {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}

.category-name {
  margin-left: 2px;
  margin-right: 16px;
}

.created-time {
  margin-left: 8px;
}

.bottom {
  display: flex;
  align-items: center;
}

.interaction-info {
  display: flex;
  align-items: center;
  font-size: 14px;
}

.interaction-info > i {
  margin-right: 6px;
}

.interaction-info > span {
  margin-right: 16px;
  color: #999;
}
</style>

