<template>
  <!-- text-field 共通 -->
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
      <TextField
        :field="fieldInfo.field"
        :hint="fieldInfo.hint"
        :placeholder="fieldInfo.placeholder"
        @blur="fieldInfo.key === 'birthday' ? formatDate(fieldInfo.field.value.value, fieldInfo) : null"
      />
    </v-col>
  </v-row>
  <!-- /text-field 共通 -->
  <!-- password 共通 -->
  <v-row no-gutters class="mb-7">
    <v-col cols="12" md="3" align-self="center" class="mb-md-15 mb-2">
      <label class="text-subtitle-1 text-medium-emphasis">
        パスワード
        <span class="bg-red-accent-3 rounded text-subtitle-2 pa-1 ml-3">必須</span>
      </label>
    </v-col>
    <v-col cols="12" md="8">
      <PasswordField
        :field="password"
        hint="大文字、小文字、数字、特殊文字(@、$、!、%、*、?、&)の8文字以上"
      />
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
  <!-- /password 共通 -->
  <!-- select text-field 共通 -->
  <v-row no-gutters class="mb-7">
    <v-col cols="12" md="3" align-self="center" class="mb-md-5 mb-2">
      <label class="text-subtitle-1 text-medium-emphasis">
        郵便番号
        <span class="bg-red-accent-3 rounded text-subtitle-2 pa-1 ml-3">必須</span>
      </label>
    </v-col>
    <v-col cols="12" md="5" class="d-flex">
      <TextField
        :field="zipCode"
        hint="ハイフンなし数字のみ"
      />
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
      <SelectField
        :field="state"
        :items="states"
      />
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
      <TextField
        :field="fieldInfo.field"
        :hint="fieldInfo.hint"
        :placeholder="fieldInfo.placeholder"
      />
    </v-col>
  </v-row>
  <!-- /select text-field 共通 -->
  <!-- select 共通 -->
  <v-row no-gutters class="mb-7" v-for="fieldInfo in categoryFields" :key="fieldInfo.key">
    <v-col cols="12" md="3" align-self="center" class="mb-md-5 mb-2">
      <label class="text-subtitle-1 text-medium-emphasis">
        {{ fieldInfo.label }}
        <span class="bg-red-accent-3 rounded text-subtitle-2 pa-1 ml-3">必須</span>
      </label>
    </v-col>
    <v-col cols="12" md="5">
      <SelectField
        :field="fieldInfo.field"
        :items="fieldInfo.items"
      />
    </v-col>
  </v-row>
  <!-- /select 共通 -->
  <!-- checkbox 共通 -->
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
  <!-- /checkbox 共通 -->
</template>

<script setup>
import { ref, watch } from 'vue';
const message = ref(''); // 郵便番号検索時のメッセージ
const errorMessage = ref('');

// components
import TextField from '@/components/inputs/TextField.vue';
import SelectField from '@/components/inputs/SelectField.vue';
import PasswordField from '@/components/inputs/PasswordField.vue';

// utils
import { states } from '@/utils/states'; // 都道府県,八区分
import { specialties, industries } from '@/utils/category'; // 専門カテゴリ,業種
import { fetchAddress } from '@/utils/address'; // 住所取得
import { formatDateWithSlash } from '@/utils/formatData'; // 年月日を変換
import { chips, updateChips } from '@/utils/formHelper'; // password入力ヘルパー

// validation
import { useField } from 'vee-validate';

// 共通field
const commonFields = [
  { key: 'name', field: useField('name'), label: '代表者名', placeholder: '山田　花子', hint: '姓と名の間にスペースを入力してください' },
  { key: 'nameKana', field: useField('nameKana'), label: '代表者名(フリガナ)', placeholder: 'ヤマダ　ハナコ', hint: '姓と名の間にスペースを入力してください' },
  { key: 'officeName', field: useField('officeName'), label: '事務所名', placeholder: '事務所名', hint: '' },
  { key: 'officeNameKana', field: useField('officeNameKana'), label: '事務所名(フリガナ)', placeholder: 'ジムショメイ', hint: '' },
  { key: 'birthday', field: useField('birthday'), label: '生年月日', placeholder: '19900101', hint: '半角数字でYYYYMMDD形式でご記入ください' },
  { key: 'email', field: useField('email'), label: 'メールアドレス', placeholder: 'sample@mail.com', hint: '' },
  { key: 'phone', field: useField('phone'), label: '電話番号', placeholder: '0312345678', hint: 'ハイフンは入れずに半角数字でご記入ください (携帯のみの方はこちらにご記入ください)' },
  { key: 'mobile', field: useField('mobile'), label: '携帯番号', placeholder: '09012345678', hint: 'ハイフンは入れずに半角数字でご記入ください' },
  { key: 'fax', field: useField('fax'), label: 'FAX番号', placeholder: '09012345678', hint: 'ハイフンは入れずに半角数字でご記入ください' },
  { key: 'website', field: useField('website'), label: 'ホームページ', placeholder: 'https://sample.com', hint: '' },
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

const props = defineProps({
  userType: String,
});
userType.value.value = props.userType; // 親からuseField('userType')用の値をもらいfieldに渡す

// console.log(props.userType);
// console.log(userType);

// 入力された日付に/を入れる
const formatDate = (value, dateField) => {
  if (value && value.length === 8) {
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

// watchでpassword入力の状態を監視
watch(() => password.value.value, (newVal) => {
  updateChips(newVal, chips);
  // updateChips(newVal);
});

// watchでpropsのの状態を監視してfieldの値を変更
watch(() => props.userType, (newVal, oldVal) => {
  userType.value.value = newVal;
  // console.log(`old: "${oldVal}" new: "${newVal}"`);
  // console.log(userType.value.value);
}, { deep: true });

// userTypeが変更されたら、それに合わせてフィールドの値も更新する
// watch(() => userType.value.value, (newVal) => {
//   userType.value.value = newVal;
// }, { deep: true });
</script>
<style>

</style>
