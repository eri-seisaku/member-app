<template>

    <div class="text-subtitle-1 text-medium-emphasis">現在のパスワード</div>
    <v-text-field
      required
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      density="compact"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      @click:append-inner="visible = !visible"
      v-model="currentPassword"
    ></v-text-field>

    <div class="text-subtitle-1 text-medium-emphasis">新しいパスワード</div>
    <v-text-field
      required
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      density="compact"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      @click:append-inner="visible = !visible"
      v-model="newPassword"
    ></v-text-field>

    <div class="text-subtitle-1 text-medium-emphasis">新しいパスワード（確認用）</div>
    <v-text-field
      required
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      density="compact"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      @click:append-inner="visible = !visible"
      v-model="confirmPassword"
    ></v-text-field>

</template>

<script setup>
import { ref } from 'vue';
import { updatePasswordByAuth } from '../firebase/auth';

const dialog = ref(false);
const visible = ref(false);
const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');
const message = ref('');

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
