<template>
  <v-container class="fill-height" fluid>
    <v-row no-gutters>
      <v-col cols="12">
        <v-sheet class="pa-6" rounded>
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
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
// 初期値
import { ref, onMounted } from "vue";
const title = ref('');
const website = ref('');
const fileData = ref('');
const comment = ref('');
const message = ref('');
const errorMessage = ref('');

const user = ref('');

const uploadFile = (e) => {
  fileData.value = e.target.files[0]
};

// firebase
import { createFirebase, upload } from '@/firebase/storage';
import { getCurrentUser } from '@/firebase/auth';
import { updateOneLevelData, addTwoLevelData } from '@/firebase/firestore';

// 取得
onMounted(async () => {
  try {
    user.value = await getCurrentUser();
  } catch (error) {
    console.error('ユーザーデータ取得エラー', error);
    errorMessage.value = error;
  }
});

const submit = async () => {
  if (!title.value || !website.value || !comment.value) {
    alert ('すべて入力してください。')
    return
  }
  try {
    // storageに保存
    const url = await upload("portfolio", fileData.value, user.value.uid);

    // firestoreに保存
    const postData = {
      title: title.value,
      website: website.value,
      comment: comment.value,
      filePath: url,
      date: new Date(),
    }

    await addTwoLevelData(user.value.uid, postData, "portfolios", "portfolio");

    message.value = 'ユーザー情報の更新に成功しました。';

  } catch (error) {
    console.error('ユーザーデータ更新エラー', error);
    errorMessage.value = 'ユーザー情報の更新に失敗しました。';
  }
};


</script>
