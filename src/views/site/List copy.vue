<template>
  <h2 class="text-h5">加入リスト</h2>
  <v-data-table
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="desserts"
    item-value="name"
    class="my-table"
></v-data-table>
</template>

<script setup>
const itemsPerPage = 5;
const headers = [
  {
    title: '事業所名',
    align: 'start',
    sortable: false, // ソート
    key: 'officeName',
  },
  { title: '代表者名', align: 'end', key: 'name' },
  { title: '地方', align: 'end', key: 'area' },
  { title: '都道府県', align: 'end', key: 'state' },
  { title: '入会年月日', align: 'end', key: 'joinData' },
  { title: '専門デザイン分野', align: 'end', key: 'specialty' },
];

const desserts = [
  {
    officeName: 'デジタル会社',
    name: '苗字 名前',
    area: '関西エリア',
    state: '奈良県',
    joinData: '2023年9月14日',
    specialty: 'Webデザイン',
  },
  {
    officeName: 'イラスト会社',
    name: 'ななし 太郎',
    area: '関西エリア',
    state: '奈良県',
    joinData: '2023年9月15日',
    specialty: 'DTPデザイン',
  },
];
</script>
