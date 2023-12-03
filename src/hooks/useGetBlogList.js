import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { getBlogs } from '../api/blogApi'

function useGetBlogList() {
  // 获取路由对象
  const $route = useRoute()

  // 定义 list total
  const rows = ref([])
  const total = ref(0)
  const currentPage = ref(1)
  const pageSizeRef = ref(5)

  const getBlogListFn = async () => {
  
    currentPage.value = +$route.query.page || 1
    pageSizeRef.value = +$route.query.pageSize || 5

    const queryInfo = {
      page: +$route.query.page || 1,
      pageSize: +$route.query.pageSize || 5,
      category: $route.query.category || '',
      keyword: $route.query.keyword || ''
    }

    const { rows: blogList, total: blogTotal } = await getBlogs(queryInfo)
    rows.value = blogList
    total.value = blogTotal
  }

  // 使用 watchEffect 监听 url 参数 page pageSize category keyword 变化，并获取博客列表和总数
  watchEffect(getBlogListFn)

  return {
    rows,
    total,
    currentPage,
    pageSizeRef,
    getBlogListFn
  }
}

export default useGetBlogList
