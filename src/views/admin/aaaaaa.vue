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
        <v-card variant="flat">
          <!--  -->
          <v-data-table
            :headers="headers"
            :items="desserts"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>NEWS</v-toolbar-title>
              </v-toolbar>
            </template>
            <template v-slot:item.calories="{ item }">
              <!-- {{ item }} -->
              <v-chip :color="getColor(item.columns.calories)">
                {{ item.columns.calories }}
              </v-chip>
            </template>
          </v-data-table>
          <!--  -->
        </v-card>
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
    title: 'Dessert (100g serving)',
    align: 'start',
    sortable: false,
    key: 'name',
  },
  { title: 'Calories', key: 'calories' },
  { title: 'Fat (g)', key: 'fat' },
  { title: 'Carbs (g)', key: 'carbs' },
  { title: 'Protein (g)', key: 'protein' },
  { title: 'Iron (%)', key: 'iron' },
]);
const desserts = ref([
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    iron: '45%',
  },
  {
    name: 'Donut',
    calories: 199,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    iron: '22%',
  },
  {
    name: 'KitKat',
    calories: 201,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    iron: '6%',
  },
]);

const getColor = (calories) => {
  console.log(calories);
  if (calories > 400) return 'red'
  else if (calories > 200) return 'orange'
  else return 'green'
};

</script>


