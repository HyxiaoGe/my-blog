<template>
    <button v-if="visible" @click="scrollToTop" class="back-to-top">
      <i class="fa-solid fa-rocket"></i>
    </button>
  </template>  
  
  <script>
  export default {
    data() {
      return {
        visible: false
      };
    },
    methods: {
      scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      handleScroll() {
        this.visible = window.scrollY > 100; // 当页面向下滚动超过100px时显示按钮
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll);
    }
  };
  </script>
  

  <style scoped>
  .back-to-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    border: none;
    background-color: #4CAF50; /* 绿色背景 */
    color: white; /* 白色图标 */
    padding: 1rem; /* 大小适中的内边距 */
    border-radius: 50%; /* 圆形按钮 */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3); /* 阴影效果 */
    cursor: pointer; /* 鼠标指针变成手形 */
    transition: transform 0.3s, opacity 0.3s; /* 过渡效果 */
    opacity: 0.7; /* 默认半透明 */
    font-size: 1.5rem; /* 图标大小 */
  }
  
  .back-to-top:hover {
    transform: translateY(-0.5rem); /* 鼠标悬浮时向上移动 */
    opacity: 1; /* 鼠标悬浮时不透明 */
  }
  
  /* FontAwesome图标基础样式调整 */
  .fa-solid {
    transition: transform 0.3s; /* 平滑的变换效果 */
  }
  
  .back-to-top:hover .fa-solid {
    transform: rotate(-45deg); /* 鼠标悬浮时图标旋转 */
  }
  </style>
  