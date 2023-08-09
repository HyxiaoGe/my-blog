<script setup>
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import useNavToLogin from '../hooks/useNavToLogin'
import useTitle from '../hooks/useTitle'
import { useRoute } from 'vue-router'
import { getBlogById, createBlog, editBlog } from '../api/blogApi'
import { ElMessage } from 'element-plus'

useNavToLogin() //未登录时跳转到登录页

const $router = useRouter()

const $route = useRoute()

// 获取 url params id
const id = $route.params.id

// 定义 title ， 根据 id 判断 title
const title = id ? '编辑博客' : '新建博客'
useTitle(title)

// onMounted 时，根据 id 获取博客详情
const blogDetail = reactive({})
onMounted(async () => {
  if (id) {
    const res = await getBlogById(id)
    blogDetail.title = res.title
    blogDetail.content = res.content
    blogDetail.category = res.category
  }
})

const submit = async () => {
  if (!blogDetail.title) {
    return ElMessage.error('请输入标题')
  }
  if (!blogDetail.category) {
    return ElMessage.error('请选择类型')
  }
  if (!blogDetail.content) {
    return ElMessage.error('请输入内容')
  }

  const data = {
    title: blogDetail.title,
    category: blogDetail.category,
    content: blogDetail.content
  }

  if (id) {
    // 编辑博客
    await editBlog(id, data)
    ElMessage.success('编辑成功')
  } else {
    // 新建博客
    await createBlog(data)
    ElMessage.success('新建成功')
  }
  $router.push('/my-blogs')
}
</script>

<template>
  <div class="top-container">
    <div class="top-left">
      <h2>{{ title }}</h2>
    </div>
    <el-button class="top-right" type="primary" @click="submit">提交</el-button>
  </div>

  <div class="title-container">
    <div class="title-left">
      <span style="display: inline-block; width: 45px">标题</span>
      <el-input v-model="blogDetail.title" placeholder="请输入标题" style="width: 500px"></el-input>
    </div>
    <div class="title-right">
      <span style="display: inline-block; width: 45px">类型</span>
      <el-select v-model="blogDetail.category" placeholder="请选择类型">
        <el-option label="前端" value="前端"></el-option>
        <el-option label="Java" value="Java"></el-option>
        <el-option label="Python" value="Python"></el-option>
        <el-option label="小程序" value="小程序"></el-option>
      </el-select>
    </div>
  </div>

  <div class="content-container" style="padding: 10px">
    <el-input
      type="textarea"
      :rows="10"
      v-model="blogDetail.content"
      placeholder="请输入内容"
      style="width: 100%; height: 500px"
    ></el-input>
  </div>
</template>

<style scoped>
.top-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.top-left {
  flex: 1;
  font-size: 18px;
}

.top-right {
  margin-left: 10px;
}

.title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.title-left,
.title-right {
  display: flex;
  align-items: center;
}
</style>
