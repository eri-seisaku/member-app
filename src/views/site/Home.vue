<template>
  <v-container>
    <!-- エラーメッセージを表示する要素 -->
    <v-alert
      border="start"
      variant="tonal"
      color="red-accent-4"
      v-if="errorMessage"
    >
      {{ errorMessage }}
    </v-alert>

    <!-- アップロードボタン -->
    <v-btn
      class="ma-2"
      @click="uploadDialog = true"
    >
      <v-icon start icon="mdi-upload"></v-icon>
      Upload
    </v-btn>

    <!-- アップロードコンポーネント -->
    <Upload
      v-model:errorMessage="errorMessage"
      v-model:dialog="uploadDialog"
      @update:filesUploaded="handleFilesUploaded"
    />
  </v-container>
</template>

<script setup>
import Upload from '../../components/Upload.vue';
import { ref } from 'vue'

// 初期化
const uploadDialog = ref(false);
const errorMessage = ref('');

// ファイルがアップロードされた時のハンドラ
const handleFilesUploaded = (files) => {
  console.log('Received uploaded files:', files);
};


// デバック
// import { watch } from 'vue';
// watch(uploadDialog, (newVal) => {
//   console.log('uploadDialogの値が変更されました:', newVal);
// });

// watch(errorMessage, (newVal) => {
//   console.log('errorMessageの値が変更されました:', newVal);
// });

</script>
