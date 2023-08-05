<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const { userInfo, clearUserInfo } = useUserStore()

// 获取路由对象
const router = useRouter()

// 处理创建博客跳转
function handleCreateBlog() {
  router.push('/create-edit-blog')
}

// 处理我的博客跳转
function handleMyBlogs() {
  router.push('/my-blogs')
}

// 处理注销逻辑
function handleLogout() {
  // 这里可以添加注销逻辑，比如清除用户登录状态，跳转到登录页等
  clearUserInfo();
  localStorage.removeItem('token');
  router.push('/login');
  // test
}
</script>

<template>
  <div>
    <!-- <RouterLink to="/login">登录</RouterLink> -->
    <!-- 判断 userInfo.username, 如果有则显示 nickname，没有则显示登录链接 -->
    <div class="dropdown" v-if="userInfo.username">
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ userInfo.nickname || userInfo.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleCreateBlog">
                <el-icon><Edit /></el-icon>    
                创建博客
            </el-dropdown-item>
            <el-dropdown-item @click="handleMyBlogs">
                <el-icon><Files /></el-icon>    
                我的博客
            </el-dropdown-item>
            <el-dropdown-item @click="handleLogout">
                <el-icon><Close /></el-icon>  
                注销
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <!-- <RouterLink v-else to="/login">登录</RouterLink> -->
  </div>
</template>
