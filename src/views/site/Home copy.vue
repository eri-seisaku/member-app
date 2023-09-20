<script>

import { computed } from 'vue';

export const validationSchema = computed(() => {
  const schema = {};

  if ($hasNameField.value) {
    schema.name = string().required();
  } else {
    schema.name = string(); // もし必須でない場合は単なる文字列型のフィールド
  }

  if ($hasEmailField.value) {
    schema.email = string().email().required();
  } else {
    schema.email = string(); // もし必須でない場合は単なる文字列型のフィールド
  }

  return object(schema);
});
