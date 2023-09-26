<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" color="user">
      <v-sheet
        color="user"
        class="pa-4"
      >
        <v-avatar
          class="mb-4"
          color="grey-darken-1"
          size="64"
        ></v-avatar>

        <div>{{ user.email }}</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="menu in navMenus"
          :key="menu.title"
          :prepend-icon="menu.icon"
          :title="menu.title"
          :to="menu.to"
          :exact="true"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      flat
      hide-on-scroll
      color="background"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>
        <h2 class="text-h5">{{ title }}</h2>
      </v-app-bar-title>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-footer app absolute color="background">
      <v-col cols="12">
        <span>© 2023</span>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

// routerのインスタンスを作成
const route = useRoute();

// ページのタイトルを取得
const title = computed(() => {
  return route.meta.title || 'Default Title';
});

const drawer = ref(null)
// firebase
import { auth } from '@/firebase/firebase';
const user = auth.currentUser;

const navMenus = [
  {
    icon: 'mdi-view-dashboard',
    title: 'ダッシュボード',
    to: "/admin"
  },
  {
    icon: 'mdi-account-cog',
    title: 'プロフィール',
    to: `/admin/profile/${user.uid}`
  },
  {
    icon: 'mdi-file-account',
    title: 'ポートフォリオ申請',
    to: '/admin/post'
  },
];
</script>

