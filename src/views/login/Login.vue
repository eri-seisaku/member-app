<template>
  <v-container class="fill-height" fluid>
    <v-row>
      <v-col>
        <!-- LOGO ICON -->
        <v-img
          class="mx-auto my-6"
          max-width="228"
          src="@/assets/logo-vuetify.svg"
        ></v-img>
        <!-- ERROR MESSAGE -->
        <Alert
          v-if="errorMessage"
          color="red"
          :text="errorMessage"
        />
        <!-- FORM -->
        <Card max-width="448">
          <template v-slot:content>
            <form @submit.prevent="submit">
              <label class="text-subtitle-1 text-medium-emphasis">メールアドレス</label>

              <v-text-field
                required
                density="compact"
                variant="outlined"
                v-model="email"
              ></v-text-field>

              <label class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                パスワード

                <a
                  class="text-caption text-decoration-none text-blue"
                  href="/password_request"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  パスワードをお忘れですか?</a>
              </label>

              <v-text-field
                required
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                density="compact"
                variant="outlined"
                @click:append-inner="visible = !visible"
                v-model="password"
              ></v-text-field>

              <v-btn
                block
                size="large"
                color="primary"
                type="submit"
              >
                ログイン
              </v-btn>
            </form>
          </template>
        </Card>
        <a
          class="text-blue text-decoration-none d-flex justify-center ma-4"
          href="/check"
          rel="noopener noreferrer"
        >
          会員登録へ <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// 初期値
import { ref } from 'vue';
const visible = ref(false);
const email = ref('');
const password = ref('');
const errorMessage = ref('');

// router
import { useRouter } from 'vue-router';
const router = useRouter();

// components
import Card from '@/components/cards/Card.vue';
import Alert from '@/components/Alert.vue';

// firebase
import { login } from '@/firebase/auth';

// // store
// import { useAuthStore } from '@/store/auth';
// const authStore = useAuthStore();

// ログイン処理
const submit = async () => {
  try {
    await login(email.value, password.value);

    // ストアのログイン状態とプロフィール情報を更新
    // authStore.login({ id: user.uid, email: user.email });

    // ログイン成功後の処理を追加
    router.push('/admin');
  } catch (error) {
    errorMessage.value = 'ログインに失敗しました。メールアドレスとパスワードを確認してください。';
  }
};

</script>
