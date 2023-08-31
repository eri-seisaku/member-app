<template>
  <v-app id="inspire">

    <v-navigation-drawer v-model="drawer">
      <!-- https://qiita.com/mml/items/16030c4404b4a814956b -->
      <v-list nav>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :prepend-icon="item.icon"
          :title="item.title"
          :to="item.to"
          :exact="true"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>Logo</v-app-bar-title>
    </v-app-bar>

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
import { ref } from 'vue'

const drawer = ref(false)


const menuItems = [
  {
    icon: 'mdi-home-city',
    title: 'Home',
    to: "/"
  },
  {
    icon: 'mdi-account',
    title: 'Check',
    to: '/check'
  },
  {
    icon: 'mdi-account-group-outline',
    title: 'Login',
    to: '/login'
  }
];

</script>