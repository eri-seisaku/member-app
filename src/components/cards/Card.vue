<template>
  <v-card
    class="mx-auto pa-12 pb-8 bg-white"
    :max-width="size"
    elevation="1"
  >
    <slot name="content"></slot>
  </v-card>
</template>

<script setup>
const props = defineProps({
  size: [String, Number]
});
</script>
