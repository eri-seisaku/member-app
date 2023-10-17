<template>
  <v-data-table :headers="headers" :items="desserts" item-key="name" class="elevation-1 pa-6">
    <template v-slot:top>
      <v-container fluid>
        <v-row>
          <v-col cols="4">
            <v-row class="pa-6">
              <!-- Filter for Desert -->
              <v-text-field v-model="dessertFilterValue" type="text" label="Desert Name"></v-text-field>
            </v-row>
          </v-col>

          <v-col cols="4">
            <v-row class="pa-6">
              <!-- Filter for Calories -->
              <v-select
                :items="caloriesList"
                item-title="text"
                item-value="value"
                v-model="caloriesFilterValue"
                label="Calories"
              ></v-select>

            </v-row>
          </v-col>

          <v-col cols="4">
            <v-row class="pa-6">
              <!-- Filter for Fat-->
              <v-text-field v-model="fatFilterValue" type="text" label="Fat"></v-text-field>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-data-table>
</template>

<script setup>
import { ref, computed } from 'vue';


const caloriesList = [
  { text: "All", value: null },
  { text: "Only 237", value: 237 },
  { text: "Only 305", value: 305 },
];

const dessertFilterValue = ref('');
const fatFilterValue = ref('');
const caloriesFilterValue = ref(null);

const headers = computed(() => [
  {
    title: 'Dessert (100g serving)',
    align: 'start',
    sortable: false,
    key: 'name',
    filter: nameFilter,
  },
  {
    title: 'Calories',
    key: 'calories',
    filter: caloriesFilter,
  },
  {
    title: 'Fat (g)',
    key: 'fat',
    filter: fatFilter,
  },
  { title: 'Carbs (g)', key: 'carbs' },
  { title: 'Protein (g)', key: 'protein' },
  { title: 'Iron (%)', key: 'iron' },
]);

const nameFilter = (value) => {
  if (!dessertFilterValue.value) {
    return true;
  }
  return value.toLowerCase().includes(dessertFilterValue.value.toLowerCase());
};

const caloriesFilter = (value) => {
  if (!caloriesFilterValue.value) {
    return true;
  }
  return value === caloriesFilterValue.value;
};

const fatFilter = (value) => {
  if (!fatFilterValue.value) {
    return true;
  }
  return value === parseInt(fatFilterValue.value);
};

console.log(fatFilterValue.value);

const desserts = [
  {
      "name": "Frozen Yogurt",
      "calories": 159,
      "fat": 6.0,
      "carbs": 24,
      "protein": 4.0,
      "iron": "1%"
    },
    {
      "name": "Ice cream sandwich",
      "calories": 237,
      "fat": 9.0,
      "carbs": 37,
      "protein": 4.3,
      "iron": "1%"
    },
    {
      "name": "Eclair",
      "calories": 262,
      "fat": 16.0,
      "carbs": 23,
      "protein": 6.0,
      "iron": "7%"
    },
    {
      "name": "Cupcake",
      "calories": 305,
      "fat": 3.7,
      "carbs": 67,
      "protein": 4.3,
      "iron": "8%"
    },
    {
      "name": "Gingerbread",
      "calories": 356,
      "fat": 16.0,
      "carbs": 49,
      "protein": 3.9,
      "iron": "16%"
    },
    {
      "name": "Jelly bean",
      "calories": 375,
      "fat": 0.0,
      "carbs": 94,
      "protein": 0.0,
      "iron": "0%"
    },
    {
      "name": "Lollipop",
      "calories": 392,
      "fat": 0.2,
      "carbs": 98,
      "protein": 0,
      "iron": "2%"
    },
    {
      "name": "Honeycomb",
      "calories": 408,
      "fat": 3.2,
      "carbs": 87,
      "protein": 6.5,
      "iron": "45%"
    },
    {
      "name": "Donut",
      "calories": 452,
      "fat": 25.0,
      "carbs": 51,
      "protein": 4.9,
      "iron": "22%"
    },
    {
      "name": "KitKat",
      "calories": 518,
      "fat": 26.0,
      "carbs": 65,
      "protein": 7,
      "iron": "6%"
    }
];
</script>
