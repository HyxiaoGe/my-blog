<script setup>
import { ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// 获取路由实例
const route = useRoute();
const router = useRouter();

// 定义 activeMenu 的 ref
const activeMenu = ref('');

// 监听路由变化，根据 category 参数实时更新 activeMenu
watchEffect(() => {
  const category = route.query.category;
  activeMenu.value = category ? category : '';
});

// 处理菜单点击事件，跳转到首页并加上 category 参数
function handleMenuClick(category) {
  const query = category ? { category } : {};
  router.push({ path: '/', query });
}
</script>

<template>
    <el-menu :default-active="activeMenu" class="menu" mode="horizontal">
      <!-- <el-menu-item index="frontend" @click="handleMenuClick('frontend')">前端</el-menu-item> -->
      <el-menu-item index="java" @click="handleMenuClick('java')">Java</el-menu-item>
      <el-menu-item index="mysql" @click="handleMenuClick('mysql')">MySQL</el-menu-item>
      <el-menu-item index="computer-network" @click="handleMenuClick('computer-network')">计算机网络</el-menu-item>
      <el-menu-item index="linux" @click="handleMenuClick('linux')">Linux</el-menu-item>
      <el-menu-item index="cloud-native" @click="handleMenuClick('cloud-native')">云原生</el-menu-item>
      <el-menu-item index="mq" @click="handleMenuClick('mq')">消息队列</el-menu-item>
      <el-menu-item index="es" @click="handleMenuClick('es')">Elasticsearch</el-menu-item>
      <el-menu-item index="redis" @click="handleMenuClick('redis')">Redis</el-menu-item>
      <el-menu-item index="cloud-service" @click="handleMenuClick('cloud-service')">云服务</el-menu-item>
    </el-menu>
  </template>
  
  <style>
  .menu {
    background-color: #f5f5f5;
  }
  </style>
  