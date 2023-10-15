<template>
  <h2 class="text-h5">加入リスト</h2>

  <div class="mt-8">
    <EightArea />
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="キーワード"
      variant="outlined"
      single-line
      hide-details
    ></v-text-field>
    <!-- hide-detailsは余白 -->
    <v-data-table
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="members"
      :loading="loadingMembers"
      :search="search"
    >
      <template v-slot:item.url="{ item }">
        <a :href="item.columns.url" class="text-anchor">
          <v-icon> mdi-account-edit </v-icon>
          Portfolio
        </a>

        <!-- {{ item }} -->
        <!-- {{ item.columns.url }} -->
      </template>
    </v-data-table>
  </div>
</template>

<script setup>
// 初期値
import { ref, onMounted } from 'vue';
const members = ref([]);
const search = ref('');
const loadingMembers = ref(true);
const itemsPerPage = 5;
const headers = [
  {
    title: '事業所名',
    align: 'start',
    sortable: false, // ソート
    key: 'officeName',
  },
  { title: '代表者名', align: 'end', key: 'name' },
  { title: '地方', align: 'end', key: 'eightArea' },
  { title: '都道府県', align: 'end', key: 'state' },
  { title: '入会年月日', align: 'end', key: 'joinData' },
  { title: '専門デザイン分野', align: 'end', key: 'specialty' },
  { title: 'URL', align: 'end', key: 'url' },
];

// components
import EightArea from '@/views/site/child_list/EightArea.vue';

// firebase
import { getAllData } from '@/firebase/firestore';

// utils
import { formatDate } from '@/utils/formatDate'; // 日付形式変換
onMounted(async () => {
  try {
    const allDoc = await getAllData("members");

    // members.value = allDoc.map(doc => {

    //   // const timestamp = doc.joinData;
    //   // const date = timestamp.toDate();
    //   // const year = date.getFullYear();
    //   // const month = (date.getMonth() + 1).toString().padStart(2, '0');
    //   // const day = date.getDate().toString().padStart(2, '0');
    //   // const formattedDate = `${year}/${month}/${day}`;

    //   // return {
    //   //   url: `/members/${doc.memberId}`,
    //   //   officeName: doc.officeName,
    //   //   name: doc.name,
    //   //   eightArea: doc.eightArea,
    //   //   state: doc.state,
    //   //   joinData: formattedDate,
    //   //   specialty: doc.specialty,
    //   // };
    // });

    // loadingMembers.value = false;

    // プロミスの配列を作成
    const promises = allDoc.map(async (doc) => {
      const formattedDate = await formatDate(doc.joinData);
      return {
        url: `/members/${doc.memberId}`,
        officeName: doc.officeName,
        name: doc.name,
        eightArea: doc.eightArea,
        state: doc.state,
        joinData: formattedDate,
        specialty: doc.specialty,
      };
    });

    // 全てのプロミスを非同期で実行
    members.value = await Promise.all(promises);
    loadingMembers.value = false;

  } catch (error) {
    console.error('ユーザーデータ取得エラー', error);
    loadingMembers.value = false;
  }
});


</script>
