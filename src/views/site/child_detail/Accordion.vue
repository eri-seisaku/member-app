<template>
  <v-col cols="12">
    <v-expansion-panels
      variant="accordion"
      color="white"
      class="my-8 custom-accordion"
    >
      <v-expansion-panel>
        <v-expansion-panel-title>TITLE 01</v-expansion-panel-title>
        <v-expansion-panel-text class="pa-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-title>TITLE 02</v-expansion-panel-title>
        <v-expansion-panel-text class="pa-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-title>PORTFOLIO</v-expansion-panel-title>
        <v-expansion-panel-text class="pa-4">
          <v-row>
            <DialogCard />
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-col>
</template>

<script setup>
// components
import DialogCard from '@/views/site/child_detail/DialogCard.vue';

</script>

<style>
/* vuetifyのアコーディオンの見た目を修正 */
.custom-accordion .v-expansion-panel__shadow {
  box-shadow: none;
}
/* プラス */
.custom-accordion .mdi-chevron-down::before {
  content: "\F0415";
}
/* マイナス */
.custom-accordion .mdi-chevron-up::before {
  content: "\F0374";
}
</style>
