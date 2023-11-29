<template>
  <v-container>
    <v-tabs
      fixed-tabs
      v-model="tab"
      bg-color="white"
    >
      <v-tab value="individual" :disabled="confirmMode">
        <p class="text-subtitle-1 text-md-h6">個人のお客様</p>
      </v-tab>
      <v-tab value="corporation" :disabled="confirmMode">
        <p class="text-subtitle-1 text-md-h6">法人のお客様</p>
      </v-tab>
    </v-tabs>

      <v-window v-model="tab">
        <v-window-item value="individual">
          <form @submit.prevent="submit" class="my-8">
            <!-- <div v-if="!confirmMode"> -->
            <div v-show="!confirmMode">
              <CommonForm :userType="userType" />
            </div>
            <!-- <div v-else> -->
            <div v-show="confirmMode">
              <Confirm :value="inputValues" />
              <!-- <Confirm :value="inputValues" :userType="userType" /> -->
            </div>
            <v-row>
              <v-col cols="12" md="6" class="d-flex justify-space-evenly">
                <v-btn
                  v-if="confirmMode"
                  @click="back"
                  variant="outlined"
                  size="large"
                  min-width="100"
                >
                  戻る
                </v-btn>
                <v-btn
                  type="submit"
                  variant="outlined"
                  size="large"
                  min-width="100"
                  :class="confirmMode ? 'bg-primary' : 'bg-white' "
                >
                  {{ confirmMode ? '送信' : '確認' }}
                </v-btn>
              </v-col>
            </v-row>
          </form>
          <!-- Error Message -->
          <Alert
            v-if="errorMessage"
            color="red"
            :text="errorMessage"
          />
        </v-window-item>

        <v-window-item value="corporation">
          <form @submit.prevent="submit" class="my-8">
            <div v-show="!confirmMode">
            <!-- <div v-if="!confirmMode"> -->
              <CorporationForm />
              <CommonForm :userType="userType" />
            </div>
            <div v-show="confirmMode">
            <!-- <div v-else> -->
              <Confirm :value="inputValues" />
              <!-- <Confirm :value="inputValues" :userType="userType" /> -->
            </div>
            <v-row>
              <v-col cols="12" md="6" class="d-flex justify-space-evenly">
                <v-btn
                  v-if="confirmMode"
                  @click="back"
                  variant="outlined"
                  size="large"
                  min-width="100"
                >
                  戻る
                </v-btn>
                <v-btn
                  type="submit"
                  variant="outlined"
                  size="large"
                  min-width="100"
                  :class="confirmMode ? 'bg-primary' : 'bg-white' "
                >
                  {{ confirmMode ? '送信' : '確認' }}
                </v-btn>
              </v-col>
            </v-row>
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
const userType = ref('');
const errorMessage = ref('');

// components
import CommonForm from '@/views/site/child_signup/CommonForm.vue';
import CorporationForm from '@/views/site/child_signup/CorporationForm.vue';
import Confirm from '@/views/site/child_signup_ver1-3/ConfirmVer13.vue';
import Alert from '@/components/Alert.vue';

// validate
import { signupValidationSchema } from '@/validate/validate';
import { useForm } from 'vee-validate';
// import { useForm, getErrors } from 'vee-validate';

const { handleSubmit, errors } = useForm({
  validationSchema: signupValidationSchema,
});
console.log(errors);
// const { handleSubmit } = useForm({
//   validationSchema: signupValidationSchema,
// });

// tabの値を監視してuserTypeの値を変更
watch(() => tab.value, (newVal) => {
  if (newVal === 'individual') {
    userType.value = '個人';
  } else if (newVal === 'corporation') {
    userType.value = '法人';
  }
});

// デバック
watch(() => confirmMode.value, (newVal, oldVal) => {
  console.log(`old: "${oldVal}" new: "${newVal}"`);
}, { deep: true });

// form全体を監視
watch(() => errors.value, (newVal, oldVal) => {
  if (Object.keys(errors.value).length > 0) {
    errorMessage.value = '入力内容をご確認ください。';
  }
});

// firebase
import { signUp } from '@/firebase/auth';
import { setOneLevelData } from '@/firebase/firestore';

// router
import { useRouter } from 'vue-router';
const router = useRouter();

// 画面切り替え
const back = () => {
  confirmMode.value = false;
  errorMessage.value = "";
};

const submit = handleSubmit(async (values) => {
  try {
    if (confirmMode.value) {
      console.log('送信');
    } else {
      confirmMode.value = true; // 確認画面に切り替え
      inputValues.value = values; // 確認画面にデータを渡す
    }
  } catch (error) {
    console.error("エラーが発生しました: ", error);
    errorMessage.value = error;
  }
});

</script>
