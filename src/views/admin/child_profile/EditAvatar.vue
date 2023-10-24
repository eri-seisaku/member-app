<template>
  <v-row>
    <v-col cols="12">
      <Avatar
        imageSrc="https://cdn.vuetifyjs.com/images/john.jpg"
      />
    </v-col>
    <v-col cols="12">
      <v-btn
        size="large"
        variant="outlined"
        @click="imageDialog = true"
      >
        画像を変更
      </v-btn>
    </v-col>
  </v-row>
  <ImageDialog
    v-model:dialog="imageDialog"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue';
// 初期値
const imageDialog = ref(false);
const message = ref('');
const errorMessage = ref('');
const user = ref('');

// components
import Avatar from '@/components/Avatar.vue';
import ImageDialog from '@/views/admin/child_profile/ImageDialog.vue';

// firebase
import { getCurrentUser } from '@/firebase/auth';

onMounted(async () => {
  try {
    user.value = await getCurrentUser(); // user情報
  } catch (error) {
    errorMessage.value = error;
    console.error('ユーザーデータ取得エラー', error);
  }
});
</script>
