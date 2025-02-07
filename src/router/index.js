import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'AppLayout',
			component: () => import('../views/AppLayout.vue'),
		},
	],
})

export default router
