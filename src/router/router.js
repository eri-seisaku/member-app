import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../firebase/firebase';


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
      // {
      //   path: '/login',
      //   name: 'Login',
      //   component: () => import('@/views/site/Login.vue'),
      // },
      {
        path: '/list',
        name: 'List',
        component: () => import('@/views/site/List.vue'),
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
        meta: { title: 'DASHBOARD'}
      },
      {
        // path: '/admin/profile',
        path: '/admin/profile/:userId',
        component: () => import('@/views/admin/Profile.vue'),
        meta: { title: 'PROFILE'}
      },
      {
        path: '/admin/portfolio',
        component: () => import('@/views/admin/PortfolioRequest.vue'),
        meta: { title: 'PORTFOLIO'}
      },
    ],
  },
];

// シンプルレイアウトルート
const loginRoutes = [
  {
    path: '/login',
    component: () => import('@/layouts/loginLayout.vue'),
    children: [
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/Login.vue'),
        meta: { title: 'LOGIN'}
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: [...siteRoutes, ...adminRoutes, ...loginRoutes],
});


// beforeEach ガードで認証状態を確認し、アクセス権を制御する
router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.requiresAuth)) {
    const user = auth.currentUser;

    if (user) { // セッションを見に行く
      next(); // 認証済みなら遷移を続行
    } else {
      next('/login'); // 認証していなければログインページにリダイレクト
    }
  } else {
    next(); // その他のページは遷移を許可
  }
});


// afterEach フックでタイトルを設定
router.afterEach((to) => {
  const title = to.meta.title || 'Default Title'; // デフォルトのタイトルを指定
  document.title = title;
});

export default router;


