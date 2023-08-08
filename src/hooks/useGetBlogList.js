import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { getBlogs } from '../api/blogApi'

function useGetBlogList(opt = {}) {
  const { my } = opt
  // 获取路由对象
  const $route = useRoute()

  // 定义 list total
  const list = ref([])
  const total = ref(0)
  const currentPage = ref(1)
  const pageSizeRef = ref(10)

  // 使用 watchEffect 监听 url 参数 page pageSize category keyword 变化，并获取博客列表和总数
  watchEffect(async () => {
    currentPage.value = +$route.query.page || 1
    pageSizeRef.value = +$route.query.pageSize || 10

    const queryInfo = {
      page: +$route.query.page || 1,
      pageSize: +$route.query.pageSize || 10,
      category: $route.query.category || '',
      keyword: $route.query.keyword || '',
      my
    }

    const { list: blogList, total: blogTotal } = await getBlogs(queryInfo)
    list.value = blogList
    total.value = blogTotal

    // const query = $route.query
    // currentPage.value = parseInt(query.page) || 1
    // const page = parseInt(query.page) || 1
    // pageSizeRef.value = parseInt(query.pageSize) || 10

    // const pageSize = parseInt(query.pageSize) || 10
    // const category = query.category
    // const keyword = query.keyword
    // const res = await getBlogs(page, pageSize, category, keyword, my)
    // list.value = res.list
    // total.value = res.total
  })

  return {
    list,
    total,
    currentPage,
    pageSizeRef
  }
}

export default useGetBlogList
