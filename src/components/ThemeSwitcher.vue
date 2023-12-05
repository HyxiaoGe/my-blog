<template>
    <button @click="toggleTheme" class="theme-switcher">
      <!-- 使用图标库或者文字来表示当前模式 -->
      <span v-if="isDarkTheme">🌞 白天模式</span>
      <span v-else>🌜 夜间模式</span>
    </button>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isDarkTheme: false,
      };
    },
    methods: {
      toggleTheme() {
        this.isDarkTheme = !this.isDarkTheme;
        console.log(this.isDarkTheme);
        this.applyTheme();
      },
      applyTheme() {
        if(this.isDarkTheme) {
            document.documentElement.classList.add('dark-theme');
        } else {
            document.documentElement.classList.remove('dark-theme');
        }
        localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
      },
    },
    mounted() {
        this.isDarkTheme = localStorage.getItem('theme') === 'dark';
        if (this.isDarkTheme) {
            document.documentElement.classList.add('dark-theme');
        } else {
            document.documentElement.classList.remove('dark-theme');
        }
    }

  };
  </script>
  
  <style>
  .theme-switcher {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    background-color: #fff;
    border: none;
    padding: 10px 15px;
    border-radius: 20px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .theme-switcher:hover {
    transform: scale(1.05);
  }
  
  .dark-theme {
    background-color: #121212; /* 夜间模式背景色 */
    color: #ffffff; /* 夜间模式文字颜色 */
  }
  
  /* 可以在这里或者其他全局样式文件中添加其他元素的暗主题样式 */
  </style>
  