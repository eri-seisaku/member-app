<template>
  <h2>作成</h2>
  <div class="ly_input">
    <div class="ly_input_inner">
      タイトル:<input type="text" v-model="title"><br>
    </div>
    <div class="ly_input_inner">
      メモ:<input type="text" v-model="memo"><br>
    </div>
    <div class="ly_input_inner">
      画像:<input type="file" accept="image/jpeg,image/png,image/gif" @change="uploadFile">
    </div>
    <button @click="create">登録</button>
    <p>{{ message }}</p>
    <p>{{ errorMessage }}</p>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { createFirebase } from '@/firebase/storage';
import { getCurrentUser } from '@/firebase/auth';
import { addData } from '@/firebase/firestore';


const title = ref();
const memo = ref();
const fileData = ref();
const message = ref('');
const errorMessage = ref('');

const uploadFile = (e) => {
  fileData.value = e.target.files[0]
};

const create = async () => {
  if (!title.value || !memo.value || !fileData.value) {
    alert ('すべて入力してください。')
    return
  }
  try {
    // storageに保存
    const url = await createFirebase(title.value,memo.value,fileData.value);

    const user = await getCurrentUser();

    // firestoreに保存
    const postData = {
      title: title.value,
      memo: memo.value,
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
<style>

.ly_input{
  padding:10px;
  max-width: 900px;
  margin:auto;
}
.ly_input_inner{
  margin:10px;
}
</style>
