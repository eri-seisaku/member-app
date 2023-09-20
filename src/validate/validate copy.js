import { setLocale } from 'yup';
import { object, string, mixed } from 'yup';
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


// 初期化
const hasNameField = true;
const hasPhoneField = true;
const hasEmailField = true;
const hasSelectField = true;
const hasCheckboxField = true;

export const validationSchema = object({
  name: string()
    .when('$hasNameField', {
      is: true,
      then: string().required(),
    }),
  phone: string()
    .matches(/[0-9-]+/, '電話番号は9桁以上である必要があります。')
    .min(9, '電話番号は9桁以上である必要があります。')
    .when('$hasPhoneField', {
      is: true,
      then: string().required(),
    }),
  email: string()
    .email()
    .when('$hasEmailField', {
      is: true,
      then: string().required(),
    }),
  select: string()
    .when('$hasSelectField', {
      is: true,
      then: string().required(),
    }),
  checkbox: string()
    .oneOf(['1'], 'チェックする必要があります。')
    .when('$hasCheckboxField', {
      is: true,
      then: string().required(),
    }),
  image: mixed()
    .test('fileType', 'PNGまたはJPG形式の画像をアップロードしてください', (value) => {
    if (!value) return true; // 値がない場合、バリデーションをスキップ
    return (
      value && (value.type === 'image/png' || value.type === 'image/jpeg')
    );
  }),
  website: string().url('有効なURLを入力してください。').nullable(),
});
