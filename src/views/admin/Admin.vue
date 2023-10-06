<template>
  <v-container>
    <v-row>
      <v-col cols="6" md="2" v-for="card in cards">
        <HoverLinkCard
          :url="card.url"
          :icon="card.icon"
          :title="card.title"
        ></HoverLinkCard>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-card variant="flat">
          <!-- title -->
          <v-toolbar color="grey-lighten-3">
              <v-toolbar-title>NEWS</v-toolbar-title>
          </v-toolbar>
          <v-list lines="one" max-height="200">
            <v-list-item
              v-for="n in 9"
              :key="n"
              :title="'Item ' + n"
              subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit"
            ></v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card variant="flat">
          <!-- title -->
          <v-toolbar color="grey-lighten-3">
              <v-toolbar-title>NEWS</v-toolbar-title>
          </v-toolbar>
          <v-list lines="one">
            <v-list-item
              v-for="n in 3"
              :key="n"
              :title="'Item ' + n"
              subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit"
            ></v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// Components
import HoverLinkCard from '@/components/cards/HoverLinkCard.vue';

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
</script>


