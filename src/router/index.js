import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth';
// import { auth } from '../firebase/config'


// 会員サイトルート
const siteRoutes = [
  {
    path: '/',
    component: () => import('@/layouts/site/Layout.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('@/views/site/Home.vue'),
      },
      {
        path: '/check',
        name: 'Check',
        component: () => import('@/views/site/Check.vue'),
      },
      {
        path: '/signup',
        name: 'SignUp',
        component: () => import('@/views/site/SignUp.vue'),
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/site/Login.vue'),
      },
    ],
  },
];

// 管理画面ルート
const adminRoutes = [
  {
    path: '/admin',
    component: () => import('@/layouts/admin/Layout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '/admin',
        name: 'Admin',
        component: () => import('@/views/admin/Admin.vue'),
      },
      {
        path: '/admin/profile/:userId',
        component: () => import('@/views/admin/Profile.vue'),
      },
      {
        path: '/admin/portfolio',
        component: () => import('@/views/admin/Portfolio.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: [...siteRoutes, ...adminRoutes],
});



// beforeEach ガードで認証状態を確認し、アクセス権を制御する
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 認証が必要なページにアクセスする際に認証が必要かどうかを判定
    if (authStore.isAuthenticated) {
      next(); // 認証済みなら遷移を続行
    } else {
      next('/login'); // 認証していなければログインページにリダイレクト
    }
  } else {
    next(); // その他のページは遷移を許可
  }
});

export default router;
