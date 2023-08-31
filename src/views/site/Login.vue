<template>
  <v-container class="fill-height" fluid>
    <v-row>
      <v-col>
        <v-img
          class="mx-auto my-6"
          max-width="228"
          src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
        ></v-img>

        <v-card
          class="mx-auto pa-12 pb-8"
          elevation="8"
          max-width="448"
          rounded="lg"
        >
          <form @submit.prevent="login">
            <div class="text-subtitle-1 text-medium-emphasis">Account</div>

            <v-text-field
              density="compact"
              placeholder="メールアドレス"
              prepend-inner-icon="mdi-email-outline"
              variant="outlined"
              v-model="email"
            ></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
              Password

              <a
                class="text-caption text-decoration-none text-blue"
                href="#"
                rel="noopener noreferrer"
                target="_blank"
              >
                パスワードをお忘れですか?</a>
            </div>

            <v-text-field
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              density="compact"
              placeholder="パスワード"
              prepend-inner-icon="mdi-lock-outline"
              variant="outlined"
              @click:append-inner="visible = !visible"
              v-model="password"
            ></v-text-field>

            <v-card
              class="mb-12"
              color="surface-variant"
              variant="tonal"
              v-if="errorMessage"
            >
              <v-card-text class="text-medium-emphasis text-caption">
                {{ errorMessage }}
              </v-card-text>
            </v-card>

            <v-btn
              block
              class="mb-8"
              color="blue"
              size="large"
              variant="tonal"
              type="submit"
            >
              ログイン
            </v-btn>
          </form>

          <v-card-text class="text-center">
            <a
              class="text-blue text-decoration-none"
              href="/check"
              rel="noopener noreferrer"
            >
              会員登録へ <v-icon icon="mdi-chevron-right"></v-icon>
            </a>
            <p>{{ email }}</p>
            <p>{{ password }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
const visible = ref(false);
const email = ref('');
const password = ref('');
const errorMessage = ref('');

// store
import { useAuthStore } from '@/store/auth';
const authStore = useAuthStore();

// router
import { useRouter } from 'vue-router';
const router = useRouter();

// firebase
import { auth } from '../../firebase/config';
import { signInWithEmailAndPassword } from "firebase/auth";

const login = async () => {
  try {
    // Firebaseのログイン処理
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);

    const user = userCredential.user;

    // ストアのログイン状態とプロフィール情報を更新
    authStore.login({ id: user.uid, email: user.email });

    // ログイン成功後の処理を追加
    router.push('/admin');


  } catch (error) {
    // デバック
    console.error('ログインエラー', error);

    errorMessage.value = 'ログインに失敗しました。メールアドレスとパスワードを確認してください。';
  }
};


</script>