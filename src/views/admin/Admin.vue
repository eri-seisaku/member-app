<template>
  <v-container class="fill-height" fluid>
    <v-row>
      <v-col cols="6" md="2" v-for="card in cards">
        <HoverCard
          :url="card.url"
          :icon="card.icon"
          :title="card.title"
        ></HoverCard>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12">
        <v-data-table
          :headers="headers"
          :items="items"
          class="px-6 py-4 rounded no-header"
          :height="200"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>LOG</v-toolbar-title>
            </v-toolbar>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
// Components
import HoverCard  from '@/components/cards/HoverCard.vue';

const cards = [
  {
    url: '/admin',
    icon: 'mdi-import',
    title: 'IMPORT'
  },
  {
    url: '/admin',
    icon: 'mdi-account-cog',
    title: 'USER'
  },
  {
    url: '/admin',
    icon: 'mdi-file-document-check-outline',
    title: 'APPROVAL'
  },
  {
    url: '',
    icon: 'mdi-plus-box-outline',
    title: 'EMPTY'
  },
  {
    url: '',
    icon: 'mdi-plus-box-outline',
    title: 'EMPTY'
  },
  {
    url: '',
    icon: 'mdi-plus-box-outline',
    title: 'EMPTY'
  },
];

const headers = ref([
  {
    title: 'DATE',
    align: 'start',
    sortable: false,
    key: 'date',
  },
  { title: 'COMMENT', key: 'comment' },
]);

const items = ref([
  {
    date: '2023/10/07',
    comment: 'データをインポートしました。',
  },
  {
    date: '2023/10/06',
    comment: 'ポートフォリオが申請されました。',
  },
  {
    date: '2023/10/07',
    comment: 'データをエクスポートしました。',
  },
  {
    date: '2023/10/07',
    comment: 'データをインポートしました。',
  },
  {
    date: '2023/10/06',
    comment: 'ポートフォリオが申請されました。',
  },
  {
    date: '2023/10/07',
    comment: 'データをエクスポートしました。',
  },
]);

</script>

<style>
/* v2のhide-default-headerとhide-default-footerが使えない為自力で */
.v-data-table-footer {
  display: none;
}

div.no-header thead {
  display: none;
}

/* scrollbarの左側に余白 */
div.no-header table {
  padding: 0 10px;
}
</style>
