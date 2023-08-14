<script setup>
import { reactive, onMounted, toRef, toRaw } from 'vue'
import { useRoute } from 'vue-router'
import MarkdownIt from 'markdown-it'
import { getBlogById, likeBlog, unlikeBlog, addBlogViews } from '../api/blogApi'
import useTitle from '../hooks/useTitle'
import { formatDate } from '../utils/date'
import { Pointer} from '@element-plus/icons-vue'
import CommentView from './sub-views/CommentView.vue'

const md = new MarkdownIt()

const $route = useRoute()

const blogInfo = reactive({})

// 获取博客内容
const blogId = $route.params.id || ''
// onMounted 获取博客详情
onMounted(async () => {
  const res = await getBlogById(blogId)
  await addBlogViews(blogId)
  blogInfo.id = res.id
  blogInfo.title = res.title
  blogInfo.content = res.content
  blogInfo.category = res.category
  blogInfo.author = res.author
  blogInfo.views = res.views
  blogInfo.likes = res.likes
  blogInfo.isLiked = res.isLiked
  blogInfo.comments = res.comments
  blogInfo.createdTime = res.createdTime
  blogInfo.updatedTime = res.updatedTime
})

useTitle(toRef(blogInfo, 'title'))
// 点赞和取消点赞
const handleLike = async () => {
  if (blogInfo.isLiked) {
    await unlikeBlog(blogId)
    blogInfo.likes -= 1
    blogInfo.isLiked = false
  } else {
    await likeBlog(blogId)
    blogInfo.likes += 1
    blogInfo.isLiked = true
  }
}
</script>

<template>
  <!-- 显示 title author createdAt Content -->
  <div class="blog-detail-container">
    <h1>{{ blogInfo.title }}</h1>
    <div class="blog-detail-info">
      <span class="blog-detail-author">{{ blogInfo.author }}</span>
      <span class="blog-detail-date">{{ formatDate(blogInfo.createdTime) }}</span>
      <span class="blog-detail-date">{{ blogInfo.views }} views</span>
    </div>

    <div
      v-if="blogInfo.content"
      class="blog-detail-content"
      v-html="md.render(toRaw(blogInfo.content)) || ''"
    ></div>

    <!-- 生成一个div， 用于点赞 水平居中显示 -->
    <div style="text-align: center; margin-top: 20px">
      <el-button
        :type="blogInfo.isLiked ? 'primary' : 'default'"
        :icon="Pointer"
        size="large"
        round
        @click="handleLike"
        >{{ blogInfo.likes }}</el-button
      >
    </div>
    <CommentView :blogId = blogInfo.id />
  </div>
</template>

<style scoped>
.blog-detail-container {
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.blog-detail-info {
  margin-bottom: 20px;
}

.blog-detail-author {
  margin-right: 10px;
}

.blog-detail-date {
  margin-left: 10px;
}

.blog-detail-content {
  line-height: 1.5;
}
</style>
