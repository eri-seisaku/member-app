import { setLocale } from 'yup';
import { object, string, mixed } from 'yup';
// import * as yup from 'yup'; // 全て
setLocale({
  mixed: {
    default: '不正な値です。',
    required: '必須の項目です。',
  },
  string: {
    email: ({ path }) => `${path}の形式ではありません。`,
    url: ({ path }) => `${path}の形式ではありません。`,
  },
});
export const validationSchema = object({
  name: string().required(),
  office_name: string().required(),
  zip_code: string().length(7, '郵便番号はハイフンなしの7桁で入力する必要があります').required(),
  state: string().required(),
  address: string().required(),
  phone: string()
    .matches(/[0-9-]+/, '電話番号は9桁以上である必要があります。')
    .min(9, '電話番号は9桁以上である必要があります。')
    .required(),
  email: string().email().required(),
  password: string()
    // .matches(
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    //     'パスワードには大文字、小文字、数字、特殊文字が含まれている必要があります'
    // )
    .min(8, 'パスワードは少なくとも8文字以上である必要があります')
    .max(64, 'パスワードは64文字以下である必要があります')
    .required(),
  select: string().required('選択してください。'),
  checkbox: string().oneOf(['1'], 'チェックする必要があります。').required(),
  image: mixed()
    .test('fileType', 'PNGまたはJPG形式の画像をアップロードしてください', (value) => {
    if (!value) return true; // 値がない場合、バリデーションをスキップ
    return (
      value && (value.type === 'image/png' || value.type === 'image/jpeg')
    );
  }),
  website: string().url('有効なURLを入力してください。').nullable(),
});

export const testValidationSchema = object({
  name: string().required(),
  email: string().email().required(),
});

