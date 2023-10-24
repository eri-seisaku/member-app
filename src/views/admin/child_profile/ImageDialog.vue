<template>
  <Dialog v-model:dialog="dialog" :size="450">
    <template v-slot:content>
      <v-row>
        <v-col cols="12">
          <p class="text-subtitle-1 text-medium-emphasis">画像をアップロードしてください。</p>
        </v-col>
        <v-col cols="12" v-if="message || errorMessage">
          <Alert
            :color="message ? 'primary' : 'red'"
            :text="message ? message : errorMessage"
          />
        </v-col>
        <v-col cols="12">
        </v-col>
      </v-row>
    </template>
  </Dialog>
</template>

<script setup>
import { ref } from 'vue';
// 初期値設定
const dialog = ref(false);

const message = ref('');
const errorMessage = ref('');

// components
import Dialog from '@/components/Dialog.vue';
import Alert from '@/components/Alert.vue';

</script>
