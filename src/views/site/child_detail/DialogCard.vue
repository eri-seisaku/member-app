<template>
  <v-col cols="6" md="4" v-for="(card, index) in cards" :key="index">
    <v-img
      class="mx-auto event-img"
      aspect-ratio="16/9"
      cover
      @click="openDialog(index)"
      :src="card.src"
    ></v-img>

    <Dialog v-model:dialog="card.dialog" :size="448">
      <template v-slot:content>
        <v-img
          class="mx-auto"
          aspect-ratio="16/9"
          cover
          :src="card.src"
        ></v-img>
        <h3 class="text-h5 my-5">{{ card.title }}</h3>
        <p>{{ card.content }}</p>
      </template>
    </Dialog>
  </v-col>
</template>

<script setup>
import { ref } from 'vue';

// components
import Dialog  from '@/components/Dialog.vue';

const cards = ref([
  {
    title: 'website01',
    src: '/src/assets/portfolio/website01.png',
    dialog: false,
    content: 'This is the content for website01.',
  },
  {
    title: 'website02',
    src: '/src/assets/portfolio/website02.png',
    dialog: false,
    content: 'This is the content for website02.',
  },
  {
    title: 'website03',
    src: '/src/assets/portfolio/website03.png',
    dialog: false,
    content: 'This is the content for website03.',
  },
  {
    title: 'website04',
    src: '/src/assets/portfolio/website04.png',
    dialog: false,
    content: 'This is the content for website04.',
  },
  {
    title: 'website05',
    src: '/src/assets/portfolio/website05.png',
    dialog: false,
    content: 'This is the content for website05.',
  },
  {
    title: 'website06',
    src: '/src/assets/portfolio/website06.png',
    dialog: false,
    content: 'This is the content for website06.',
  },
]);

const openDialog = (index) => {
  cards.value[index].dialog = true;
};

</script>

<style>
.event-img {
  cursor: pointer;
}
.event-img:hover {
  opacity: 0.5;
}
</style>
