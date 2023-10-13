<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <PostForm />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <List />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import PostForm from '@/views/admin/child_post/PostForm.vue';
import List from '@/views/admin/child_post/List.vue';
</script>
