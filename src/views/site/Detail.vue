<template>
  <v-container>
  <v-row>
    <v-col cols="12" md="4" v-for="card in cards" :key="card">
      <HoverImgCard
        :url="card.url"
        :src="card.src"
      />
    </v-col>
  </v-row>
</v-container>
</template>

<script setup>
import { ref } from 'vue';
// Components
import HoverImgCard  from '@/components/cards/HoverImgCard.vue';


const cards = [
  {
    url: '/',
    src: '/src/assets/portfolio/website01.png'
  },
  {
    url: '/',
    src: '/src/assets/portfolio/website01.png'
  },
  {
    url: '/',
    src: '/src/assets/portfolio/website01.png'
  },
];

</script>
