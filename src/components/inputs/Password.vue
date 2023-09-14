<template>
  <label class="text-subtitle-1 text-medium-emphasis">
    {{ label }}
  </label>
  <v-text-field
    required
    :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
    :type="visible ? 'text' : 'password'"
    density="compact"
    prepend-inner-icon="mdi-lock-outline"
    variant="outlined"
    @click:append-inner="visible = !visible"
    v-model="parentValue"
  ></v-text-field>
</template>

<script setup>
import { ref, computed } from 'vue';

const visible = ref(false);

// 親から子へ
const props = defineProps({
  label: String,
  inputValue: String
});

// 子→親へ
const emit = defineEmits([
  'update:inputValue'
]);

// 直接v-modelにバインドしないように
const parentValue = computed({
  get: () => props.inputValue,
  set: (val) => emit('update:inputValue', val),
});
</script>
