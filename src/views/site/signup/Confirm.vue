<template>
  <div>
    <v-row
      class="confirm"
      v-for="(item, key) in transformedData"
      :key="key"
    >
      <v-col cols="12" md="3">
        <div>{{ key }}</div>
      </v-col>
      <v-col cols="12" md="9">
        <div>{{ item }}</div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  value: Object, // データはオブジェクトとして受け取る
});
console.log(props.value);

const transformedData = computed(() => {
  const data = props.value;
  const transformed = {};

  // キー名を変更して新しいオブジェクトを生成
  transformed['名前'] = data['name'];
  transformed['事務所名'] = data['office_name'];
  transformed['電話番号'] = data['phone'];
  transformed['メールアドレス'] = data['email'];
  transformed['パスワード'] = data['password'];
  transformed['都道府県'] = data['state'];
  transformed['住所'] = data['address'];
  transformed['カテゴリ'] = data['select'];
  transformed['利用規約'] = data['checkbox'] === '1' ? '同意します' : '';

  return transformed;
});


</script>

<style>
.confirm {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
.confirm:last-of-type {
  margin-bottom: 20px;
}
</style>
