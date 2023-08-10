import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/blog/:id',
      // component: BlogDetailView
      component: () => import('../views/BlogDetailView.vue')
    },
    {
      path: '/blog/:id/edit',
      // component: CreateEditBlogView
      component: () => import('../views/CreateEditBlogView.vue')
    },
    {
      path: '/blog/create',
      // component: CreateEditBlogView
      component: () => import('../views/CreateEditBlogView.vue')
    },
    {
      path: '/login',
      // component: LoginView
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      // component: RegisterView
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/my-blogs',
      // component: MyBlogsView
      component: () => import('../views/MyBlogsView.vue')
    }
  ]
})

export default router
