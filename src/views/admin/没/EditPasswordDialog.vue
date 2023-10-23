<template>
  <Dialog v-model:dialog="dialog" :size="448">
    <template v-slot:content>
      <div>
        <form @submit.prevent="submit">
          <Password
            label="現在のパスワード"
            v-model:inputValue="currentPassword"
          />
          <Password
            label="新しいパスワード"
            v-model:inputValue="newPassword"
          />
          <Password
            label="新しいパスワード（確認用）"
            v-model:inputValue="confirmPassword"
          />
        </form>
        <v-alert v-if="message">
          {{ message }}
        </v-alert>
        <v-alert v-if="errorMessage">
          {{ errorMessage }}
        </v-alert>
      </div>
    </template>

    <template v-slot:actions>
      <v-btn
        color="member"
        type="submit"
        class="mb-4"
        form="profileForm"
        @click="submit"
      >
        <v-icon
          start
          icon="mdi-content-save"
        ></v-icon>
        更新
      </v-btn>
    </template>
  </Dialog>
</template>

<script setup>
import { ref } from 'vue';
// firebase
import { updatePasswordByAuth } from '@/firebase/auth';

// 各コンポーネントインポート
import Dialog from '@/components/Dialog.vue';
import Password from '@/components/inputs/Password.vue';

// 初期値設定
const dialog = ref(false);
const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const message = ref('');
const errorMessage = ref('');

const submit = async () => {
  try {
    // 新しいパスワードが確認用と一致するか確認
    if (newPassword.value !== confirmPassword.value) {
      errorMessage.value = '新しいパスワードが一致しません。';
      return;
    }
    await updatePasswordByAuth(currentPassword.value, newPassword.value);

    errorMessage.value = '';
    message.value = 'パスワードの更新に成功しました。';

  } catch (error) {
    console.error(error);
    errorMessage.value = 'パスワードの変更に失敗しました。';
  }
};
</script>
