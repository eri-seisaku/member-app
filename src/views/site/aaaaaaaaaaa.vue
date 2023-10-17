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
              <v-select :items="caloriesList" v-model="caloriesFilterValue" label="Calories"></v-select>
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


const caloriesList = [
  { text: "All", value: null },
  { text: "Only 237", value: 237 },
  { text: "Only 305", value: 305 },
];

const dessertFilterValue = ref('');
const fatFilterValue = ref('');
const caloriesFilterValue = ref(null);

const desserts = tableData.data;

const headers = computed(() => [
  {
    text: 'Dessert (100g serving)',
    align: 'left',
    sortable: false,
    value: 'name',
    filter: nameFilter,
  },
  {
    text: 'Calories',
    value: 'calories',
    filter: caloriesFilter,
  },
  {
    text: 'Fat (g)',
    value: 'fat',
    filter: fatFilter,
  },
  { text: 'Carbs (g)', value: 'carbs' },
  { text: 'Protein (g)', value: 'protein' },
  { text: 'Iron (%)', value: 'iron' },
]);

function nameFilter(value) {
  if (!dessertFilterValue.value) {
    return true;
  }
  return value.toLowerCase().includes(dessertFilterValue.value.toLowerCase());
}

function caloriesFilter(value) {
  if (!caloriesFilterValue.value) {
    return true;
  }
  return value === caloriesFilterValue.value;
}

function fatFilter(value) {
  if (!fatFilterValue.value) {
    return true;
  }
  return value === parseInt(fatFilterValue.value);
}
</script>
