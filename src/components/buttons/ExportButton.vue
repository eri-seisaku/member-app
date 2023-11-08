<template>
  <download-csv :data="csvData">
    <v-btn variant="outlined">
      <v-icon start icon="mdi-file-export-outline"></v-icon>
      EXPORT
    </v-btn>
  </download-csv>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// 初期値
const csvData = ref([]);
const errorMessage = ref('');

// 子から親へ
const emit = defineEmits([
  'update:errorMessage' // エラーメッセージ
]);

// firebase
import { getOneLevelAllData } from '@/firebase/firestore';

// utils
import { formatDate } from '@/utils/formatDate'; // 日付形式変換

onMounted(async () => {
  try {
    const allDoc = await getOneLevelAllData("members");

    const promises = allDoc.map(async (doc) => {
      const formattedDate = await formatDate(doc.joinDate);
      return {
        role: doc.role,
        memberID: doc.memberID,
        zipCode: doc.zipCode,
        state: doc.state,
        address: doc.address,
        eightArea: doc.eightArea,
        name: doc.name,
        officeName: doc.officeName,
        phone: doc.phone,
        email: doc.email,
        specialty: doc.specialty,
        joinDate: formattedDate,
      };
    });

    // 全てのプロミスを非同期で実行
    csvData.value = await Promise.all(promises);
  } catch (error) {
    errorMessage.value = error;
    emit('update:errorMessage', errorMessage.value); // 子から親へ
    console.error('ユーザーデータ取得エラー', error);
  }
});

</script>
