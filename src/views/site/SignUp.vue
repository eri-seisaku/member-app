<template>
  <v-container class="fill-height" fluid>
    <v-row align="center">
      <v-col cols="12">
        <h2 class="text-h4">{{ confirmMode ? '確認画面' : '登録フォーム' }}</h2>
        <p class="mt-8 mb-8">{{ confirmMode ? '問題なければ送信を押してください' : '情報を入力してください' }}</p>
        <form @submit.prevent="submit">
          <div v-if="!confirmMode">

            <!-- フォームの表示 -->
            <v-text-field
              v-for="fieldInfo in fields"
              :key="fieldInfo.key"
              v-model="fieldInfo.field.value.value"
              :counter="fieldInfo.counter"
              :error-messages="fieldInfo.field.errorMessage.value"
              :label="fieldInfo.label"
              variant="outlined"
            ></v-text-field>

            <v-select
              v-model="select.value.value"
              :items="items"
              :error-messages="select.errorMessage.value"
              label="Select"
              variant="outlined"
            ></v-select>

            <v-checkbox
              v-model="checkbox.value.value"
              :error-messages="checkbox.errorMessage.value"
              value="1"
              label="利用規約に同意します"
              type="checkbox"
            ></v-checkbox>

            <v-btn
              class="me-4"
              type="submit"
            >
              確認
            </v-btn>

          </div>

          <div v-else>

            <!-- 確認画面の表示 -->
            <div v-for="fieldInfo in filteredFields" :key="fieldInfo.key" class="confirm">
              {{ fieldInfo.label }}: {{ fieldInfo.field.value.value }}
            </div>
            <div class="confirm">
              password: **********
            </div>
            <div class="confirm">
              select: {{ select.value.value }}
            </div>
            <div class="confirm">
              check: {{ checkbox.value.value }}
            </div>
            <v-btn
              class="me-4"
              type="submit"
            >
              送信
            </v-btn>

            <v-btn @click="back">
              戻る
            </v-btn>
          </div>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// Import
import { ref, computed } from 'vue';
import { useField, useForm } from 'vee-validate';
import { validationSchema } from '../../validate/config';
import { db, auth } from '../../firebase/config';
import { collection, doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'vue-router';

// Routerのインスタンスを作成
const router = useRouter();

// Form
const items = ref([
  'Item 1',
  'Item 2',
  'Item 3',
  'Item 4',
]);

// バリデーション
const { handleSubmit } = useForm({
  validationSchema,
});

const fields = [
  { key: 'name', field: useField('name'), counter: 10, label: 'Name' },
  { key: 'phone', field: useField('phone'), counter: 7, label: 'Phone Number' },
  { key: 'email', field: useField('email'), counter: null, label: 'E-mail' },
  { key: 'password', field: useField('password'), counter: null, label: 'Password' },
];

const select = useField('select');
const checkbox = useField('checkbox');

const filteredFields = computed(() => {
  return fields.filter(fieldInfo => fieldInfo.key !== 'password');
});

// 確認画面の切り替え
const confirmMode = ref(false);

const submit = handleSubmit(async (values) => {
  if (!confirmMode.value) {
    // 確認画面に切り替え
    confirmMode.value = true;
  } else {
    // 送信処理
    if (confirmMode.value) {
      await signupUser(values);
    }
  }
});

const signupUser = async (values) => {
  // 非同期処理
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
    const user = userCredential.user;

    const userCollection = collection(db, "users");
    const userData = {
      name: values.name,
      phone: values.phone,
      email: values.email,
      select: values.select,
      createdAt: new Date(),
    };

    const userRef = doc(userCollection, user.uid);
    await setDoc(userRef, userData);

    // console.log(user.uid); // デバック

    router.push('/admin/profile/');
  } catch (error) {
    console.error("ユーザー登録エラー:", error.code, error.message);
  }
};

const back = () => {
  // フォームモードに戻る
  confirmMode.value = false;
};

</script>

<style>
.confirm {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
.confirm:last-of-type {
  margin-bottom: 20px;
}
</style>