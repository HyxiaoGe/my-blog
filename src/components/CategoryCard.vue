<script>
import { getBlogCategory } from '@/api/blogApi'

export default {
  data() {
    return {
      categoriesCount: {},
    };
  },
//  从后端获取类目统计数据
  methods: {
    async fetchCategoriesCount() {
      try {
        const response = await getBlogCategory();
        // 直接使用从后端接收的对象
        this.categoriesCount = response;
      } catch (error) {
        console.error('Error fetching category counts:', error);
      }
    },
    formatCategoryName(categoryName) {
      // 特定类别名称的简单映射
      const nameMap = {
        'frontend': '前端',
        'java': 'Java',
        'mysql': 'MySQL',
        'computer-network': '计算机网络',
      };
      return nameMap[categoryName] || categoryName;
    },
  },
  mounted() {
    this.fetchCategoriesCount();
  },
};
</script>

<template>
    <div class="category-card">
      <h2 class="category-title">类目统计</h2>
      <ul class="category-list">
        <li class="category-item" v-for="(count, category) in categoriesCount" :key="category">
            <router-link :to="{ path: '/', query: { category: category }}">
                {{ formatCategoryName(category) }} ({{ count }} )
            </router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <style scoped>
  .category-card {
    border: 1px solid #f5f5f5;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 添加轻微阴影 */
    border-radius: 8px; /* 添加边框圆角 */
    transition: box-shadow 0.3s ease, transform 0.3s ease; /* 添加阴影和浮动效果的过渡 */
  }
  
  .category-card:hover {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); /* 加强阴影效果 */
    transform: translateY(-2px); /* 轻微向上移动表示浮动效果 */
    background-color: #fafafa; /* 鼠标悬停时的背景色 */
  }
  
  .category-title {
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eaeaea;
    font-size: 18px; /* 增大标题字体大小 */
    color: #333; /* 标题字体颜色 */
  }
  
  .category-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .category-item {
    padding: 10px 0;
    border-bottom: 1px solid #eee;
    transition: background-color 0.3s ease; /* 添加背景色变化的过渡效果 */
  }
  
  .category-item:last-child {
    border-bottom: none;
  }
  
  .category-item a {
  display: block; /* 使<a>标签的背景色宽度与<li>标签相同 */
  padding: 10px; /* 添加padding使得背景色填充整个区域 */
  text-decoration: none; /* 去掉链接下划线 */
  color: #333; /* 将链接字体颜色调整为黑色 */
  background-color: #fff; /* 设置默认背景色为白色 */
  transition: color 0.3s ease, background-color 0.3s ease; /* 添加颜色和背景色变化的过渡效果 */
  border-radius: 4px; /* 如果需要，添加圆角效果 */
}
  
.category-item a:hover {
  background-color: #f0f0f0; /* 鼠标悬停时的背景色，为了提高交互性 */
}
  </style>
  

  