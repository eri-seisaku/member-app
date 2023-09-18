<template>
  <div class="text-center">
    <v-dialog
      v-model="parentDialog"
      activator="parent"
      :max-width="size"
    >
      <v-card>
        <slot name="toolbarTitle"></slot>
        <v-card-title>
          <slot name="title"></slot>
        </v-card-title>
        <v-card-text>
          <slot name="text"></slot>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <slot name="actions"></slot>
          <v-btn variant="outlined" @click="parentDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { computed } from 'vue';

// 親から子へ
const props = defineProps({
  dialog: Boolean,
  size: [String, Number]
});

// 子→親へ
const emit = defineEmits([
  'update:dialog'
]);

// 直接v-modelにバインドしないように
const parentDialog = computed({
  get: () => props.dialog,
  set: (val) => emit('update:dialog', val),
});

// ダイアログを閉じるメソッド
// const closeDialog = () => {
//   parentDialog.value = false;
// };
</script>

