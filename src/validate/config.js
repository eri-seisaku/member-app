import { setLocale } from 'yup';
import { object, string } from 'yup';
// import * as yup from 'yup'; // 全て
setLocale({
  mixed: {
    defalut: '不正な値です。',
    required: ({ path }) => `${path}は必須の項目です。`,
  },
  // string: {
  //   email: ({ path }) => `${path}の形式ではありません。`,
  // },
});
export const validationSchema = object({
  name: string().required(),
  phone: string().matches(/[0-9-]+/, '電話番号は9桁以上である必要があります。').min(9).required(),
  email: string().email('メールアドレスの形式ではありません。').required(),
  select: string().required('選択してください。'),
  checkbox: string().oneOf(['1'], 'チェックする必要があります。').required(),
});