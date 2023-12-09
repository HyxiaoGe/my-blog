<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavMenu from './components/NavMenu.vue';
import SearchInput from './components/SearchInput.vue';
import BackToTopButton from './components/BackToTopButton.vue';
import ThemeSwitcher from './components/ThemeSwitcher.vue';

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
        <BackToTopButton />
      </div>
      <!-- <div class="right-section">
        <ThemeSwitcher />
      </div> -->
    </div>
  </div>
  <RouterView />

    <!-- 底部备案信息 -->
    <footer class="footer">
      <span>备案号：</span><a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" class="footer-link">琼ICP备2023004973号</a>
      <p>Copyright © 2023 hyxiaoblog.com. All Rights Reserved.</p>
    </footer>

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

.footer {
  background-color: #f0f0f0;
  text-align: center;
  padding: 20px;
}

.footer-link {
  text-decoration: none; /* 去掉下划线 */
  color: #333; /* 设置链接颜色 */
  margin: 5px; /* 调整链接之间的间距 */
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

.dark-theme {
  background-color: #121212;
  color: #ffffff;
}
</style>
