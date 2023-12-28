<script setup>
import { reactive, onMounted, toRef, toRaw, computed } from 'vue'
import { useRoute } from 'vue-router'
import MarkdownIt from 'markdown-it'
import anchor from 'markdown-it-anchor'
import hljs from 'highlight.js'
import 'highlight.js/styles/idea.css'
import { getBlogById, likeBlog, addBlogViews } from '../api/blogApi'
import useTitle from '../hooks/useTitle'
import { formatDate } from '../utils/date'
import { Pointer } from '@element-plus/icons-vue'
import CommentView from './sub-views/CommentView.vue'
import TableOfContents from '../components/TableOfContents.vue'

const md = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
          '</code></pre>'
        )
      } catch (__) {
        return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
      }
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
  }
}).use(anchor, {
  permalink: anchor.permalink.headerLink()
})

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
  blogInfo.views = res.views
  blogInfo.likes = res.likes
  blogInfo.isLiked = res.isLiked
  blogInfo.comments = res.comments
  blogInfo.createdTime = res.createdTime
  blogInfo.updatedTime = res.updatedTime
})

const contentForToc = computed(() => {
  // 确保 blogInfo.content 是一个字符串
  return typeof blogInfo.content === 'string' ? md.render(blogInfo.content) : ''
})

useTitle(toRef(blogInfo, 'title'))
// 点赞和取消点赞
const handleLike = async () => {
  await likeBlog(blogId)
  if (blogInfo.isLiked) {
    blogInfo.likes -= 1
    blogInfo.isLiked = false
  } else {
    blogInfo.likes += 1
    blogInfo.isLiked = true
  }
}
</script>

<template>
  <!-- 显示 title createdAt Content -->
  <div class="blog-detail-container">
    <h1>{{ blogInfo.title }}</h1>
    <div class="blog-detail-info">
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
    <CommentView :blogId="blogInfo.id" />
    <TableOfContents :content="contentForToc" />
  </div>
</template>

<style scoped>
.blog-detail-container {
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
  padding-right: 250px;
}

.blog-detail-info {
  margin-bottom: 20px;
}

.blog-detail-date {
  margin-left: 10px;
}

.blog-detail-content {
  max-width: calc(100% - 250px);
  margin-right: auto;
  line-height: 1.5;
}
</style>
