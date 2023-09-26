<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2 class="text-h4">{{ confirmMode ? '確認画面' : '登録フォーム' }}</h2>
        <p class="mt-8 mb-8">{{ confirmMode ? '問題なければ送信を押してください' : '情報を入力してください' }}</p>
      </v-col>
    </v-row>
    <form @submit.prevent="submit">
      <div v-if="!confirmMode">
        <v-row
          v-for="fieldInfo in textFields"
          :key="fieldInfo.key"
        >
          <v-col cols="12" md="3" align-self="center" class="mb-3">
            <label class="text-subtitle-1 text-medium-emphasis">
              {{ fieldInfo.label }}
              <span class="bg-red-accent-4 rounded text-subtitle-2 pa-1 ml-3">必須</span>
            </label>
          </v-col>
          <v-col cols="12" md="9">
            <v-text-field
              v-model="fieldInfo.field.value.value"
              :error-messages="fieldInfo.field.errorMessage.value"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="3" align-self="center" class="mb-3">
            <label class="text-subtitle-1 text-medium-emphasis">
              郵便番号
              <span class="bg-red-accent-4 rounded text-subtitle-2 pa-1 ml-3">必須</span><br>
              <span class="text-caption">※数字のみ</span>
            </label>
          </v-col>
          <v-col cols="12" md="5" class="d-flex">
            <!-- <v-text-field
              v-model="zip_code.value.value"
              :error-messages="zip_code.errorMessage.value"
              variant="outlined"
              @blur="fetchAddress" // カーソル離すだけで自動にゅうりょく
            ></v-text-field> -->
            <v-text-field
              v-model="zip_code.value.value"
              density="compact"
              :error-messages="zip_code.errorMessage.value"
              variant="outlined"
            ></v-text-field>
            <v-btn
              variant="outlined"
              class="ml-6"
              size="large"
              :disabled="zip_code.errorMessage.value || !zip_code.value.value"
              @click="fetchAddress"
            >
              住所検索
            </v-btn>
          </v-col>
          <v-col v-if="errorMessage" class="mt-3">
            <p class="red text-subtitle-2">{{ errorMessage }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="3" align-self="center" class="mb-3">
            <label class="text-subtitle-1 text-medium-emphasis">都道府県</label>
            <span class="bg-red-accent-4 rounded text-subtitle-2 pa-1 ml-3">必須</span>
          </v-col>
          <v-col cols="12" md="9">
            <!-- <v-text-field
              v-model="state.value.value"
              :error-messages="state.errorMessage.value"
              variant="outlined"
            ></v-text-field> -->
            <v-select
              v-model="state.value.value"
              :items="prefectures"
              :error-messages="state.errorMessage.value"
              label="選択してください"
              variant="outlined"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="3" align-self="center" class="mb-3">
            <label class="text-subtitle-1 text-medium-emphasis">住所</label>
            <span class="bg-red-accent-4 rounded text-subtitle-2 pa-1 ml-3">必須</span>
          </v-col>
          <v-col cols="12" md="9">
            <v-text-field
              v-model="address.value.value"
              :error-messages="address.errorMessage.value"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="3" align-self="center" class="mb-3">
            <label class="text-subtitle-1 text-medium-emphasis">専門デザイン分野</label>
            <span class="bg-red-accent-4 rounded text-subtitle-2 pa-1 ml-3">必須</span>
          </v-col>
          <v-col cols="12" md="9">
            <v-select
              v-model="select.value.value"
              :items="specialties"
              :error-messages="select.errorMessage.value"
              label="選択してください"
              variant="outlined"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="3" align-self="center" class="mb-3">
            <label class="text-subtitle-1 text-medium-emphasis">利用規約</label>
            <span class="bg-red-accent-4 rounded text-subtitle-2 pa-1 ml-3">必須</span>
          </v-col>
          <v-col cols="12" md="9">
            <v-checkbox
              v-model="checkbox.value.value"
              :error-messages="checkbox.errorMessage.value"
              value="1"
              label="利用規約に同意します"
              type="checkbox"
            ></v-checkbox>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-btn
              class="me-4"
              type="submit"
              variant="outlined"
            >
              確認
            </v-btn>
          </v-col>
        </v-row>
      </div>
      <div v-else>
        <Confirm :value="inputValues" />
        <v-btn @click="back" variant="outlined">
          戻る
        </v-btn>
      </div>
    </form>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useField, useForm } from 'vee-validate';
import { validationSchema } from '@/validate/validate';
import { useRouter } from 'vue-router';
import { signUp } from '@/firebase/auth';
import { saveData } from '@/firebase/firestore';
// Form List Items
import { prefectures } from '@/utils/prefectures.js';
import { specialties } from '@/utils/specialties.js';

import Confirm from '@/views/site/signup/Confirm.vue';
const inputValues = ref({});

// const props = defineProps({
//   value: Object, // データはオブジェクトとして受け取る
// });

const errorMessage = ref();


// Routerのインスタンスを作成
const router = useRouter();

// 確認画面の切り替え
const confirmMode = ref(false);

// バリデーションの設定
const { handleSubmit } = useForm({
  validationSchema,
});

const textFields = [
  { key: 'name', field: useField('name'), label: 'お名前' },
  { key: 'office_name', field: useField('office_name'), label: '事務所名' },
  { key: 'phone', field: useField('phone'), label: '電話番号' },
  { key: 'email', field: useField('email'), label: 'メールアドレス' },
  { key: 'password', field: useField('password'), label: 'パスワード' },
];
const state = useField('state');
const address = useField('address');
const zip_code = useField('zip_code');
const select = useField('select');
const checkbox = useField('checkbox');

const filteredFields = computed(() => {
  return fields.filter(fieldInfo => fieldInfo.key !== 'password');
});

import axios from 'axios';
import axiosJsonpAdapter from 'axios-jsonp'
const fetchAddress = async () => {
  try {
    const res = await axios.get(`https://api.zipaddress.net/?zipcode=${zip_code.value.value}`, {adapter: axiosJsonpAdapter});

    console.log(res); // 全て
    console.log(res.data.message); // Address not found
    console.log(res.data.code); // 404
    console.log(res.status); // 全て
    // console.log(res.data.pref); // 都道府県
    // console.log(res.data.address); // 町名まで
    // console.log(res.data.city); // ○○群○○
    // console.log(res.data.town); // 町名のみ



    if (res.status === 200) {
      if (res.data.code !== 404) {
        errorMessage.value = '';
        state.value.value = res.data.pref;
        address.value.value = res.data.address;
      } else{
        errorMessage.value = '郵便番号検索でヒットしませんでした。';
      }
    }
  } catch (error) {
    console.error('郵便番号検索エラー:', error);
    errorMessage.value = '郵便番号検索中にエラーが発生しました'; // エラーメッセージを設定
  }
};


const submit = handleSubmit(async (values) => {
  try {
    if (!confirmMode.value) {
      // 確認画面に切り替え
      confirmMode.value = true;
      inputValues.value = values;
    } else {
      // 送信処理
      if (confirmMode.value) {
        const userData = {
          name: values.name,
          phone: values.phone,
          email: values.email,
          select: values.select,
          createdAt: new Date(),
        };

        const user = await signUp(values.email, values.password);
        await saveData(user, "members", userData);

        // 登録が成功した場合
        router.push('/admin');
      }
    }
  } catch (error) {
    // エラーが発生した場合
    console.error("ユーザー登録エラー:", error.code, error.message);
    // エラーメッセージを表示するか、必要な処理を追加する
  }
});

const back = () => {
  // フォームモードに戻る
  confirmMode.value = false;
};

</script>

<style>
.red {
  color: #D50000;
}
</style>
