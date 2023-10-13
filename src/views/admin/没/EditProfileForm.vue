<template>
  <form @submit.prevent="submitProfileForm">
    <v-row>
        <v-col cols="12" md="6">
          <Text
            type="text"
            label="名前"
            :required="true"
            :disabled="false"
            v-model:inputValue="userData.name"
          />
        </v-col>
        <v-col cols="12" md="6">
          <Text
            type="email"
            label="メールアドレス"
            :required="true"
            :disabled="false"
            v-model:inputValue="userData.email"
          />
        </v-col>
    </v-row>
  </form>
  <v-row>
    <v-col cols="12" md="6">
      <Text
        type="text"
        label="電話番号"
        :required="true"
        :disabled="true"
        v-model:inputValue="userData.phone"
      />
    </v-col>
    <v-col cols="12" md="6">
      <Text
        type="text"
        label="選択項目"
        :required="true"
        :disabled="true"
        v-model:inputValue="userData.select"
      />
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" md="6">
      <v-btn
        @click="passwordDialog = true"
        variant="outlined"
      >
      パスワード更新
    </v-btn>

    <EditPasswordDialog v-model:dialog="passwordDialog" />

    <Dialog v-model:dialog="authDialog">
      <p>aaaaa</p>
    </Dialog>

    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12">
      <v-btn
        color="member"
        type="submit"
        class="mb-4"
        form="profileForm"
        @click="submitProfileForm"
      >
        <v-icon
          start
          icon="mdi-content-save"
        ></v-icon>
        更新
      </v-btn>
      <v-alert v-if="message">
        {{ message }}
      </v-alert>
      <v-alert v-if="errorMessage">
        {{ errorMessage }}
      </v-alert>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { auth } from '@/firebase/firebase';
import { getData, updateData } from '@/firebase/firestore';
import { emailCheck, logout } from '@/firebase/auth';

// 各コンポーネントインポート
import EditPasswordDialog from '@/views/admin/profile/EditPasswordDialog.vue';
import Text from '@/components/inputs/Text.vue';
import Dialog from '@/components/Dialog.vue';

// 初期値設定
const passwordDialog = ref(false);
const authDialog = ref(false);

// ログイン中のユーザー情報を取得
const user = auth.currentUser;

const userData = ref({
  name: '',
  email: '',
  phone: '',
  select: '',
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

const message = ref('');
const errorMessage = ref('');

onMounted(async () => {
  try {
    // Firestoreからユーザーの情報を取得し、userDataにセット
    const userDoc = await getData(user.uid, "members");
    userData.value = userDoc;
  } catch (error) {
    console.error('ユーザーデータ取得エラー', error);
  }
});

const submitProfileForm = async () => {
  try {
    // メールアドレスの更新
    await emailCheck(userData.value.email);

    // Firestoreにユーザー情報を更新
    await updateData(user.uid, "members", userData.value);


    // パスワードの更新
    message.value = 'ユーザー情報の更新に成功しました。';

    // 成功メッセージなどの処理を追加
  } catch (error) {
    console.log(error.message);
    if (error.message === "REAUTH_REQUIRED") {
      authDialog.value = true;
    } else {
      console.error('ユーザーデータ更新エラー', error);
      errorMessage.value = 'ユーザー情報の更新に失敗しました。';
    }
  }
};
// const submitProfileForm = async () => {
//   try {

//     console.log(userData.value.email); // デバック

//     // Firestoreにユーザー情報を更新
//     await updateData(user.uid, "members", userData.value);

//     // メールアドレスの更新
//     await updateEmailByAuth(userData.value.email);

//     // パスワードの更新
//     message.value = 'ユーザー情報の更新に成功しました。';

//     // 成功メッセージなどの処理を追加
//   } catch (error) {
//     console.error('ユーザーデータ更新エラー', error);
//     errorMessage.value = 'ユーザー情報の更新に失敗しました。';
//   }
// };

const logoutUser = () => {
  logout();
}
</script>
