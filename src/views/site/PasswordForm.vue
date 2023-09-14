<template>
  <div>
    <div v-for="field in formFields" :key="field.key">
      <div class="text-subtitle-1 text-medium-emphasis">{{ field.label }}</div>
      <v-text-field
        required
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
        v-model="field.value"
      ></v-text-field>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { updatePasswordByAuth } from '../firebase/auth';

const dialog = ref(false);
const visible = ref(false);

const formFields = ref([
  {
    key: 'currentPassword',
    label: '現在のパスワード',
    value: '',
  },
  {
    key: 'newPassword',
    label: '新しいパスワード',
    value: '',
  },
  {
    key: 'confirmPassword',
    label: '新しいパスワード（確認用）',
    value: '',
  },
]);

const errorMessage = ref('');
const message = ref('');

const submit = async () => {
  try {
    // 新しいパスワードが確認用と一致するか確認
    if (formFields[1].value !== formFields[2].value) {
      errorMessage.value = '新しいパスワードが一致しません。';
      return;
    }
    await updatePasswordByAuth(formFields[0].value, formFields[1].value);

    errorMessage.value = '';
    message.value = 'パスワードの更新に成功しました。';

  } catch (error) {
    console.error(error);
    errorMessage.value = 'パスワードの変更に失敗しました。';
  }
};
</script>
