<template>
  <v-row no-gutters class="mb-7" v-for="fieldInfo in corporationFields" :key="fieldInfo.key">
    <v-col cols="12" md="3" align-self="center" class="mb-md-5 mb-2">
      <label class="text-subtitle-1 text-medium-emphasis">
        {{ fieldInfo.label }}
        <span class="bg-red-accent-3 rounded text-subtitle-2 pa-1 ml-3">必須</span>
      </label>
    </v-col>
    <v-col cols="12" md="8" class="d-flex align-center">
      <v-text-field
        variant="outlined"
        density="compact"
        persistent-hint
        v-model="fieldInfo.field.value.value"
        :error-messages="fieldInfo.field.errorMessage.value"
        :placeholder="fieldInfo.placeholder"
        :hint="fieldInfo.hint"
        @blur="fieldInfo.key === 'incorporationDate' ? formatDate(fieldInfo.field.value.value, fieldInfo) : null"
      ></v-text-field>
      <template v-if="fieldInfo.key === 'capital'">
        <p class="mb-5 px-4">万円</p>
      </template>
    </v-col>
  </v-row>
</template>

<script setup>
// validation
import { useField } from 'vee-validate';

// text-field 法人
const corporationFields = [
  { key: 'incorporationDate', field: useField('incorporationDate'), label: '設立年月日', placeholder: '19900101', hint: '半角数字でYYYYMMDD形式でご記入ください' },
  { key: 'capital', field: useField('capital'), label: '資本金', placeholder: '1000', hint: '半角数字ででご記入ください' },
];


import { formatDateWithSlash } from '@/utils/formatData';

// 入力された日付に/を入れる
const formatDate = (value, dateField) => {
  if (value && value.length === 8) {
    const formattedDate = formatDateWithSlash(value);
    dateField.field.value.value = formattedDate;
  }
};

</script>
<style>
</style>
