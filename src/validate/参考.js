import { ref } from 'vue';
import { useField, useForm } from 'vee-validate';
import * as Yup from 'yup';

// スキーマ1
const schema1 = Yup.object().shape({
  name: Yup.string().required('名前は必須です。'),
  email: Yup.string().email('正しいメールアドレスを入力してください。')
});

// スキーマ2
const schema2 = Yup.object().shape({
  age: Yup.number().required('年齢は必須です。'),
  country: Yup.string().required('国名は必須です。')
});

export default {
  setup() {
    const { handleSubmit } = useForm();
    const { value: name, errorMessage: nameError } = useField('name', schema1);
    const { value: email, errorMessage: emailError } = useField('email', schema1);
    const { value: age, errorMessage: ageError } = useField('age', schema2);
    const { value: country, errorMessage: countryError } = useField('country', schema2);

    const submitForm = handleSubmit(async (values) => {
      // フォームの送信処理をここに書く
    });

    return {
      name,
      email,
      nameError,
      emailError,
      age,
      country,
      ageError,
      countryError,
      submitForm
    };
  }
};
