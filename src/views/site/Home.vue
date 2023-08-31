<template>
  <v-container class="fill-height" fluid>
    <v-row>
      <v-col>
        <h2 class="text-h4">
          トップページ
        </h2>
        <p class="mt-8">
          テキストテキストテキストテキストテキスト
          テキストテキストテキストテキストテキスト
          テキストテキストテキストテキストテキスト
          テキストテキストテキストテキストテキスト
          テキストテキストテキストテキストテキスト
        </p>
        <button @click="moveNextScreen">next</button>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// Vue Routerのテスト
import { useRouter } from 'vue-router';

const router = useRouter(); // ルーターインスタンスを取得
const moveNextScreen = () => {
  router.push('/check');
}
</script>
