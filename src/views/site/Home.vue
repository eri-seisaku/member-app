<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2 class="text-h5">HOME</h2>
        <p class="mt-8">
          リストページの検索方法は下記をご確認ください。
          近畿エリアを選択しているのに都道府県は東京を条件にしたりすると永遠にユーザーが見つからないので地図の状態を見てください。クリックしたところ以外は少し薄くなっています。
        </p>
      </v-col>
      <v-col cols="6" md="4" v-for="item in items">
        <v-card>
          <v-img
            :src="`/src/assets/howto/${item.src}`"
            max-height="300"
            class="bg-grey-lighten-2"
          ></v-img>
          <v-card-title class="text-h6">
            {{ item.title }}
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, watch } from 'vue';
const items = [
  { title: '地図で探す', src: 'howto1.png' },
  { title: '検索フォームで探す', src: 'howto2.png' },
  { title: '地図と検索フォームで探す', src: 'howto3.png' },
];
</script>
