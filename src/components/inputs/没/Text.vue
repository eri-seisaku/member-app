<template>
  <label class="text-subtitle-1 text-medium-emphasis">
    {{ label }}
  </label>
  <v-text-field
    density="compact"
    variant="outlined"
    :form="form"
    :type="type"
    :required="required"
    :disabled="disabled"
    v-model="parentValue"
  ></v-text-field>
</template>

<script setup>
import { computed } from 'vue';

// 親から子へ
const props = defineProps({
  label: String,
  form: String,
  type: String,
  required: Boolean,
  disabled: Boolean,
  inputValue: String
});

// 子から親へ
const emit = defineEmits([
  'update:inputValue'
]);

// 直接v-modelにバインドしないように
const parentValue = computed({
  get: () => props.inputValue,
  set: (val) => emit('update:inputValue', val),
});
</script>
