<script setup>
import { ref, defineProps, watch, toRef } from 'vue'
import { getComments, deleteComment } from '@/api/commentApi'
import { formatDate } from '../../utils/date'
import { useUserStore } from '@/stores/user'

const props = defineProps({
  blogId: {
    type: Number,
    required: true
  }
})
// 使用 ref 创建一个响应式变量，用于存储已加载的博客ID

const { userInfo } = useUserStore()

const loadedBlogId = ref(null)

// 获取评论列表
const comments = ref([])

  watch(toRef(props, 'blogId'), async (newBlogId) => {
    if (loadedBlogId.value === null) {
      console.log('博客ID 变化（加载后）：', newBlogId)
      const res = await getComments(newBlogId)
      comments.value = res
    }
  })

// 删除评论
const handleDeleteComment = async (blogId, commentId) => {
  await deleteComment(blogId, commentId)
  await getComments(blogId)
  comments.value = comments.value.filter((comment) => comment.id !== commentId)
}
</script>

<template>
  <!-- 评论列表 -->
  <div class="comment-list">
    <div class="comment-item" v-for="comment in comments" :key="comment.id">
      <div class="comment-item-header">
        <div class="comment-item-header-left">
          <el-icon><User /></el-icon>
          &nbsp;
          <span class="nickname">{{ comment.authorNickname }}</span>
          &nbsp;-&nbsp;
          <span class="username">{{ comment.authorUsername }}</span>
          &nbsp;&nbsp;
          <span class="time">{{ formatDate(comment.createdAt) }}</span>
        </div>
        <div class="comment-item-header-right">
          <!-- 如果 comment.authorNickname 等于 userInfo.username ，则显示一个删除按钮 -->
          <el-button
            v-if="comment.authorUsername === userInfo.username"
            type="text"
            size="small"
            icon="el-icon-delete"
            @click="handleDeleteComment(blogId, comment.id)"
            >删除</el-button
          >
        </div>
      </div>
      <div class="comment-item-content">
        <div class="comment-item-content-text" v-html="comment.content"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.comment-list {
  margin-top: 20px;
}
.comment-item {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 5px;
}

.comment-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.comment-item-header-left {
  display: flex;
  align-items: center;
}

.comment-item-header-right {
  display: flex;
  align-items: center;
}

.comment-item-content-text {
  margin-top: 10px;
  line-height: 1.5;
}

.comment-item-content-text p {
  margin: 0;
}

.comment-item-content-text p + p {
  margin-top: 10px;
}
</style>
