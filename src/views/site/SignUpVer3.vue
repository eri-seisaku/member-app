<template>
  <v-container class="custom-width">
    <form @submit.prevent="submit">
      <v-row no-gutters class="mb-7">
        <v-col cols="12">
          <h2 class="text-h4">{{ confirmMode ? '確認画面' : '登録フォーム' }}</h2>
          <p class="mt-8 mb-8">{{ confirmMode ? '問題なければ送信を押してください' : '情報を入力してください' }}</p>
        </v-col>
      </v-row>
      <div v-if="!confirmMode">
        <!-- select 個人法人 -->
        <v-row no-gutters class="mb-7">
          <v-col cols="12" md="3" align-self="center" class="mb-md-5 mb-2">
            <label class="text-subtitle-1 text-medium-emphasis">
              種別
              <span class="bg-red-accent-3 rounded text-subtitle-2 pa-1 ml-3">必須</span>
            </label>
          </v-col>
          <v-col cols="12" md="5">
            <v-select
              variant="outlined"
              density="compact"
              label="選択してください"
              v-model="userType.value.value"
              :items="['個人', '法人']"
              :error-messages="userType.errorMessage.value"
            ></v-select>
          </v-col>
        </v-row>
        <!-- /select 個人法人 -->
        <!-- text 法人 -->
        <div class="bg-grey-lighten-4 pa-3 mb-7" v-if="userType.value.value === '法人'">
          <p class="text-subtitle-1 text-medium-emphasis pb-3">法人の場合は下記の項目が必須です</p>
          <v-row no-gutters v-for="fieldInfo in corporationFields" :key="fieldInfo.key">
            <v-col cols="12" md="3" align-self="center" class="mb-md-5 mb-2">
              <label class="text-subtitle-1 text-medium-emphasis">
                {{ fieldInfo.label }}
                <span class="bg-red-accent-3 rounded text-subtitle-2 pa-1 ml-3">必須</span>
              </label>
            </v-col>
            <v-col cols="12" md="8" class="d-flex align-center">
              <v-text-field
                variant="outlined"
                density="compact"
                persistent-hint
                v-model="fieldInfo.field.value.value"
                :error-messages="fieldInfo.field.errorMessage.value"
                :placeholder="fieldInfo.placeholder"
                :hint="fieldInfo.hint"
                @blur="fieldInfo.key === 'incorporationDate' ? formatDate(fieldInfo.field.value.value, fieldInfo) : null"
              ></v-text-field>
              <template v-if="fieldInfo.key === 'capital'">
                <p class="mb-5 px-4">万円</p>
              </template>
            </v-col>
          </v-row>
        </div>
        <!-- /text 法人 -->
        <!-- text 個人法人 -->
        <v-row no-gutters class="mb-7" v-for="fieldInfo in commonFields" :key="fieldInfo.key">
          <v-col cols="12" md="3" align-self="center" class="mb-md-5 mb-2">
            <label class="text-subtitle-1 text-medium-emphasis">
              {{ fieldInfo.label }}
              <template v-if="fieldInfo.key !== 'mobile' && fieldInfo.key !== 'fax' && fieldInfo.key !== 'website'">
                <span class="bg-red-accent-3 rounded text-subtitle-2 pa-1 ml-3">必須</span>
              </template>
              <template v-else>
                <span class="bg-blue-grey-lighten-1 rounded text-subtitle-2 pa-1 ml-3">任意</span>
              </template>
            </label>
          </v-col>
          <v-col cols="12" md="8">
            <v-text-field
              variant="outlined"
              density="compact"
              persistent-hint
              v-model="fieldInfo.field.value.value"
              :error-messages="fieldInfo.field.errorMessage.value"
              :placeholder="fieldInfo.placeholder"
              :hint="fieldInfo.hint"
              @blur="fieldInfo.key === 'birthday' ? formatDate(fieldInfo.field.value.value, fieldInfo) : null"
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- /text 個人法人 -->
        <!-- password 個人法人 -->
        <v-row no-gutters class="mb-7">
          <v-col cols="12" md="3" align-self="center" class="mb-md-15 mb-2">
            <label class="text-subtitle-1 text-medium-emphasis">
              パスワード
              <span class="bg-red-accent-3 rounded text-subtitle-2 pa-1 ml-3">必須</span>
            </label>
          </v-col>
          <v-col cols="12" md="8">
            <v-text-field
              variant="outlined"
              density="compact"
              v-model="password.value.value"
              :error-messages="password.errorMessage.value"
              persistent-hint
              hint="大文字、小文字、数字、特殊文字(@、$、!、%、*、?、&)の8文字以上"
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              @click:append-inner="visible = !visible"
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
        <!-- /password 個人法人 -->
        <!-- select text 個人法人 -->
        <v-row no-gutters class="mb-7">
          <v-col cols="12" md="3" align-self="center" class="mb-md-5 mb-2">
            <label class="text-subtitle-1 text-medium-emphasis">
              郵便番号
              <span class="bg-red-accent-3 rounded text-subtitle-2 pa-1 ml-3">必須</span>
            </label>
          </v-col>
          <v-col cols="12" md="5" class="d-flex">
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
        <v-row no-gutters class="mb-7">
          <v-col cols="12" md="3" align-self="center" class="mb-md-5 mb-2">
            <label class="text-subtitle-1 text-medium-emphasis">都道府県</label>
            <span class="bg-red-accent-3 rounded text-subtitle-2 pa-1 ml-3">必須</span>
          </v-col>
          <v-col cols="12" md="5">
            <v-select
              variant="outlined"
              density="compact"
              label="選択してください"
              v-model="state.value.value"
              :items="states"
              :error-messages="state.errorMessage.value"
            ></v-select>
          </v-col>
        </v-row>
        <v-row no-gutters class="mb-7" v-for="fieldInfo in addressFields" :key="fieldInfo.key">
          <v-col cols="12" md="3" align-self="center" class="mb-md-5 mb-2">
            <label class="text-subtitle-1 text-medium-emphasis">{{ fieldInfo.label }}</label>
            <template v-if="fieldInfo.key === 'addressLine1'">
              <span class="bg-red-accent-3 rounded text-subtitle-2 pa-1 ml-3">必須</span>
            </template>
            <template v-else>
              <span class="bg-blue-grey-lighten-1 rounded text-subtitle-2 pa-1 ml-3">任意</span>
            </template>
          </v-col>
          <v-col cols="12" md="8">
            <v-text-field
              variant="outlined"
              density="compact"
              persistent-hint
              v-model="fieldInfo.field.value.value"
              :error-messages="fieldInfo.field.errorMessage.value"
              :placeholder="fieldInfo.placeholder"
              :hint="fieldInfo.hint"
            ></v-text-field>
          </v-col>
        </v-row>
        <!-- /select text 個人法人 -->
        <!-- select 個人法人 -->
        <v-row no-gutters class="mb-7" v-for="fieldInfo in categoryFields" :key="fieldInfo.key">
          <v-col cols="12" md="3" align-self="center" class="mb-md-5 mb-2">
            <label class="text-subtitle-1 text-medium-emphasis">
              {{ fieldInfo.label }}
              <span class="bg-red-accent-3 rounded text-subtitle-2 pa-1 ml-3">必須</span>
            </label>
          </v-col>
          <v-col cols="12" md="5">
            <v-select
              variant="outlined"
              density="compact"
              label="選択してください"
              v-model="fieldInfo.field.value.value"
              :items="fieldInfo.items"
              :error-messages="fieldInfo.field.errorMessage.value"
            ></v-select>
          </v-col>
        </v-row>
        <!-- /select 個人法人 -->
        <!-- checkbox 個人法人 -->
        <v-row no-gutters class="mb-7">
          <v-col cols="12" md="3" align-self="center" class="mb-md-5 mb-2">
            <label class="text-subtitle-1 text-medium-emphasis">利用規約</label>
            <span class="bg-red-accent-3 rounded text-subtitle-2 pa-1 ml-3">必須</span>
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
import Confirm from '@/views/site/child_signup_ver1-3/ConfirmVer13.vue';

// router
import { useRouter } from 'vue-router';
const router = useRouter();

// firebase
import { signUp } from '@/firebase/auth';
import { setOneLevelData } from '@/firebase/firestore';

// utils
import { states, setEightArea } from '@/utils/states'; // 都道府県,八区分
import { specialties, role, industries } from '@/utils/category'; // 専門カテゴリ,権限
import { fetchAddress } from '@/utils/address'; // 住所取得

// validation
import { useField, useForm } from 'vee-validate';
import { signupValidationSchema } from '@/validate/validate';

const { handleSubmit } = useForm({
  validationSchema: signupValidationSchema,
});

// text-field 個人法人共通
const commonFields = [
  { key: 'name', field: useField('name'), label: '代表者名', placeholder: '山田　花子', hint: '姓と名の間にスペースを入力してください' },
  { key: 'nameKana', field: useField('nameKana'), label: '代表者名(フリガナ)', placeholder: 'ヤマダ　ハナコ', hint: '姓と名の間にスペースを入力してください' },
  { key: 'birthday', field: useField('birthday'), label: '生年月日', placeholder: '19900101', hint: '半角数字でYYYYMMDD形式でご記入ください' },
  { key: 'email', field: useField('email'), label: 'メールアドレス', placeholder: 'sample@mail.com', hint: '' },
  { key: 'phone', field: useField('phone'), label: '電話番号', placeholder: '0312345678', hint: 'ハイフンは入れずに半角数字でご記入ください (携帯のみの方はこちらにご記入ください)' },
  { key: 'mobile', field: useField('mobile'), label: '携帯番号', placeholder: '09012345678', hint: 'ハイフンは入れずに半角数字でご記入ください' },
  { key: 'fax', field: useField('fax'), label: 'FAX番号', placeholder: '09012345678', hint: 'ハイフンは入れずに半角数字でご記入ください' },
  { key: 'website', field: useField('website'), label: 'ホームページ', placeholder: 'https://sample.com', hint: '' },
];

// text-field 法人
const corporationFields = [
  { key: 'officeName', field: useField('officeName'), label: '事務所名', placeholder: '事務所名', hint: '' },
  { key: 'officeNameKana', field: useField('officeNameKana'), label: '事務所名(フリガナ)', placeholder: 'ジムショメイ', hint: '' },
  { key: 'incorporationDate', field: useField('incorporationDate'), label: '設立年月日', placeholder: '19900101', hint: '半角数字でYYYYMMDD形式でご記入ください' },
  { key: 'capital', field: useField('capital'), label: '資本金', placeholder: '1000', hint: '半角数字ででご記入ください' },
];

// text-field select 共通 住所
const zipCode = useField('zipCode');
const state = useField('state');
const addressFields = [
  { key: 'addressLine1', field: useField('addressLine1'), label: '住所', placeholder: '千代田区一番町', hint: '' },
  { key: 'addressLine2', field: useField('addressLine2'), label: '建物名', placeholder: '東京ビル', hint: '' },
];

// select 共通 カテゴリー
const categoryFields = [
  { key: 'industry', field: useField('industry'), label: '業種', items: industries },
  { key: 'specialty', field: useField('specialty'), label: '専門デザイン分野', items: specialties },
];

const userType = useField('userType'); // 種別
const password = useField('password');
const checkbox = useField('checkbox');

// import { formatDateWithSlash } from '@/utils/formatData';

// // 入力された日付に/を入れる
// const formatDate = (value, dateField) => {
//   if (value.length === 8) {
//     const year = value.substring(0, 4);
//     const month = value.substring(4, 6);
//     const day = value.substring(6, 8);

//     dateField.field.value.value = `${year}/${month}/${day}`;
//   }
// };

import { formatDateWithSlash } from '@/utils/formatData';

// 入力された日付に/を入れる
const formatDate = (value, dateField) => {
  if (value.length === 8) {
    const formattedDate = formatDateWithSlash(value);
    dateField.field.value.value = formattedDate;
  }
};


// 郵便番号から住所検索
const searchAddress = async () => {
  try {
    const res = await fetchAddress(zipCode.value.value);

    if (res === 200) {
      message.value = '郵便番号が見つかりませんでした。';
    } else if (typeof res === 'object') {
      state.value.value = res.data.pref;
      addressFields[0].field.value.value = res.data.address;
      // address.value.value = res.data.address;
    }
  } catch (error) {
    console.error('郵便番号検索エラー:', error);
    errorMessage.value = '郵便番号検索中にエラーが発生しました';
  }
};

// 画面切り替え
const back = () => {
  confirmMode.value = false;
  errorMessage.value = "";
};

// password入力の補助
const chips = [
  { key: 'uppercase', text: '大文字', value: ref(false)},
  { key: 'lowercase', text: '小文字', value: ref(false)},
  { key: 'specialSymbols', text: '特殊記号', value: ref(false)},
  { key: 'count', text: '8文字以上', value: ref(false)},
];

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

// 送信処理
// const submit = handleSubmit(async (values) => {
//   const data = {}; // before
//   console.log(values);
//   for (const key in values) {
//     data[key] = values[key] !== undefined ? values[key] : "";
//   }
//   console.log(data); // after
// });

// 送信処理
const submit = handleSubmit(async (values) => {
  console.log(values); // after
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
</script>
<style>
/*
.custom-border {
  border-bottom: dashed 1px rgb(171,171,171);
}*/

.custom-width {
  max-width: 850px;
}
</style>
