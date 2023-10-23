<template>
  <v-row>
    <v-col cols="12" md="6" v-for="fieldInfo in fields">
      <label class="text-subtitle-1 text-medium-emphasis">
        {{ fieldInfo.label }}
      </label>
      <v-text-field
        v-model="fieldInfo.field.value.value"
        :error-messages="fieldInfo.field.errorMessage.value"
        density="compact"
        variant="outlined"
        form="submitForm"
      ></v-text-field>
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
      <form @submit.prevent="submit" id="submitForm">
        <v-btn
          variant="outlined"
          type="submit"
          form="submitForm"
        >
          SUBMIT
        </v-btn>
      </form>
    </v-col>
  </v-row>
  <v-row v-if="message || errorMessage">
    <Alert
      :color="message ? 'primary' : 'red'"
      :text="message ? message: errorMessage"
    />
  </v-row>
  <PasswordDialog
    v-model:dialog="passwordDialog"
  />
  <AuthDialog
    v-model:dialog="authDialog"
    :authVal="authData"
    :submitVal="submitData"
    @message="getMessage"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue';

// 初期値
const passwordDialog = ref(false);
const authDialog = ref(false);
const message = ref('');
const errorMessage = ref('');
const user = ref('');

const authData = ref({});
const submitData = ref({});

// components
import PasswordDialog from '@/views/admin/child_profile/PasswordDialog.vue';
import AuthDialog from '@/views/admin/child_profile/AuthDialog.vue';
import Alert from '@/components/Alert.vue';

// 読み取り専用
const readData = ref({
  state: '',
  eightArea: '',
  role: '',
  joinData: ''
});
const labels = {
  state: '都道府県',
  eightArea: '八区分',
  role: '権限',
  joinData: '加入年月日'
};

// validation 適用されない問題
import { useField, useForm } from 'vee-validate';
import { profileSchema } from '@/validate/validate';

const { handleSubmit } = useForm({
  validationSchema: profileSchema,
});

const fields = [
  { key: 'name', field: useField('name'), label: '名前' },
  { key: 'officeName', field: useField('officeName'), label: '事務所名' },
  { key: 'email', field: useField('email'), label: 'メールアドレス' },
];

// firebase
import { getCurrentUser } from '@/firebase/auth';
import { getData, updateData } from '@/firebase/firestore';

// utils
import { formatDate } from '@/utils/formatDate';

onMounted(async () => {
  try {
    user.value = await getCurrentUser();
    // console.log(user.value.uid);
    const userDoc = await getData(user.value.uid, "members");
    const formattedDate = await formatDate(userDoc.joinData);

    // Firestoreから取得したデータを各フィールドに設定
    fields.forEach((fieldInfo) => {
      fieldInfo.field.value.value = userDoc[fieldInfo.key];
    });

    // 読み取り専用データの設定
    // readData.value = userDoc; // 全データ
    readData.value.state = userDoc.state;
    readData.value.eightArea = userDoc.eightArea;
    readData.value.role = userDoc.role;
    readData.value.joinData = formattedDate;

  } catch (error) {
    errorMessage.value = error;
    console.error('ユーザーデータ取得エラー', error);
  }
});


// 送信処理
const submit = handleSubmit(async (values) => {
  try {

    if (values.email !== user.value.email) {
      authData.value = user.value;
      submitData.value = values;
      authDialog.value = true;
    } else {
      // ユーザー情報を更新
      await updateData(user.value.uid, "members", values);
      // パスワードの更新
      message.value = 'ユーザー情報の更新に成功しました。';
    }

  } catch (error) {

    console.error('ユーザーデータ更新エラー', error);
    errorMessage.value = 'ユーザー情報の更新に失敗しました。';
  }
});

const getMessage = (messages) => {
  message.value = messages.message;
  errorMessage.value = messages.errorMessage;
}
</script>
