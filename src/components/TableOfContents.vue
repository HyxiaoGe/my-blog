<script setup>
import { defineProps, watch, ref } from 'vue'

const props = defineProps({
  content: String
})

const headings = ref([])

// 监听content变化来更新目录
watch(
  () => props.content,
  (newContent) => {
    if (newContent) {
      console.log('Received content:', newContent)
      const matches = [...newContent.matchAll(/<h([1-6]) id="([^"]+)"[^>]*>(.*?)<\/h\1>/g)]
      console.log('Extracted headings:', matches)
      headings.value = matches.map((match) => {
        // 移除 <a> 标签及其内容，只保留标题文本。
        const textContent = match[3]
          .replace(/<a[^>]*>(.*?)<\/a>/g, '$1')
          .replace(/<strong>(.*?)<\/strong>/g, '$1')
          .trim()
        return {
          id: match[2], // 使用已有的 id
          text: textContent, // 使用处理过的文本
          level: match[1]
        }
      })
    }
  },
  {
    immediate: true //  立即执行一次
  }
)
</script>

<template>
  <div class="toc-card" v-if="headings.length > 0">
    <h2 class="toc-title">目录</h2>
    <nav class="toc-list">
      <ul>
        <li v-for="heading in headings" :key="heading.id" :class="'level-' + heading.level">
          <a :href="'#' + heading.id">{{ heading.text }}</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.toc-card {
  position: fixed;
  top: 100px;
  right: 20px;
  width: 400px;
  border: 1px solid #eaeaea;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background: #fff;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  z-index: 1000;
  overflow: hidden;
  max-height: 70vh;
  overflow-y: auto;
}

.toc-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
}

.toc-title {
  font-size: 1em;
  text-align: center;
  margin: 0;
  padding: 0.8em;
  background-color: #f5f5f5;
  color: #333;
  border-bottom: 1px solid #eaeaea;
}

.toc-list ul {
  list-style: none;
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.toc-list li {
  padding: 0.5em;
  border-bottom: 1px solid #eee;
  padding: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.toc-list li a {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: none;
  color: #333;
  display: block;
  transition: background-color 0.3s ease;
  transition:
    color 0.3s,
    background-color 0.3s;
}

.toc-list li a:hover {
  background-color: #f5f5f5;
}

.level-1 a {
  padding-left: 1em;
}

.level-2 a {
  padding-left: 2em;
}

.level-3 a {
  padding-left: 3em;
}

.level-4 a {
  padding-left: 4em;
}

.level-5 a {
  padding-left: 5em;
}

.level-6 a {
  padding-left: 6em;
}
</style>
