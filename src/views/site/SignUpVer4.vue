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
            <div v-if="!confirmMode">
              <CommonForm :userType="userType" />
            </div>
            <div v-else>
              <Confirm
                :value="inputValues"
                :userType="userType"
                @submit="setInputValueAndSubmit"
                @back="back"
                @errorMessage="setErrorMessage"
              />
            </div>
            <!-- 共通 -->
            <v-row align-content="center">
              <v-col cols="12" v-if="!confirmMode" align="center">
                <v-btn
                  type="submit"
                  variant="outlined"
                  size="large"
                  min-width="100"
                >
                  確認
                </v-btn>
              </v-col>
              <v-col v-if="errorMessage">
                <Alert
                  color="red"
                  :text="errorMessage"
                />
              </v-col>
            </v-row>
          </form>
        </v-window-item>

        <v-window-item value="corporation">
          <form @submit.prevent="submit" class="my-8">
            <div v-if="!confirmMode">
              <CorporationForm />
              <CommonForm :userType="userType" />
            </div>
            <div v-else>
              <Confirm
                :value="inputValues"
                :userType="userType"
                @submit="setInputValueAndSubmit"
                @back="back"
                @errorMessage="setErrorMessage"
              />
            </div>
            <!-- 共通 -->
            <v-row align-content="center">
              <v-col cols="12" v-if="!confirmMode" align="center">
                <v-btn
                  type="submit"
                  variant="outlined"
                  size="large"
                  min-width="100"
                >
                  確認
                </v-btn>
              </v-col>
              <v-col v-if="errorMessage">
                <Alert
                  color="red"
                  :text="errorMessage"
                />
              </v-col>
            </v-row>
          </form>
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
const setFieldValueKey = ref(false); // 変更をwatchで監視
const errorMessage = ref('');

// components
import Alert from '@/components/Alert.vue';
import Confirm from '@/views/site/child_signup/Confirm.vue';
import CommonForm from '@/views/site/child_signup/CommonForm.vue';
import CorporationForm from '@/views/site/child_signup/CorporationForm.vue';

// firebase
import { signUp } from '@/firebase/auth';
import { setOneLevelData } from '@/firebase/firestore';

// utils
import { formatFormValues } from '@/utils/formatData';
import { setEightArea } from '@/utils/states'; // 八区分
import { role } from '@/utils/category'; // 権限

// router
import { useRouter } from 'vue-router';
const router = useRouter();

// validate
import { signupValidationSchema } from '@/validate/validate';
import { useForm } from 'vee-validate';

const { handleSubmit, errors, setFieldValue } = useForm({
  validationSchema: signupValidationSchema,
});

// tabの値を監視してuserTypeの値を変更
watch(() => tab.value, (newVal) => {
  if (newVal === 'individual') {
    userType.value = '個人';
  } else if (newVal === 'corporation') {
    userType.value = '法人';
  }
});

// 入力内容を再設定するために監視
watch(() => setFieldValueKey.value, (newVal, oldVal) => {
  // console.log(`old: "${oldVal}" new: "${newVal}"`); // 変更をコンソールに表示
  for (const key in inputValues.value) {
    setFieldValue(key, inputValues.value[key]);
  }
});

// 入力フォーム全体を監視
watch(() => errors.value, () => {
  if (!confirmMode.value) {
    if (Object.keys(errors.value).length > 0) {
      errorMessage.value = '入力内容をご確認ください。';
    } else {
      errorMessage.value = "";
    }
  }
});

// 子から発火
const back = () => {
  confirmMode.value = false;
  // watchが動くのでフィールドの値がセットされるので戻ってもフォームにデータが残っている
  setFieldValueKey.value = true;
  errorMessage.value = "";
};

const setErrorMessage = (error) => {
  errorMessage.value = error;
}

const setInputValueAndSubmit = () => {
  setFieldValueKey.value = true; // watchが動く
  submit(); // watchが実行されてhandleSubmitできるようになる
}

const submit = handleSubmit(async (values) => {
  try {
    if (!confirmMode.value) {
      confirmMode.value = true;
      errorMessage.value = '';
      inputValues.value = values;

    } else {
      const formattedInputData = formatFormValues(values);

      const user = await signUp(formattedInputData.email, formattedInputData.password);

      const otherData = {
        memberID: user.uid,
        eightArea: setEightArea(formattedInputData.state),
        role: role.member,
        joinDate: new Date().toLocaleDateString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit" }),
        createDateTimestamp: new Date(),
      };

      ["checkbox", "password"].forEach(key => delete formattedInputData[key]); // 登録したくない物を削除

      const userData = { ...formattedInputData, ...otherData };
      await setOneLevelData(user.uid, "members", userData);

      router.push({ name: 'Admin' });
    }
  } catch (error) {
    console.error("エラーが発生しました: ", error);
    errorMessage.value = error;
  }
});
</script>
