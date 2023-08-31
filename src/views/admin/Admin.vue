<template>
  <v-container class="fill-height" fluid>
    <v-row>
      <v-col>
        <h2 class="text-h4">
          ダッシュボード
        </h2>
        <p class="mt-8 mb-8">
          ここには何を表示するのか分かりません。<br>
          管理者の場合はここにお知らせ等が表示されます。
        </p>
        <button @click="moveNextScreen">next</button>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// Vue Router
import { useRouter } from 'vue-router';

const router = useRouter(); // ルーターインスタンスを取得
const moveNextScreen = () => {
  router.push('/check');
}
</script>
