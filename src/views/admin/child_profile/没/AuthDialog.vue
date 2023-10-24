<template>
  <Dialog v-model:dialog="dialog" :size="448">
    <template v-slot:content>
      <v-row>
        <v-col cols="12">
          <p>メールアドレスを変更する場合は、ログインパスワードが必要です。変更後、新しいメールアドレスにメールが送信されます。</p>
        </v-col>
        <v-col cols="12">
          <p>旧メールアドレス</p>
          <p class="ml-1 mb-8">{{ authVal.email }}</p>
          <p>新メールアドレス</p>
          <p class="ml-1">{{ submitVal.email }}</p>
          <!-- <p>{{ authVal.uid }}</p> -->
        </v-col>
        <v-col cols="12">
          <form @submit.prevent="submit" id="authFrom">
            <Password
              label="パスワード"
              v-model:inputValue="password"
            />
            <div class="d-flex justify-end mt-4">
              <v-btn
                color="member"
                type="submit"
                class="mb-4"
                form="authFrom"
              >
                <v-icon
                  start
                  icon="mdi-content-save"
                ></v-icon>
                更新
              </v-btn>
            </div>
          </form>
        </v-col>
        <v-col cols="12" v-if="message || errorMessage">
          <Alert
            :color="message ? 'primary' : 'red'"
            :text="message ? message : errorMessage"
          />
        </v-col>
      </v-row>
    </template>
  </Dialog>
</template>

<script setup>
import { ref } from 'vue';
// 初期値設定
const dialog = ref(false);
const password = ref('');
const message = ref('');
const errorMessage = ref('');

// 親から子へ
const props = defineProps({
  authVal: Object,
  submitVal: Object
});

// 子→親へ
const emit = defineEmits([
  'message' // メッセージ
]);

// console.log(props.authVal);
// console.log(props.submitVal);

// components
import Dialog from '@/components/Dialog.vue';
import Password from '@/components/inputs/Password.vue';
import Alert from '@/components/Alert.vue';

// firebase
import { updateEmailByAuth } from '@/firebase/auth';
import { updateData } from '@/firebase/firestore';

const submit = async () => {
  try {
    await updateEmailByAuth(password.value, props.submitVal.email);

    // ユーザー情報を更新
    await updateData(props.authVal.uid, "members", props.submitVal);

    errorMessage.value = '';
    message.value = 'ユーザー情報の更新に成功しました。';
    emit('message', message.value);
    dialog.value = false;

  } catch (error) {
    console.error(error);
    errorMessage.value = 'ユーザー情報の変更に失敗しました。';
  }
};
</script>
