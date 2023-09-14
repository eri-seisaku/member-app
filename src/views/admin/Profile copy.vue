<template>
  <v-container class="fill-height" fluid>
    <v-row no-gutters>
      <v-col cols="12">
        <PageTitle titleColor="rgb(var(--v-theme-user)" iconName="mdi-account-cog" titleText="プロフィール" />
      </v-col>
      <v-col cols="4">
        <v-sheet class="pa-6 ma-6" rounded align="center">
          <!--  -->
          <v-avatar
        color="grey"
        size="150"
      >
        <v-img cover src="../../assets/icon/user_icon.png"></v-img>
      </v-avatar>
      <h4 class="mt-2 title blue-grey--text text--darken-2 font-weight-regular">{{ userData.name }}</h4>
            <h6 class="subtitle-2 font-weight-light">Accoubts Manager Amix corp</h6>
          <!--  -->
        </v-sheet>
      </v-col>
      <v-col>
        <v-sheet class="pa-6 ma-6" rounded>
          <form @submit.prevent="submit">

            <Password
              label="pass"
              v-model:inputValue="userData.name"
            />
            <Text
              label="名前"
              :disabled="false"
              v-model:inputValue="userData.name"
            />
            <Text
              label="メールアドレス"
              :disabled="false"
              v-model:inputValue="userData.email"
            />
            <Text
              label="メールアドレス"
              :disabled="false"
              v-model:inputValue="userData.email"
            />

            <div>名前</div>
            <v-text-field
              density="compact"
              variant="outlined"
              v-model="userData.name"
            ></v-text-field>

            <div>メールアドレス</div>
            <v-text-field
              density="compact"
              variant="outlined"
              v-model="userData.email"
            ></v-text-field>

            <div>電話番号</div>
            <v-text-field
              disabled
              density="compact"
              variant="outlined"
              v-model="userData.phone"
            ></v-text-field>

            <div>選択項目</div>
            <label>選択項目</label>
            <v-text-field
              disabled
              density="compact"
              variant="outlined"
              v-model="userData.select"
            ></v-text-field>

            <!-- --------------------- -->
            <v-btn
              @click="showInput = !showInput"
              variant="outlined"
            >
              {{ showInput ? 'キャンセル' : 'パスワード更新' }}
            </v-btn>

            <div v-if="showInput">
              <PasswordInput />
            </div>
            <!-- --------------------- -->

            <v-card
              class="mb-12"
              color="surface-variant"
              variant="tonal"
              v-if="errorMessage"
            >
              <v-card-text class="text-medium-emphasis text-caption">
                {{ errorMessage }}
              </v-card-text>
            </v-card>

            <v-spacer></v-spacer>

            <v-btn
              class="ma-8"
              color="blue"
              size="large"
              variant="tonal"
              type="submit"
            >
              更新
            </v-btn>
          </form>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { auth } from '../../firebase/firebase';
import { getData, updateData } from '../../firebase/firestore';
import { updateEmailByAuth, updatePasswordByAuth } from '../../firebase/auth';

// 各コンポーネントインポート
import PageTitle from '@/components/PageTitle.vue';
import PasswordInput from '@/components/PasswordInput.vue';
import Password from '@/components/inputs/Password.vue';
import Text from '@/components/inputs/Text.vue';

const user = auth.currentUser;
const visible = ref(false);
const showInput = ref(false);
const userData = ref({
  name: '',
  email: '',
  phone: '',
  select: '',
});
const password = ref('');
const errorMessage = ref('');

onMounted(async () => {
  try {
    // Firestoreからユーザーの情報を取得し、userDataにセット
    const userDoc = await getData(user.uid, "members");
    userData.value = userDoc;
  } catch (error) {
    console.error('ユーザーデータ取得エラー', error);
  }
});

const submit = async () => {
  try {
    // デバック
    console.log(userData.value.email);

    // Firestoreにユーザー情報を更新
    await updateData(user.uid, "members", userData.value);

    // メールアドレスの更新
    await updateEmailByAuth(userData.value.email);

    // パスワードの更新
    await updatePasswordByAuth(password.value);

    // 成功メッセージなどの処理を追加
  } catch (error) {
    console.error('ユーザーデータ更新エラー', error);
    errorMessage.value = 'ユーザー情報の更新に失敗しました。';
  }
};
</script>


<style>
.confirm {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
.confirm:last-of-type {
  margin-bottom: 20px;
}
</style>


