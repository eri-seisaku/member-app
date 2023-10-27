export const getMenu = (user, userRole) => {
  if (userRole === '管理者') {
    return [ // 管理者ナビメニュー
      {
        icon: 'mdi-view-dashboard',
        title: 'DASHBOARD',
        to: '/admin/administrator/'
      },
      {
        icon: 'mdi-import',
        title: 'IMPORT',
        to: '/admin/administrator/import'
      },
      {
        icon: 'mdi-file-account',
        title: 'USER LIST',
        to: '/admin/administrator/list'
      },
      {
        icon: 'mdi-check-decagram-outline',
        title: 'APPROVAL',
        to: '/admin/administrator/approval'
      },
      {
        to: '',
        icon: 'mdi-plus-box-outline',
        title: 'EMPTY'
      },
      {
        to: '',
        icon: 'mdi-plus-box-outline',
        title: 'EMPTY'
      },
    ];
  } else {
    return [ // 組合員ナビメニュー
      {
        icon: 'mdi-view-dashboard',
        title: 'DASHBOARD',
        to: "/admin"
      },
      {
        icon: 'mdi-account-cog',
        title: 'PROFILE',
        to: `/admin/profile/${user.uid}`
      },
      {
        icon: 'mdi-file-account',
        title: 'PORTFOLIO',
        to: '/admin/list' // postから変更
      },
      {
        to: '',
        icon: 'mdi-plus-box-outline',
        title: 'EMPTY'
      },
      {
        to: '',
        icon: 'mdi-plus-box-outline',
        title: 'EMPTY'
      },
      {
        to: '',
        icon: 'mdi-plus-box-outline',
        title: 'EMPTY'
      },
    ];
  }
};

