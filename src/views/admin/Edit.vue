<template>
  <v-container class="fill-height" fluid>
    <v-row>
      <v-col cols="12" md="6">
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
            v-model="files"
            multiple
            label="FILE"
            variant="outlined"
            @change="uploadFiles"
            :counter="maxFileCount"
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
        </form>
        <p>{{ message }}</p>
        <p>{{ errorMessage }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
// 初期化
const title = ref('');
const website = ref('');
const comment = ref('');
const files = ref([]);
const message = ref('');
const errorMessage = ref('');
const maxFileCount = 5; // 最大ファイル数を設定

const uploadFiles = (e) => {
  // e.target.files は FileList オブジェクトで、選択された全てのファイルを含んでいます
  // これを配列に変換して、各ファイル情報にアクセスできます
  const fileList = Array.from(e.target.files);

  // 選択された各ファイルにアクセスするループ
  // for (const file of fileList) {
  //   console.log('File Name:', file.name);
  //   console.log('File Size:', file.size);
  //   console.log('File Type:', file.type);
  // }
  // for (const file of fileList) {
  //   files.value.push(file);
  // }
  if (fileList.length + files.value.length <= maxFileCount) {
    // 最大ファイル数を超えない場合、選択されたファイルを files 配列に追加します
    for (const file of fileList) {
      files.value.push(file);
    }
  } else {
    // 最大ファイル数を超える場合、エラーメッセージなどの処理を追加できます
    console.log('選択できるファイル数は最大 ' + maxFileCount + ' 個です');
    // あるいはユーザーにエラーメッセージを表示するなどの対応を追加できます
  }
  console.log(files.value);
};

// firebase
import { createFirebase } from '@/firebase/storage';
import { getCurrentUser } from '@/firebase/auth';
import { addData } from '@/firebase/firestore';


const submit = async () => {
  if (!title.value || !comment.value || !files.value) {
    alert ('すべて入力してください。')
    return
  }
  try {
    // storageに保存
    const url = await createFirebase(title.value,comment.value,fileData.value);

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
