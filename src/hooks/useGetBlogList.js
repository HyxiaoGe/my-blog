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

  const getBlogListFn = async () => {
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
  }

  // 使用 watchEffect 监听 url 参数 page pageSize category keyword 变化，并获取博客列表和总数
  watchEffect(getBlogListFn)

  return {
    list,
    total,
    currentPage,
    pageSizeRef,
    getBlogListFn
  }
}

export default useGetBlogList
