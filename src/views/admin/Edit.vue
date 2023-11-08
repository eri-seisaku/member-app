<template>
  <v-container class="fill-height" fluid>
    <v-row no-gutters>
      <v-col cols="6">
        <v-sheet class="pa-6" rounded>

          <!-- 取得 -->
          <p>{{ $route.params.portfolioID }}</p>
          <pre>{{ portfolioData }}</pre>
          <!-- /取得 -->

          <form @submit.prevent="submit">
            <!-- title -->
            <v-text-field
              v-model="portfolioData.title"
              label="TITLE"
              required
              variant="outlined"
            ></v-text-field>
            <!-- web site -->
            <v-text-field
              v-model="portfolioData.website"
              label="WEB SITE"
              variant="outlined"
            ></v-text-field>
            <!-- FILE -->
            <!-- 悩み中 -->
            <!-- comment -->
            <v-textarea
              v-model="portfolioData.comment"
              label="COMMENT"
              variant="outlined"
              ></v-textarea>
              <v-btn
                type="submit"
                variant="outlined"
              >
                SUBMIT
              </v-btn>
              <p>{{ message }}</p>
              <p>{{ errorMessage }}</p>
          </form>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
// 初期値
const portfolioData = ref({});

const message = ref('');
const errorMessage = ref('');

const user = ref('');

// route
import { useRoute } from 'vue-router';
const route = useRoute();
console.log(route.params.portfolioID);

// firebase
import { getCurrentUser } from '@/firebase/auth';
import { getTwoLevelData } from '@/firebase/firestore';

// utils
import { formatDate } from '@/utils/formatDate';

onMounted(async () => {
  try {
    user.value = await getCurrentUser(); // user情報

    const profileDoc = await getTwoLevelData(user.value.uid, route.params.portfolioID, "portfolios", "portfolio");

    // const formattedDate = await formatDate(profileDoc.date); // 日付変換

    // console.log(profileDoc);
    portfolioData.value = profileDoc;


  } catch (error) {
    errorMessage.value = error;
    console.error('ユーザーデータ取得エラー', error);
  }
});

</script>
