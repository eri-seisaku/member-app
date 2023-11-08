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
          v-for="fieldInfo in fields"
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
              persistent-hint
              :hint="fieldInfo.hint"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="3" align-self="center" class="mb-3">
            <label class="text-subtitle-1 text-medium-emphasis">
              パスワード
              <span class="bg-red-accent-4 rounded text-subtitle-2 pa-1 ml-3">必須</span>
            </label>
          </v-col>
          <v-col cols="12" md="9">
            <v-text-field
              v-model="password.value.value"
              :error-messages="password.errorMessage.value"
              persistent-hint
              hint="大文字、小文字、数字、特殊文字(@、$、!、%、*、?、&)の8文字以上"
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              @click:append-inner="visible = !visible"

              variant="outlined"
            ></v-text-field>
            <v-chip
              v-for="chip in chips"
              :key="chip.key"
              class="ma-2"
              size="small"
              :color="chip.value.value ? 'success' : 'gray'"
              :prepend-icon="chip.value.value ? 'mdi-checkbox-marked-circle' : 'mdi-check-circle-outline'"
            >
              {{ chip.text }}
            </v-chip>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="3" align-self="center" class="mb-3">
            <label class="text-subtitle-1 text-medium-emphasis">
              郵便番号
              <span class="bg-red-accent-4 rounded text-subtitle-2 pa-1 ml-3">必須</span>
            </label>
          </v-col>
          <v-col cols="12" md="5" class="d-flex">
            <!-- <v-text-field
              v-model="zipCode.value.value"
              :error-messages="zipCode.errorMessage.value"
              variant="outlined"
              @blur="fetchAddress" // カーソル離すだけで自動にゅうりょく
            ></v-text-field> -->
            <v-text-field
              v-model="zipCode.value.value"
              :error-messages="zipCode.errorMessage.value"
              persistent-hint
              hint="ハイフンなし数字のみ"
              density="compact"
              variant="outlined"
            ></v-text-field>
            <v-btn
              variant="outlined"
              class="ml-6"
              size="large"
              :disabled="!!zipCode.errorMessage.value || !zipCode.value.value"
              @click="searchAddress"
            >
              住所検索
            </v-btn>
          </v-col>
          <v-col v-if="message" class="mt-3">
            <p class="text-red-lighten-1 text-subtitle-2">{{ message }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="3" align-self="center" class="mb-3">
            <label class="text-subtitle-1 text-medium-emphasis">都道府県</label>
            <span class="bg-red-accent-4 rounded text-subtitle-2 pa-1 ml-3">必須</span>
          </v-col>
          <v-col cols="12" md="9">
            <v-select
              v-model="state.value.value"
              :items="states"
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
              v-model="specialty.value.value"
              :items="specialties"
              :error-messages="specialty.errorMessage.value"
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
      </div>
      <div v-else>
        <Confirm :value="inputValues" />
      </div>
      <v-row>
        <v-col cols="12" md="12"  v-if="errorMessage">
          <v-alert
            border="start"
            border-color="error"
          >
            {{ errorMessage }}
          </v-alert>
        </v-col>
        <v-col cols="12" md="2" v-if="confirmMode">
          <v-btn @click="back" variant="outlined">
            戻る
          </v-btn>
        </v-col>
        <v-col cols="12" md="2">
          <v-btn
            class="me-4"
            type="submit"
            variant="outlined"
          >
            {{ confirmMode ? '送信' : '確認' }}
          </v-btn>
        </v-col>
      </v-row>
    </form>
  </v-container>
</template>

<script setup>
import { ref, watch } from 'vue';
const inputValues = ref({});
const message = ref(''); // 郵便番号検索時のメッセージ
const errorMessage = ref('');
const confirmMode = ref(false); // 確認画面の切り替え
const visible = ref(false); // password表示非表示

// component
import Confirm from '@/views/site/child_signup/Confirm.vue';

// router
import { useRouter } from 'vue-router';
const router = useRouter();

// validation
import { useField, useForm } from 'vee-validate';
import { validationSchema } from '@/validate/validate';

const { handleSubmit } = useForm({
  validationSchema: validationSchema,
});
// フィールドとフォームを紐づける
const fields = [
  { key: 'name', field: useField('name'), label: 'お名前', hint: '例) 苗字名前' },
  { key: 'officeName', field: useField('officeName'), label: '事務所名', hint: '' },
  { key: 'phone', field: useField('phone'), label: '電話番号', hint: '例) 09000000000' },
  { key: 'email', field: useField('email'), label: 'メールアドレス', hint: '例) example@mail.com' },
];
const password = useField('password');
const state = useField('state');
const address = useField('address');
const zipCode = useField('zipCode');
const specialty = useField('specialty');
const checkbox = useField('checkbox');

const chips = [
  { key: 'uppercase', text: '大文字', value: ref(false)},
  { key: 'lowercase', text: '小文字', value: ref(false)},
  { key: 'specialSymbols', text: '特殊記号', value: ref(false)},
  { key: 'count', text: '8文字以上', value: ref(false)},
];

// firebase
import { signUp } from '@/firebase/auth';
import { setOneLevelData } from '@/firebase/firestore';

// utils
import { states, setEightArea } from '@/utils/states'; // 都道府県,八区分
import { specialties, role } from '@/utils/category'; // 専門カテゴリ,権限
import { fetchAddress } from '@/utils/address'; // 住所取得

// 郵便番号から住所検索
const searchAddress = async () => {
  try {
    const res = await fetchAddress(zipCode.value.value);

    if (res === 200) {
      message.value = '郵便番号が見つかりませんでした。';
    } else if (typeof res === 'object') {
      state.value.value = res.data.pref;
      address.value.value = res.data.address;
    }
  } catch (error) {
    console.error('郵便番号検索エラー:', error);
    errorMessage.value = '郵便番号検索中にエラーが発生しました';
  }
};

// 送信処理
const submit = handleSubmit(async (values) => {
  try {
    if (!confirmMode.value) {
      confirmMode.value = true; // 確認画面に切り替え
      inputValues.value = values; // 確認画面にデータを渡す
    } else {
      // 送信処理
      if (confirmMode.value) {

        const area = await setEightArea(values.state);
        const user = await signUp(values.email, values.password);

        console.log(user.uid); // デバック

        // DBに保存するデータ
        const userData = {
          memberID: user.uid,
          name: values.name,
          officeName: values.officeName,
          phone: values.phone,
          email: values.email,
          zipCode: values.zipCode,
          state: values.state,
          address: values.address,
          eightArea: area,
          specialty: values.specialty,
          role: role.member,
          joinDate: new Date(),
        };

        await setOneLevelData(user.uid, "members", userData);

        // 登録が成功した場合
        router.push({ name: 'Admin' });
      }
    }
  } catch (error) {
    errorMessage.value = error;
    console.error("エラーが発生しました: ", error);
  }
});

// 画面切り替え
const back = () => {
  confirmMode.value = false;
  errorMessage.value = "";
};

// chipの色を変更
const updateChips = (newVal) => {
  const uppercaseArr = chips.find(chip => chip.key === 'uppercase');
  const lowercaseArr = chips.find(chip => chip.key === 'lowercase');
  const specialSymbolsArr = chips.find(chip => chip.key === 'specialSymbols');
  const countArr = chips.find(chip => chip.key === 'count');
  uppercaseArr.value.value = /[A-Z]/.test(newVal);
  lowercaseArr.value.value = /[a-z]/.test(newVal);
  specialSymbolsArr.value.value = /[@$!%*?&]/.test(newVal);
  countArr.value.value = /^.{8,64}$/.test(newVal);
};

// watchで入力の状態を監視
watch(() => password.value.value, (newVal) => {
  updateChips(newVal);
});
</script>
