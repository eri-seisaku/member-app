import { setLocale } from 'yup';
import { object, string, mixed } from 'yup';
import { ref, computed, watch } from 'vue';
// import * as yup from 'yup'; // 全て

setLocale({
  mixed: {
    default: '不正な値です。',
    required: ({ path }) => `${path}は必須の項目です。`,
  },
  string: {
    email: ({ path }) => `${path}の形式ではありません。`,
    url: ({ path }) => `${path}の形式ではありません。`,
  },
});

export const hasFields = {
  name: ref(true),
  email: ref(true),
};

export const validationSchema = computed(() => {

  const schema = {};

  if (hasFields.name.value) {
    schema.name = string().required('必須です');
  } else {
    schema.name = string(); // もし必須でない場合は単なる文字列型のフィールド
  }

  if (hasFields.email.value) {
    schema.email = string().email().required();
  } else {
    schema.email = string(); // もし必須でない場合は単なる文字列型のフィールド
  }

  return object(schema);
});

// 各プロパティを個別に監視し、変更時に validationSchema を再評価
watch(() => hasFields.name, () => {
  validationSchema.value;
});

watch(() => hasFields.email, () => {
  validationSchema.value;
});
