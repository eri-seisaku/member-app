<template>
  <v-container class="fill-height" fluid>
    <v-row>
      <v-col>
        <p class="mt-8 mb-8">
          ここには何を表示するのか分かりません。<br>
          管理者の場合はここにお知らせ等が表示されます。
        </p>
        <form @submit.prevent="submit">
          <Text
            type="text"
            label="aaa"
            :required="false"
            :disabled="false"

          />
          <Text
            type="text"
            label="bbbb"
            :required="true"
            :disabled="false"

          />
          <v-btn type="submit">sousin</v-btn>
        </form>
        <!-- ---------------------------------------- -->
        <v-btn @click="ParentDialog = true">Toggle Dialog</v-btn>
        <Dialog v-model:dialog="ParentDialog" :size="500">
          <template v-slot:toolbarTitle>
            <v-toolbar
              color="primary"
              title="再認証ログインフォーム"
            ></v-toolbar>
          </template>
          <template v-slot:text>
            <div>
              <p class="mb-4">メールアドレスを変更する場合は再度ログインしてください。※ログインから日がたった時に表示されます。</p>
              <form @submit.prevent="submit">
                <Text
                  label="メールアドレス"
                  type="email"
                  :disabled="false"
                  v-model:inputValue="email"
                />
                <Password
                  label="パスワード"
                  v-model:inputValue="password"
                />
              </form>
              <v-alert>
                {{ errorMessage }}
              </v-alert>
            </div>
          </template>

          <template v-slot:actions>
            <v-btn variant="outlined">Toggle Dialog</v-btn>
          </template>

        </Dialog>
        <!-- ---------------------------------------- -->

      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { auth } from '@/firebase/firebase';
// 各コンポーネントインポート
import Dialog from '@/components/Dialog.vue';
import Password from '@/components/inputs/Password.vue';
import Text from '@/components/inputs/Text.vue';
const ParentDialog = ref(false);
const user = auth.currentUser;

const email = ref('');
const password = ref('');
const errorMessage = ref('aaaa');

</script>
