<template>
<p>hello</p>
<p>{{ $route.params.portfolioId }}</p>
<pre>{{ portfolioData }}</pre>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const user = ref('');
const portfolioData = ref({});

import { useRoute } from 'vue-router';
const route = useRoute();
console.log(route.params.portfolioId);

// firebase
import { getCurrentUser } from '@/firebase/auth';
import { getTwoLevelData } from '@/firebase/firestore';

// utils
import { formatDate } from '@/utils/formatDate';

onMounted(async () => {
  try {
    user.value = await getCurrentUser(); // user情報

    const profileDoc = await getTwoLevelData(user.value.uid, route.params.portfolioId, "portfolios", "portfolio");

    const formattedDate = await formatDate(profileDoc.date); // 日付変換

    console.log(profileDoc);

    portfolioData.value = profileDoc;

  } catch (error) {
    errorMessage.value = error;
    console.error('ユーザーデータ取得エラー', error);
  }
});
</script>
