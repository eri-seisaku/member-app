<template>
  <div class="ly_top">
    <h1>投稿</h1>
    <div class="ly_top_inner">
      <div v-if="displayList.value">
        <button @click="toCreate">新規作成</button>
      </div>
      <div v-else>
        <button @click="toList">戻る</button>
      </div>

      <div v-if="displayList.value">
        <List></List>
      </div>
      <div v-else>
        <Create></Create>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import List from '../../components/List.vue';
import Create from '../../components/Create.vue';

const displayList = ref(false);
const displayCreate = ref(true);

const toList = () => {
  displayList.value = true
  displayCreate.value = false
};
const toCreate = () => {
  displayList.value = false
  displayCreate.value = true
};

</script>

<style>
.ly_top_inner {
  max-width: 1000px;
  margin: auto;
}
</style>
