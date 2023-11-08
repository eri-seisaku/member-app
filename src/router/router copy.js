import {
  createRouter,
  createWebHistory,
  START_LOCATION // 遷移を判定するため
} from 'vue-router'
import { auth } from '@/firebase/firebase';


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
        meta: { title: 'HOME'}
      },
      {
        path: '/check',
        name: 'Check',
        component: () => import('@/views/site/Check.vue'),
        meta: { title: 'CHECK'}
      },
      {
        path: '/signup',
        name: 'SignUp',
        component: () => import('@/views/site/SignUp.vue'),
        meta: { title: 'SIGNUP'},
        beforeEnter: (to, from) => {
          if (from === START_LOCATION) {
            return '/check'
          }
        },
      },
      {
        path: '/list',
        name: 'List',
        component: () => import('@/views/site/List.vue'),
        meta: { title: 'LIST'}
      },
      {
        path: '/members/:userID',
        name: 'Detail',
        component: () => import('@/views/site/Detail.vue'),
        meta: { title: 'DETAIL'}
      },
      {
        path: '/sample',
        name: 'Sample',
        component: () => import('@/views/site/Sample.vue'),
        meta: { title: 'SAMPLE'}
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
        path: '/admin/profile/:userID',
        component: () => import('@/views/admin/Profile.vue'),
        meta: { title: 'PROFILE'}
      },
      {
        path: '/admin/list',
        component: () => import('@/views/admin/List.vue'),
        meta: { title: 'LIST'}
      },
      {
        path: '/admin/portfolio/:portfolioID',
        component: () => import('@/views/admin/Edit.vue'),
        meta: { title: 'EDIT'}
      },
      {
        path: '/admin/post',
        component: () => import('@/views/admin/Post.vue'),
        meta: { title: 'POST'}
      },
      {
        path: '/admin/test',
        component: () => import('@/views/admin/Test.vue'),
        meta: { title: 'TEST'}
      },
      { // 管理者用
        path: '/admin/administrator/',
        component: () => import('@/views/admin/administrator/Admin.vue'),
        meta: { title: 'DASHBOARD'}
      },
      { // 管理者用
        path: '/admin/administrator/export-import',
        component: () => import('@/views/admin/administrator/ExportImport.vue'),
        meta: { title: 'EXPORT IMPORT'}
      },
      { // 管理者用
        path: '/admin/administrator/list',
        component: () => import('@/views/admin/administrator/List.vue'),
        meta: { title: 'LIST'}
      },
      { // 管理者用
        path: '/admin/administrator/approval',
        component: () => import('@/views/admin/administrator/Approval.vue'),
        meta: { title: 'APPROVAL'}
      },
    ],
  },
];

// シンプルレイアウトルート
const loginRoutes = [
  {
    path: '/login',
    component: () => import('@/layouts/LoginLayout.vue'),
    children: [
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/Login.vue'),
        meta: { title: 'LOGIN'}
      },
      {
        path: '/password_request',
        name: 'Reissue',
        component: () => import('@/views/login/Reissue.vue'),
        meta: { title: 'Reissue'}
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



