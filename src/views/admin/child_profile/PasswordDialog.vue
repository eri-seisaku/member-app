<template>
  <Dialog v-model:dialog="dialog" :size="448">
    <template v-slot:text>
      <form @submit.prevent="submit">
        <v-row>
          <v-col cols="12">
            <Alert
              v-if="message"
              color="primary"
              :text="message"
            />
            <Alert
              v-if="errorMessage"
              color="red"
              :text="errorMessage"
            />
          </v-col>
          <v-col cols="12" v-for="fieldInfo in fields" :key="fieldInfo.key">
            <label class="text-subtitle-1 text-medium-emphasis">
              {{ fieldInfo.label }}
            </label>
            <v-text-field
              v-model="fieldInfo.field.value.value"
              :error-messages="fieldInfo.field.errorMessage.value"
              density="compact"
              variant="outlined"
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              @click:append-inner="visible = !visible"
              persistent-hint
              :hint="fieldInfo.hint"
            ></v-text-field>
            {{ fieldInfo.field.value.value }}
          </v-col>
        </v-row>
      </form>
    </template>

    <template v-slot:actions>
      <v-btn
        variant="outlined"
        type="submit"
        @click="submit"
      >
        更新
      </v-btn>
    </template>
  </Dialog>
</template>

<script setup>
import { ref } from 'vue';
// 初期値設定
const dialog = ref(false);
const visible = ref(false);
const message = ref('');
const errorMessage = ref('');

// components
import Dialog from '@/components/Dialog.vue';
import Alert from '@/components/Alert.vue';


// validation
import { useField, useForm } from 'vee-validate';
import { passwordValidationSchema } from '@/validate/validate';

const { handleSubmit } = useForm({
  passwordValidationSchema,
});

const currentPassword = useField('currentPassword');
const newPassword = useField('newPassword');
const confirmPassword = useField('confirmPassword');

const fields = [
  { key: 'currentPassword', field: useField('currentPassword'), label: '現在のパスワード', hint: '' },
  { key: 'newPassword', field: useField('newPassword'), label: '新しいパスワード', hint: '大文字、小文字、数字、特殊文字(@、$、!、%、*、?、&)の8文字以上' },
  { key: 'confirmPassword', field: useField('confirmPassword'), label: '新しいパスワード(確認用)', hint: '' },
];

// firebase
import { updatePasswordByAuth } from '@/firebase/auth';
// 送信処理
const submit = handleSubmit(async (values) => {
  console.log('submit', values);
  // try {
  //   // 新しいパスワードが確認用と一致するか確認
  //   if (values.newPassword !== values.confirmPassword) {
  //     errorMessage.value = '確認用パスワードが一致しません。';
  //     return;
  //   }
  //   await updatePasswordByAuth(values.currentPassword, values.newPassword);

  //   errorMessage.value = '';
  //   message.value = 'パスワードの更新に成功しました。';

  // } catch (error) {
  //   console.error(error);
  //   errorMessage.value = 'パスワードの変更に失敗しました。';
  // }
});
</script>
