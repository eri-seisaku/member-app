<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :color="color"
    >
      <!-- LOGO -->
      <v-sheet
        :color="color"
        class="pa-4"
        :height="64"
      >
        <v-img
          class="mx-auto"
          sizes="128"
          src="@/assets/logo-vuetify-white.svg"
        ></v-img>
      </v-sheet>

      <v-divider></v-divider>

      <!-- USER -->
      <v-sheet
        :color="color"
        class="pa-4 text-center"
      >
        <v-avatar
          class="mb-4"
          color="white"
          size="64"
        ></v-avatar>

        <div>{{ user.email }}</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item
          v-for="menu in navMenus"
          :key="menu.title"
          :prepend-icon="menu.icon"
          :title="menu.title"
          :to="menu.to"
          :exact="true"
        ></v-list-item>
      </v-list>

      <!-- LOG OUT BUTTON -->
      <template v-slot:append>
        <div class="pa-2">
          <v-btn
            block
            @click="logoutUser"
          >
            Logout
          </v-btn>
        </div>
      </template>
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
// 初期値
import { ref, computed, onMounted } from "vue";
const drawer = ref(null);
const color = ref('');
const navMenus = ref([]);

// router
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
// ページのタイトルを取得
const title = computed(() => {
  return route.meta.title || 'Default Title';
});

// firebase
import { auth } from '@/firebase/firebase';
const user = auth.currentUser;
import { logout } from '@/firebase/auth';
import { getData } from '@/firebase/firestore';

// menu
import { getMenu } from '@/router/menu';

// メニュー取得
onMounted(async () => {
  try {
    const userDoc = await getData(user.uid, "members");
    const menu = getMenu(user, userDoc.role);

    if (userDoc.role === '管理者') {
      color.value = 'administrator';
    } else {
      color.value = 'member';
    }
    navMenus.value = menu;
  } catch (error) {
    console.error('ユーザーデータ取得エラー', error);
  }
});

// ログアウト処理
const logoutUser = () => {
  logout();
  router.push('/');
}
</script>

