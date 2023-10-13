<template>
  <v-row>
    <v-col cols="12" md="6" v-for="fieldInfo in fields">
      <form @submit.prevent="submit">
        <label class="text-subtitle-1 text-medium-emphasis">
          {{ fieldInfo.label }}
        </label>
        <v-text-field
          v-model="fieldInfo.field.value.value"
          :error-messages="fieldInfo.field.errorMessage.value"
          density="compact"
          variant="outlined"
        ></v-text-field>
      </form>
    </v-col>
    <v-col cols="12" md="6">
      <div class="text-subtitle-1 text-medium-emphasis">
        パスワード
      </div>
      <v-btn
        block
        class="mb-8"
        size="large"
        variant="outlined"
        @click="passwordDialog = true"
      >
        新しいパスワードを設定
      </v-btn>
      <PasswordDialog v-model:dialog="passwordDialog" />
    </v-col>
  </v-row>
  <v-row>
    <!-- ↓readonlyをつけると半透明解除 -->
    <v-col cols="12" md="6" v-for="(item, key) in readData" :key="key">
      <label>{{ labels[key] || key }}</label>
      <v-text-field
        :model-value="item"
        density="compact"
        variant="outlined"
        disabled
      ></v-text-field>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" class="d-flex justify-end">
      <v-btn
        variant="outlined"
        type="submit"
        @click="submit"
      >
        SUBMIT
      </v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
// component
import PasswordDialog from '@/views/admin/profile/PasswordDialog.vue';

// 初期値
import { ref, onMounted } from 'vue';
const passwordDialog = ref(false);
const errorMessage = ref('');

// 読み取り専用
const readData = ref({
  state: '',
  eightArea: '',
  specialty: '',
  joinData: ''
});
const labels = {
  state: '都道府県',
  eightArea: '八区分',
  specialty: '専門カテゴリ',
  joinData: '加入年月日'
};

// validation 適用されない問題
import { useField, useForm } from 'vee-validate';
import { profileValidationSchema } from '@/validate/validate';

const { handleSubmit } = useForm({
  profileValidationSchema,
});

const fields = [
  { key: 'name', field: useField('name'), label: '名前' },
  { key: 'officeName', field: useField('officeName'), label: '事務所名' },
  { key: 'email', field: useField('email'), label: 'メールアドレス' },
];

import { getCurrentUser } from '@/firebase/auth';
import { getData, updateData } from '@/firebase/firestore';
import { formatDate } from '@/utils/formatDate';
// import { emailCheck } from '@/firebase/auth';

onMounted(async () => {
  try {
    const user = await getCurrentUser();
    const userDoc = await getData(user.uid, "members");
    const formattedDate = await formatDate(userDoc.joinData);

    // Firestoreから取得したデータを各フィールドに設定
    fields.forEach((fieldInfo) => {
      fieldInfo.field.value.value = userDoc[fieldInfo.key];
    });

    // 読み取り専用データの設定
    // readData.value = userDoc; // 全データ
    readData.value.state = userDoc.state;
    readData.value.eightArea = userDoc.eightArea;
    readData.value.specialty = userDoc.specialty;
    readData.value.joinData = formattedDate;

  } catch (error) {
    console.error('ユーザーデータ取得エラー', error);
  }
});


// 送信処理
const submit = handleSubmit(async (values) => {
  console.log('submit'); // なぜ送信できる？
});
</script>
