<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavMenu from './components/NavMenu.vue';
import SearchInput from './components/SearchInput.vue';
import UserInfo from './components/UserInfo.vue';
// import { getUserInfo } from './api/userApi';
// import { useUserStore } from './stores/user';

// const { setUserInfo } = useUserStore();

// 获取用户信息
// getUserInfo().then(res => {
//   setUserInfo(res);
// });
</script>

<template>
  <header>

  </header>
  <div class="main-layout">
    <!-- 顶部导航栏 -->
    <div class="top-navbar">
      <div class="left-section">
        <div class="logo">
          <RouterLink to="/"><h1>HyxiaoBlog</h1></RouterLink>
        </div>
        <NavMenu class="nav-menu"/>
        <SearchInput />
      </div>
      <!-- <div class="right-section">
        <UserInfo />
      </div> -->
    </div>

  </div>
  <RouterView />
</template>

<style scoped>
.main-layout {
  width: 100%;
}

.top-navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: #f5f5f5;
  padding: 0 20px;
  border-bottom: solid 1px var(--el-menu-border-color);
}

.left-section {
  display: flex;
  align-items: center;
}

.logo {
  height: 40px;
}
.logo a {
  text-decoration: none;
}

.nav-menu {
  border-bottom: none;
  margin-left: 20px;
}

.right-section {
  display: flex;
  align-items: center;
}

.login-link {
  color: #1b1919;
  text-decoration: none;
}

.main-content {
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #f5f5f5;
}

.container {
  width: 1000px;
}
</style>
