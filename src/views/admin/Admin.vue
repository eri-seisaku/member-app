<template>
  <v-container class="fill-height" fluid>
    <v-row>
      <v-col>
        <p class="mt-8 mb-8">
          ここには何を表示するのか分かりません。<br>
          管理者の場合はここにお知らせ等が表示されます。
        </p>
        <!-- ---------------------------------------- -->
        <v-btn
          size="x-large"
          @click="showInput = true"
        >パスワード更新</v-btn>
        <div v-if="showInput">
          <v-text-field
            density="compact"
            variant="outlined"
          ></v-text-field>
          <v-btn @click="showInput = false">Close</v-btn>
        </div>
        <!-- ---------------------------------------- -->

      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import Title from '@/components/admin/Title.vue';

const showInput = ref(false);
</script>
