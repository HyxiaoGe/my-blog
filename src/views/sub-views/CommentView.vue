<script setup>
import { ref, defineProps, watch, toRef } from 'vue'
import { ElMessageBox } from 'element-plus'
import { getComments, createComment, deleteComment } from '@/api/commentApi'
import { formatDate } from '../../utils/date'

const props = defineProps({
  blogId: {
    type: Number,
    required: true
  }
})

// 使用 ref 创建一个响应式变量，用于存储已加载的博客ID
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

// 发表评论
const comment = ref('')
const handleCreateComment = async (blogId) => {
  if (!comment.value) return
  await createComment(blogId, comment.value)
  comment.value = ''
  // 发表成功后，情况输入框
  const res = await getComments(blogId)
  comments.value = res
}

// 删除评论
const handleDeleteComment = async (blogId, commentId) => {
  // confirm 确认是否删除
  const isDelete = await ElMessageBox.confirm('此操作将永久删除该评论, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  if (!isDelete) return
  await deleteComment(blogId, commentId)
  await getComments(blogId)
  comments.value = comments.value.filter((comment) => comment.id !== commentId)
}
</script>

<template>
  <!-- 发表评论。左右结构，一个输入框，一个按钮 -->
  <div class="comment-post">
    <el-input v-model="comment" type="textarea" :rows="3" placeholder="请输入评论内容"></el-input>
    <br /><br />
    <el-button type="primary" size="small" @click="handleCreateComment(blogId, comment)">
      发表评论
    </el-button>
  </div>

  <!-- 评论列表 -->
  <div class="comment-list">
    <div class="comment-item" v-for="comment in comments" :key="comment.id">
      <div class="comment-item-header">
        <div class="comment-item-header-left">
          <el-icon><User /></el-icon>
          &nbsp;&nbsp;
          <span class="username">{{ comment.userName }}</span>
          &nbsp;&nbsp;
          <span class="time">{{ formatDate(comment.createdTime) }}</span>
        </div>
      </div>
      <div class="comment-item-content">
        <div class="comment-item-content-text" v-html="comment.content"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.comment-post {
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 30px;
}
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
