<template>
  <v-alert
    class="mx-auto bg-white mb-8 pa-6"
    border="start"
    :border-color="color"
    :text="text"
    max-width="448"
    elevation="1"
  >
  </v-alert>
</template>
<script setup>
const props = defineProps({
  color: String,
  text: String
});

</script>
