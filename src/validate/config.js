import { setLocale } from 'yup';
import { object, string, mixed } from 'yup';
// import * as yup from 'yup'; // 全て
setLocale({
  mixed: {
    defalut: '不正な値です。',
    required: ({ path }) => `${path}は必須の項目です。`,
  },
  string: {
    email: ({ path }) => `${path}の形式ではありません。`,
    url: ({ path }) => `${path}の形式ではありません。`,
  },
});
export const validationSchema = object({
  name: string()
    .required(),
  phone: string()
    .matches(/[0-9-]+/, '電話番号は9桁以上である必要があります。')
    .min(9, '電話番号は9桁以上である必要があります。')
    .required(),
  email: string()
    .email()
    .required(),
  select: string()
    .required('選択してください。'),
  checkbox: string()
    .oneOf(['1'], 'チェックする必要があります。')
    .required(),
  image: mixed()
    .test('fileType', 'PNGまたはJPG形式の画像をアップロードしてください', (value) => {
    if (!value) return true; // 値がない場合、バリデーションをスキップ
    return (
      value && (value.type === 'image/png' || value.type === 'image/jpeg')
    );
  }),
  website: string().url('有効なURLを入力してください。').nullable(),
});
