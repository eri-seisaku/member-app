<template>
  <v-app>

    <v-system-bar color="user">

      <v-btn variant="text">
        <v-icon icon="mdi-home"></v-icon>
        <span>会員サイト</span>
      </v-btn>

      <v-btn variant="text">
        <v-icon icon="mdi-comment"></v-icon>
        <span>0</span>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn variant="text">
        <v-icon icon="mdi-account"></v-icon>
        <!-- <span>{{ greeting }}</span> -->

        <v-menu activator="parent">
          <v-list bg-color="user">
            <v-list-item
              v-for="userMenu in userMenus"
              :key="userMenu.title"
              :title="userMenu.title"
              :to="userMenu.to"
              :exact="true"
            ></v-list-item>
          </v-list>
        </v-menu>
      </v-btn>
    </v-system-bar>

    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      color="user"
      @click="rail = false"
    >
    <v-list-item
      prepend-avatar="../../assets/icon/user_icon.png"
      nav
    >
    <!-- <v-list-item
      prepend-avatar="../../assets/icon/user_icon.png"
      :title="authStore.userProfile.email"
      nav
    > -->
      <template v-slot:append>
        <v-btn
          variant="text"
          icon="mdi-chevron-left"
          @click.stop="rail = !rail"
        ></v-btn>
      </template>
    </v-list-item>

    <v-divider class="border-opacity-50" color="white"></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        v-for="(menu, index) in navMenus"
        :key="menu.title"
        :prepend-icon="menu.icon"
        :title="menu.title"
        :to="menu.to"
        :exact="true"
        @click="handleMenuItemClick(menu, index)"
      ></v-list-item>

    </v-list>

    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>

    <v-footer app color="white">
      <v-col cols="12">
        <span>© 2023</span>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script setup>
// store
import { useAuthStore } from '@/store/auth';
const authStore = useAuthStore();

import { ref, computed } from 'vue';
const drawer = ref(true);
const rail = ref(true);

const navMenus = [
  {
    icon: 'mdi-view-dashboard',
    title: 'ダッシュボード',
    to: "/admin"
  },
  {
    icon: 'mdi-account-cog',
    title: 'プロフィール',
    // to: `/admin/profile/${authStore.userProfile.id}`
    to: 'admin/profile'
  },
  {
    icon: 'mdi-file-account',
    title: 'ポートフォリオ申請',
    to: '/admin/portfolio'
  },
];

const userMenus = [
  {
    title: 'プロフィール編集',
    // to: `/admin/profile/${authStore.userProfile.id}`
    to: 'admin/profile'
  },
  {
    title: 'ログアウト',
    to: '/'
  },
];

// ログインユーザーの挨拶
// const greeting = computed(() => {
//   return `こんにちは、${authStore.userProfile.email} さん`;
// });

</script>
