<template>
  <form @submit.prevent="submit">
    <v-text-field
      v-model="data.name"
      label="name"
      variant="outlined"
      :error-messages="nameErrorMessage"
    ></v-text-field>
    <v-text-field
      v-model="data.email"
      label="email"
      variant="outlined"
      :error-messages="emailErrorMessage"
    ></v-text-field>

    <v-btn
      class="me-4"
      @click="confirm"
      variant="outlined"
    >
      確認
    </v-btn>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useField, useForm } from 'vee-validate';
import { testValidationSchema } from '@/validate/validate';

const { handleSubmit, values, setValues } = useForm({
  testValidationSchema,
});

const props = defineProps({
  data: Object, // データはオブジェクトとして受け取る
});

const data = ref({
  name: props.data.name,
  email: props.data.email,
});

setValues(data);

const { value: name, errorMessage: nameErrorMessage } = useField('name');
const { value: email, errorMessage: emailErrorMessage } = useField('email');

const emit = defineEmits(['toggle-confirm-mode']);

const confirm = () => {
  // フォームのデータを親コンポーネントに送信
  props.data.name = data.value.name;

  // confirmModeを切り替えるためのイベントを親コンポーネントに通知
  emit('toggle-confirm-mode');
};


</script>
