<template>
  <v-container>
    <v-row>
      <v-col cols="12">


        <form @submit.prevent="submit">
          <v-text-field
            v-model="name"
            :error-messages="nameErrorMessage"
            label="Name"
            type="text"
            variant="outlined"
          ></v-text-field>

          <v-text-field
            v-model="phone"
            :error-messages="phoneErrorMessage"
            label="Phone"
            variant="outlined"
          ></v-text-field>

          <v-text-field
            v-model="email"
            :error-messages="emailErrorMessage"
            label="Email"
            variant="outlined"
          ></v-text-field>

          <v-text-field
            v-model="password"
            :error-messages="passwordErrorMessage"
            label="Pass"
            variant="outlined"
          ></v-text-field>

          <!-- <v-select
            v-model="select"
            :items="items"
            :error-messages="selectErrorMessage"
            label="Select"
            variant="outlined"
          ></v-select> -->

          <v-checkbox
            v-model="checkbox"
            :error-messages="checkboxErrorMessage"
            value="1"
            label="利用規約に同意します"
            type="checkbox"
          ></v-checkbox>
          <input @blur="handleBlur" type="text" />
          <v-btn
            class="me-4"
            type="submit"
            variant="outlined"
          >
            送信
          </v-btn>

        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useField, useForm } from 'vee-validate';
import { validationSchema } from '@/validate/validate';

const { handleSubmit, values, setValues } = useForm({
  validationSchema,
});

const dataArray = {
  name: 'name',
  phone: '0120222444',
  email: 'a@mail.com'
}
setValues(dataArray);

const { value: name, errorMessage: nameErrorMessage } = useField('name');

const { value: phone, errorMessage: phoneErrorMessage } = useField('phone');

const { value: email, errorMessage: emailErrorMessage } = useField('email');

const { value: password, errorMessage: passwordErrorMessage } = useField('password');

const select = useField('select');
select.value = undefined;

const { value: checkbox, errorMessage: checkboxErrorMessage } = useField('checkbox');


const submit = handleSubmit(async (values) => {
  try {
    console.log(values);
  } catch (error) {
    // エラーが発生した場合
    console.error("ユーザー登録エラー:", error.code, error.message);
    // エラーメッセージを表示するか、必要な処理を追加する
  }
});

</script>
