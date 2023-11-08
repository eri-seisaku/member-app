import {
  createRouter,
  createWebHistory,
  START_LOCATION // 遷移を判定するため
} from 'vue-router'

import { auth } from '@/firebase/firebase';
import { getCurrentUser } from '@/firebase/auth';
import { getOneLevelData } from '@/firebase/firestore';

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
        path: '/admin', // 管理者,正会員,組合員
        name: 'Admin',
        component: () => import('@/views/admin/Admin.vue'),
        meta: { title: 'DASHBOARD'}
      },
      {
        path: '/admin/profile/:userID', // 管理者,正会員,組合員
        component: () => import('@/views/admin/Profile.vue'),
        meta: { title: 'PROFILE'}
      },
      {
        path: '/admin/portfolio-list', // 管理者,正会員
        component: () => import('@/views/admin/PortfolioList.vue'),
        meta: { title: 'LIST'}
      },
      {
        path: '/admin/portfolio/:portfolioID', // 管理者,正会員
        component: () => import('@/views/admin/Edit.vue'),
        meta: { title: 'EDIT'}
      },
      {
        path: '/admin/post', // 管理者,正会員
        component: () => import('@/views/admin/Post.vue'),
        meta: { title: 'POST'}
      },
      {
        path: '/admin/administrator/export-import', // 管理者
        component: () => import('@/views/admin/administrator/ExportImport.vue'),
        meta: { title: 'EXPORT IMPORT'}
      },
      {
        path: '/admin/administrator/member-list', // 管理者
        component: () => import('@/views/admin/administrator/MemberList.vue'),
        meta: { title: 'LIST'}
      },
      {
        path: '/admin/administrator/approval', // 管理者
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
router.beforeEach(async (to, from, next) => {
  const user = await getCurrentUser(); // ログイン中のユーザーを取得
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth); // メタ情報から認証が必要かを取得

  if (requiresAuth && !user) {
    // 認証が必要なページに未ログインの場合、ログインページにリダイレクト
    next('/login');
  } else if (requiresAuth) {
    try {
      // ログイン済みのユーザーのFirestoreから権限情報を取得
      const userData = await getOneLevelData(user.uid, 'members');
      const userRole = userData.role;

      if (to.path.startsWith('/admin/administrator/') && userRole !== '管理者') {
        // 管理者向けのページにアクセス権がない場合、リダイレクトまたはエラーメッセージを表示
        next('/admin');
      } else if (userRole === '組合員') {
        // 組合員向けのページ制御
        const restrictedPages = ['/admin/portfolio-list', '/admin/portfolio', '/admin/post'];
        if (restrictedPages.includes(to.path)) {
          // 組合員に制限されたページにアクセス権がない場合、リダイレクトまたはエラーメッセージを表示
          next('/admin');
        } else {
          // ページへのアクセスを許可
          next();
        }
      } else {
        // ページへのアクセスを許可
        next();
      }
    } catch (error) {
      console.error('ユーザー情報の取得エラー', error);
      // エラーが発生した場合、リダイレクトまたはエラーメッセージを表示
      next('/error');
    }
  } else {
    // ページへのアクセスを許可
    next();
  }
});



// afterEach フックでタイトルを設定
router.afterEach((to) => {
  const title = to.meta.title || 'Default Title'; // デフォルトのタイトルを指定
  document.title = title;
});

export default router;



