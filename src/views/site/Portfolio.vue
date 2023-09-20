<template>
  <div>
    <h1>Form</h1>
    <form @submit.prevent="submit">
      <v-text-field
        label="name"
        variant="outlined"
        :error-messages="fields.name.errorMessage.value"
        v-model="fields.name.value.value"
      ></v-text-field>
      <v-text-field
        label="email"
        variant="outlined"
        :error-messages="fields.email.errorMessage.value"
        v-model="fields.email.value.value"
      ></v-text-field>
      <v-btn type="submit">送信</v-btn>
      <p>{{ fields.email.value.value }}</p>
      <p>{{ fields.name.value.value }}</p>
    </form>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import { useField, useForm } from 'vee-validate';
import { validationSchema, hasFields } from '@/validate/validate';

hasFields.name.value = true;
hasFields.email.value = true;

const { handleSubmit } = useForm({
  validationSchema,
});

const fields = {
  name: useField('name'),
  email: useField('email'),
};

console.log(validationSchema.value.fields.name.type);


const submit = handleSubmit(async (values) => {
  try {
    console.log('送信');
  } catch (error) {
    console.log('error');
  }
});

onMounted(async () => {
  console.log(fields.email.errorMessage.value);
});
</script>
