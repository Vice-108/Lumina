import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'SignUp',
      path: '/signup',
      component: () => import('@/views/SignUp.vue')
    },
    {
      name: 'SignIn',
      path: '/signin',
      component: () => import('@/views/SignIn.vue')
    },
  ],
})

export default router
