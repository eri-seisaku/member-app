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

const commonSchema = {
  name: string().required(),
  officeName: string().required(),
};


export const profileSchema = commonSchema;

export const validationSchema = object({
  // name: string().required(),
  // officeName: string().required(),
  // email: string().email().required(),
  ...commonSchema,
  email: string().email().required(),
  zipCode: string().length(7, '郵便番号はハイフンなしの7桁で入力する必要があります').required(),
  state: string().required(),
  address: string().required(),
  phone: string()
    .matches(/[0-9-]+/, '電話番号は9桁以上である必要があります。')
    .min(9, '電話番号は9桁以上である必要があります。')
    .required(),
  password: string()
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        'パスワードには大文字、小文字、数字、特殊文字(@、$、!、%、*、?、&)が含まれている必要があります'
    )
    .min(8, 'パスワードは少なくとも8文字以上である必要があります')
    .max(64, 'パスワードは64文字以下である必要があります')
    .required(),
  specialty: string().required('選択してください。'), // selectから変更
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

// profile用
export const passwordSchema = object({
  currentPassword: string().required(),
  newPassword: string()
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        'パスワードには大文字、小文字、数字、特殊文字(@、$、!、%、*、?、&)が含まれている必要があります'
    )
    .min(8, 'パスワードは少なくとも8文字以上である必要があります')
    .max(64, 'パスワードは64文字以下である必要があります')
    .required(),
    confirmPassword: string().required(),
});

// profile用
export const authSchema = object({
  email: string().email().required(),
  password: string().required(),
});

export const portfolioValidationSchema = object({
  title: string().required(),
  comment: string(),
  image: mixed()
    .test('fileType', 'PNGまたはJPG形式の画像をアップロードしてください', (value) => {
    if (!value) return true; // 値がない場合、バリデーションをスキップ
    return (
      value && (value.type === 'image/png' || value.type === 'image/jpeg')
    );
  }),
  website: string().url('有効なURLを入力してください。').nullable(),
});


