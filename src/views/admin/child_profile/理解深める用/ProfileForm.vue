<template>
  <v-row>
    <v-col cols="12" md="6" v-for="editInfo in editData">
      <label class="text-subtitle-1 text-medium-emphasis">
        {{ editInfo.label }}
      </label>
      <v-text-field
        v-model="editInfo.field.value.value"
        :error-messages="editInfo.field.errorMessage.value"
        density="compact"
        variant="outlined"
        form="profileForm"
      ></v-text-field>
      <!-- <Text
        :label="editInfo.label"
        form="profileForm"
        type="text"
        :required="true"
        v-model:inputValue="editInfo.value.value.value"
      /> -->
    </v-col>
    <v-col cols="12" md="6" v-for="readInfo in readData">
      <label class="text-subtitle-1 text-medium-emphasis">
        {{ readInfo.label }}
      </label>
      <v-text-field
        v-model="readInfo.value.value"
        density="compact"
        variant="outlined"
        :disabled="true"
      ></v-text-field>
      <!-- <Text
        :label="readInfo.label"
        type="text"
        :disabled="true"
        :required="true"
        v-model:inputValue="readInfo.value.value"
      /> -->
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
    <v-col cols="12" md="6">
      <div class="text-subtitle-1 text-medium-emphasis">
        メールアドレス
      </div>
      <v-btn
        block
        class="mb-8"
        size="large"
        variant="outlined"
        @click="mailDialogOpen"
      >
        新しいメールアドレスを設定
      </v-btn>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" class="d-flex justify-end">
      <form @submit.prevent="submit" id="profileForm">
        <v-btn
          variant="outlined"
          type="submit"
          form="profileForm"
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
  <MailDialog
    v-model:dialog="mailDialog"
    :authVal="authData"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue';

// 初期値
const passwordDialog = ref(false);
const mailDialog = ref(false);
const message = ref('');
const errorMessage = ref('');
const user = ref('');

const authData = ref({});

// validation
import { useField, useForm } from 'vee-validate';
import { profileSchema } from '@/validate/validate';

const { handleSubmit } = useForm({
  validationSchema: profileSchema,
});

// components
import PasswordDialog from '@/views/admin/child_profile/PasswordDialog.vue';
import MailDialog from '@/views/admin/child_profile/MailDialog.vue';
// import Text from '@/components/inputs/Text.vue';
import Alert from '@/components/Alert.vue';


// 読み取り専用
const readData = [
  { key: 'state', label: '都道府県', value: ref('')},
  { key: 'eightArea', label: '八区分', value: ref('')},
  { key: 'role', label: '権限', value: ref('')},
  { key: 'joinDate', label: '加入年月日', value: ref('')},
];
// 編集専用
const editData = [
  { key: 'name', label: '名前', field: useField('name')},
  { key: 'officeName', label: '事務所名', field: useField('officeName')},
];
// const editData = [
//   { key: 'name', label: '名前', value: ref('')},
//   { key: 'officeName', label: '事務所名', value: ref('')},
// ];

// firebase
import { getCurrentUser } from '@/firebase/auth';
import { getOneLevelData, updateOneLevelData } from '@/firebase/firestore';

// utils
import { formatDate } from '@/utils/formatDate';

onMounted(async () => {
  try {
    user.value = await getCurrentUser(); // user情報
    const userDoc = await getOneLevelData(user.value.uid, "members"); // 全データ
    const formattedDate = await formatDate(userDoc.joinDate); // 日付変換

    // dbから取得したデータを各フィールドに設定
    editData.forEach((editInfo) => {
      // console.log(userDoc[editInfo.key]);
      editInfo.field.value.value = userDoc[editInfo.key];
    });

    readData.forEach((readInfo) => {
      if (readInfo.key === 'joinDate') {
        readInfo.value.value = formattedDate;
      } else {
        readInfo.value.value = userDoc[readInfo.key];
      }
    });

  } catch (error) {
    errorMessage.value = error;
    console.error('ユーザーデータ取得エラー', error);
  }
});

const mailDialogOpen = () => {
  authData.value = user.value;
  mailDialog.value = true;
}

// 送信処理
const submit = handleSubmit(async (values) => {
  try {
    // ユーザー情報を更新
    await updateOneLevelData(user.value.uid, "members", values);
    message.value = 'ユーザー情報の更新に成功しました。';
  } catch (error) {
    console.error('ユーザーデータ更新エラー', error);
    errorMessage.value = 'ユーザー情報の更新に失敗しました。';
  }
});

</script>
