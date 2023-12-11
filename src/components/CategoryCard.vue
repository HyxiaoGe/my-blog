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
        'linux': 'Linux',
        'cloud-native': '云原生',
        'mq': '消息队列',
        'es': 'Elasticsearch',
        'redis': 'Redis',
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
      <div class="category-list">
        <div class="category-item" v-for="(count, category) in categoriesCount" :key="category">
            <router-link :to="{ path: '/', query: { category: category }}">
                {{ formatCategoryName(category) }} <span class="count">({{ count }})</span>
            </router-link>
          </div>
      </div>
    </div>
  </template>
  
  <style scoped>
.category-card {
  border: 1px solid #f5f5f5;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.category-title {
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eaeaea;
  font-size: 18px;
  color: #333;
}

.category-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
}

.category-item {
  padding: 5px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: center;
}

.category-item a {
  text-decoration: none;
  color: #333;
}

/* 可以添加一个hover效果来提高交互性 */
.category-item:hover {
  background-color: #f8f8f8;
}
  </style>
  

  