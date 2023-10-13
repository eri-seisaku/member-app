<template>
  <Dialog v-model:dialog="dialog" :size="448">
    <template v-slot:text>
      <div>
        <form @submit.prevent="submit">
          <Text
            type="email"
            label="メールアドレス"
            :required="true"
            :disabled="false"
            v-model:inputValue="userData.email"
          />
          <Password
            label="パスワード"
            v-model:inputValue="password"
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
import Text from '@/components/inputs/Text.vue';
import Password from '@/components/inputs/Password.vue';

// 初期値設定
const dialog = ref(false);
const email = ref('');
const password = ref('');
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
