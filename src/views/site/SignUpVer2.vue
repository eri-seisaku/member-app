<template>
  <v-container>
    <v-tabs
      fixed-tabs
      v-model="tab"
      bg-color="white"
    >
      <v-tab value="individual">
        <p class="text-subtitle-1 text-md-h6">個人のお客様</p>
      </v-tab>
      <v-tab value="corporation">
        <p class="text-subtitle-1 text-md-h6">法人のお客様</p>
      </v-tab>
    </v-tabs>

      <v-window v-model="tab">
        <v-window-item value="individual">
          <form @submit.prevent="submit" class="mt-8">
            <div v-if="!confirmMode">
            <!-- <div v-show="!confirmMode"> -->
              <CommonForm :userType="userType" />
              <v-row>
                <v-col cols="12" class="d-flex justify-center">
                  <v-btn
                    type="submit"
                    variant="outlined"
                    size="large"
                    min-width="100"
                  >
                    確認
                  </v-btn>
                </v-col>
              </v-row>
            </div>
            <div v-else>
            <!-- <div v-show="confirmMode"> -->
              <Confirm
                :value="inputValues"
                :userType="userType"
                @submit="childSubmit"
                @back="back"
                @errorMessage="setErrorMessage"
              />
            </div>
          </form>
          <!-- Error Message -->
          <Alert
            v-if="errorMessage"
            color="red"
            :text="errorMessage"
          />
        </v-window-item>

        <v-window-item value="corporation">
          <form @submit.prevent="submit" class="mt-8">
            <div v-if="!confirmMode">
              <CorporationForm />
              <CommonForm :userType="userType" />
              <v-row>
                <v-col cols="12" class="d-flex justify-center">
                  <v-btn
                    type="submit"
                    variant="outlined"
                    size="large"
                    min-width="100"
                  >
                    確認
                  </v-btn>
                </v-col>
              </v-row>
            </div>
            <div v-else>
              <Confirm
                :value="inputValues"
                :userType="userType"
                @submit="childSubmit"
                @back="back"
                @errorMessage="setErrorMessage"
              />
            </div>
          </form>
          <!-- Error Message -->
          <Alert
            v-if="errorMessage"
            color="red"
            :text="errorMessage"
          />
        </v-window-item>

      </v-window>
  </v-container>
</template>

<script setup>
import { ref, watch } from 'vue';
const tab = ref(null);
const inputValues = ref({});
const confirmMode = ref(false); // 確認画面の切り替え
const errorMessage = ref('');
const userType = ref('');

const setFieldValueKey = ref(false); // 変更をwatchで監視

// components
import Alert from '@/components/Alert.vue';
import CommonForm from '@/views/site/child_signup/CommonForm.vue';
import CorporationForm from '@/views/site/child_signup/CorporationForm.vue';
// ver2
import Confirm from '@/views/site/child_signup_ver2/ConfirmVer2.vue';

// validate
import { signupValidationSchema } from '@/validate/validate';
import { useForm } from 'vee-validate';
// v-ifだとfieldの値が消えてしまう？のでデータを再設定するためにsetFieldValueを追加
const { handleSubmit, setFieldValue } = useForm({
  validationSchema: signupValidationSchema,
});

// 2.各フィールドの値を再設定
watch(() => setFieldValueKey.value, (newVal, oldVal) => {
  console.log(`old: "${oldVal}" new: "${newVal}"`); // 変更をコンソールに表示
  for (const key in inputValues.value) {
    setFieldValue(key, inputValues.value[key]);
  }
}, { deep: true });

// tabの値を監視してuserTypeの値を変更
watch(() => tab.value, (newVal) => {
  if (newVal === 'individual') {
    userType.value = '個人';
  } else if (newVal === 'corporation') {
    userType.value = '法人';
  }
});

watch(() => confirmMode.value, (newVal, oldVal) => {
  console.log(`old: "${oldVal}" new: "${newVal}"`);
}, { deep: true });

// 画面切り替え
const back = () => {
  confirmMode.value = false;
  setFieldValueKey.value = true; // watchが動くのでフィールドの値がセットされるので戻ってもフォームにデータが残っている
  errorMessage.value = "";
};

const setErrorMessage = (error) => {
  errorMessage.value = error;
}

const childSubmit = () => {
  setFieldValueKey.value = true; // 1.watchが動く
  submit(); // 3.2が実行されることでsubmitが実行できる
}

const submit = handleSubmit(async (values) => {
  try {
    if (confirmMode.value) {
      console.log('送信しました');
      // Firebaseはundefinedの値はNG
      const data = {};
      for (const key in values) {
        data[key] = values[key] !== undefined ? values[key] : "";
      }
      console.log(data); // after
    } else {
    confirmMode.value = true; // 確認画面に切り替え
    inputValues.value = values; // 確認画面にデータを渡す
    }
  } catch (error) {
    console.error("エラーが発生しました: ", error);
  }
});



</script>
