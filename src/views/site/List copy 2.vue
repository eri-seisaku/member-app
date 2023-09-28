<template>
  <h2 class="text-h5">加入リスト</h2>
  <v-data-table
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="members"
    item-value="name"
    class="my-table"
    :loading="loadingMembers"
  >
    <template #item.url="{ item }">
      <a :href="item.url">詳細</a>
    </template>
  </v-data-table>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAllData } from '@/firebase/firestore';

const members = ref([]);
const loadingMembers = ref(true);

onMounted(async () => {
  try {
    // Firestoreからユーザーの情報を取得し、userDataにセット
    const allDoc = await getAllData("members");

    console.log(allDoc); // デバック

    // allDocからmembersにデータを追加
    allDoc.forEach(doc => {

      const timestamp = doc.join_data;
      const date = timestamp.toDate();
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // +1は月は0から始まるため+1する, 2は月の前に0をつけるかどうか
      const day = date.getDate().toString().padStart(2, '0');
      const formattedDate = `${year}年${month}月${day}日`;
      console.log(formattedDate);

      // uid.value.push({uid: doc.member_id});
      // console.log(uid.value[0].uid);

      members.value.push({
        url: `/members/${doc.member_id}`,
        office_name: doc.office_name,
        name: doc.name,
        eight_area: doc.eight_area,
        state: doc.state,
        join_data: formattedDate,
        specialty: doc.specialty,
      });
    });
    loadingMembers.value = false;

  } catch (error) {
    console.error('ユーザーデータ取得エラー', error);
    loadingMembers.value = false;
  }
});

const itemsPerPage = 5;

const headers = [
  {
    title: '事業所名',
    align: 'start',
    sortable: false, // ソート
    key: 'office_name',
  },
  { title: '代表者名', align: 'end', key: 'name' },
  { title: '地方', align: 'end', key: 'eight_area' },
  { title: '都道府県', align: 'end', key: 'state' },
  { title: '入会年月日', align: 'end', key: 'join_data' },
  { title: '専門デザイン分野', align: 'end', key: 'specialty' },
  { title: 'URL', align: 'end', key: 'url' },
];

</script>
