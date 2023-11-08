export const getMenu = (user, userRole) => {
  if (userRole === '管理者') {
    return [ // 管理者ナビメニュー
      {
        icon: 'mdi-view-dashboard',
        title: 'DASHBOARD',
        to: '/admin'
      },
      {
        icon: 'mdi-file-account',
        title: 'MEMBER',
        to: '/admin/administrator/member-list'
      },
      {
        icon: 'mdi-swap-horizontal-bold',
        title: 'EXIM',
        to: '/admin/administrator/export-import'
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
  } else if (userRole === '正会員') {
    return [ // 正会員ナビメニュー
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
        to: '/admin/portfolio-list'
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
      {
        to: '',
        icon: 'mdi-plus-box-outline',
        title: 'EMPTY'
      },
    ];
  }
};

