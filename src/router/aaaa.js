router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser; // Firebase Authの認証情報を取得

  if (requiresAuth && !isAuthenticated) {
    next('/login'); // ログインが必要なのにログインしていない場合、ログインページにリダイレクト
  } else {
    next(); // 問題ない場合は通常通り進む
  }
});
