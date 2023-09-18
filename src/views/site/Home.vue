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
      <List></List>
      <Create></Create>
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

//
// import { onMounted } from 'vue'
// import { getAllData } from '@/firebase/firestore'

// const articles = ref([]); // Initialize with an empty array

// onMounted(async () => {
//   try {
//     const data = await getAllData('articles'); // Replace 'articles' with your collection name
//     articles.value = data;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// });
</script>

<style>
.ly_top_inner {
  max-width: 1000px;
  margin: auto;
}
</style>
