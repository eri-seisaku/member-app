<template>
  <form @submit.prevent="submit">
    <!-- title -->
    <v-text-field
      v-model="title"
      label="TITLE"
      required
      variant="outlined"
    ></v-text-field>
    <!-- web site -->
    <v-text-field
      v-model="website"
      label="WEB SITE"
      variant="outlined"
    ></v-text-field>
    <!-- FILE -->
    <v-file-input
      label="FILE"
      variant="outlined"
      @change="uploadFile"
     ></v-file-input>
    <!-- comment -->
    <v-textarea
      v-model="comment"
      label="COMMENT"
      variant="outlined"
      ></v-textarea>
      <v-btn
        type="submit"
        variant="outlined"
      >
        SUBMIT
      </v-btn>
      <p>{{ message }}</p>
      <p>{{ errorMessage }}</p>
  </form>
</template>
<script setup>
// 初期値
import { ref } from 'vue';
const title = ref('');
const website = ref('');
const fileData = ref('');
const comment = ref('');
const message = ref('');
const errorMessage = ref('');

const uploadFile = (e) => {
  fileData.value = e.target.files[0]
};

// firebase
import { createFirebase } from '@/firebase/storage';
import { getCurrentUser } from '@/firebase/auth';
import { addData } from '@/firebase/firestore';


const submit = async () => {
  if (!title.value || !website.value || !fileData.value || !comment.value) {
    alert ('すべて入力してください。')
    return
  }
  try {
    // storageに保存
    const url = await createFirebase(title.value, fileData.value);

    const user = await getCurrentUser();

    // firestoreに保存
    const postData = {
      title: title.value,
      website: website.value,
      comment: comment.value,
      filePath: url,
      createdAt: new Date(),
    }
    await addData(user, 'articles', postData);

    message.value = 'ユーザー情報の更新に成功しました。';

  } catch (error) {
    console.error('ユーザーデータ更新エラー', error);
    errorMessage.value = 'ユーザー情報の更新に失敗しました。';
  }
};
</script>
