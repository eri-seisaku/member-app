<template>
  <Avatar
    :userName="userData.name"
    imageSrc="https://cdn.vuetifyjs.com/images/john.jpg"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { auth } from '@/firebase/firebase';
import { getData } from '@/firebase/firestore';

import Avatar from '@/components/Avatar.vue';

// ログイン中のユーザー情報を取得
const user = auth.currentUser;

const userData = ref({ name: '',
  email: '',
  phone: '',
  select: '',
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

onMounted(async () => {
  try {
    // Firestoreからユーザーの情報を取得し、userDataにセット
    const userDoc = await getData(user.uid, "members");
    userData.value = userDoc;
  } catch (error) {
    console.error('ユーザーデータ取得エラー', error);
  }
});
</script>
