<template>
  <h2>リスト</h2>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row>
      <v-row>
        <v-col cols="3" v-for="article in articles" :key="article.id">
          <v-card>
            <v-img
              :src="article.filePath"
              max-height="125"
              cover
              class="bg-grey-lighten-2"
            ></v-img>
            <v-card-title class="text-h6">
              {{ article.title }}
            </v-card-title>
            <v-card-text class="text-h6">
              {{ article.memo }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getAllData } from '@/firebase/firestore'

const articles = ref([]);

onMounted(async () => {
  try {
    const data = await getAllData('articles'); // Replace 'articles' with your collection name
    articles.value = data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
</script>


<style>

.ly_article {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  max-width: 200px;
  margin: auto;
}
.ly_article_inner {
  flex: 0 0 250px;
  padding: 20px;
  margin: 5px;
  background-color: rgb(197, 197, 243);
}

.bl_article {
  text-align: center;
}
</style>
