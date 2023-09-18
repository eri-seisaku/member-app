<template>
  <!-- <v-container class="fill-height" fluid> -->
  <v-container class="mx-auto d-flex align-center justify-center">
    <v-row>
      <v-col cols="12">

        <h2 class="text-h5">
          加入資格の確認について
        </h2>
        <p class="mt-8">
          加入申請をされる前に、以下の加入資格を全て満たしているか、必ずご確認下さい。<br>
          下記の3項目の全てにチェックをつけられた方のみ、加入申請が出来ます。
        </p>
        <div v-for="(item, index) in checkboxItems" :key="index">
          <v-checkbox
            v-model="item.value"
            :label="item.label"
          ></v-checkbox>
        </div>
        <v-btn
          class="mr-4"
          type="submit"
          variant="outlined"
          :href="isAllChecked ? '/signup' : null"
          :disabled="!isAllChecked"
        >
          登録フォームへ
        </v-btn>

      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { reactive, computed } from 'vue';

const checkboxItems = reactive([
  { label: '質問1: ○○○○○○○○○○○○○○', value: false },
  { label: '質問2: ○○○○○○○○○○○○○○', value: false },
  { label: '質問3: ○○○○○○○○○○○○○○', value: false },
]);

const isAllChecked = computed(() => {
  return checkboxItems.every(item => item.value);
});
</script>
