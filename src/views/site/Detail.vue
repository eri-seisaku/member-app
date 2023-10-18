<template>
  <v-container>
    <v-row align="center">
      <v-col cols="12" md="5" class="d-flex align-center flex-md-row flex-column">
        <v-avatar
          color="grey"
          size="130"
          class="ma-4"
        >
          <v-img
            cover
            src="https://cdn.vuetifyjs.com/images/john.jpg"
          ></v-img>
        </v-avatar>
        <div class="text-center text-md-left">
          <a class="d-block text-grey-lighten-1 custom-hover" href="https://webdeveloper.com">ABC OFFICE</a>
          <h3 class="text-h4 my-2">青森次郎</h3>
          <LinkIcon
            v-for="link in links"
            :link="link.link"
            :icon="link.icon"
          />
        </div>

      </v-col>

      <v-col cols="12" md="7">
        <v-list lines="one">
          <v-list-item
            v-for="list in lists"
            :key="list.title"
            :title="list.title"
            :subtitle="list.value"
          ></v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <v-row>
      <Accordion />
    </v-row>
  </v-container>
</template>

<script setup>

// components
import Accordion from '@/views/site/child_detail/Accordion.vue';
import LinkIcon from '@/components/text/LinkIcon.vue';

const links = [
  {
    link: 'https://twitter.com/home',
    icon: 'mdi-twitter',
  },
  {
    link: 'https://ja-jp.facebook.com/',
    icon: 'mdi-facebook',
  },
  {
    link: 'https://www.instagram.com/',
    icon: 'mdi-instagram',
  },
];

const lists = [
  {
    title: 'SPECIALTY',
    value: 'グラフィックデザイン'
  },
  {
    title: 'INDUSTRY',
    value: 'HP制作,WEBデザイン'
  },
  {
    title: 'JOB',
    value: 'WEBデザイナー,WEBコーディネーター,WEBプロデューサー'
  },
];

</script>

