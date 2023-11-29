// import * as yup from 'yup'; // 全て
import { setLocale } from 'yup';
import { object, string, mixed } from 'yup';

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
  // 代表者名
  name: string()
    .matches(/^[^\s]+\s[^\s]+$/, {
      message: '名前は姓と名の間にスペースを1つだけ含む必要があります',
      excludeEmptyString: true,
    })
    .required(),
  // 代表者名(カナ)
  nameKana: string()
    .matches(/^[^\s]+\s[^\s]+$/, '名前は姓と名の間にスペースを1つだけ含む必要があります')
    .matches(/^[\p{Script=Katakana}\s]+$/u, 'カタカナで入力してください')
    .required(),
  // 事務所名
  officeName: string().when('userType', {
    is: (value) => value === '法人',
    then: () => string().required(),
    otherwise: () => string().strip(),
  }),
  // 事務所名(カナ)
  officeNameKana: string()
    .matches(/^[\p{Script=Katakana}\s]+$/u, 'カタカナで入力してください')
    .required(),
  // メールアドレス
  email: string().email().required(),
};

// 日付の確認
const isValidDate = (value) => {
  const formattedValue = value.replace(/\//g, '-');
  const date = new Date(formattedValue);
  return date instanceof Date && !isNaN(date) && formattedValue === date.toISOString().split('T')[0];
};

const corporationSchema = {
  // 資本金
  capital: string().when('userType', {
    is: (value) => value === '法人',
    then: () => string()
      .required()
      .matches(/^[0-9]+$/, '数字のみ入力してください'),
    otherwise: () => string().strip(),
  }),
  // 設立年月日
  incorporationDate: string().when('userType', {
    is: (value) => value === '法人',
    then: () => string()
      .required()
      .matches(/^\d{4}\/\d{2}(\/\d{2})?$/, '半角数字8桁のYYYYMMDD形式でご記入ください。')
      .test('isValidDate', '有効な日付を入力してください', isValidDate),
    otherwise: () => string().strip(),
  }),
};

// SignUp Page
export const validationSchema = object({
  ...commonSchema, // 代表者名,代表者名(カナ),事務所名,事務所名(カナ)
  ...corporationSchema, // 資本金,設立年月日
  // 個人or法人
  userType: string().required(),
  // 生年月日
  birthday: string()
    .matches(/^\d{4}\/\d{2}(\/\d{2})?$/, '半角数字8桁のYYYYMMDD形式でご記入ください。')
    .test('isValidDate', '有効な日付を入力してください', isValidDate)
    .required(),
  // 郵便番号
  zipCode: string()
    .matches(/^\d{7}$/, '郵便番号はハイフンなしの7桁で入力する必要があります。')
    .required(),
  // 都道府県
  state: string().required(),
  // 住所1
  addressLine1: string().required(),
  // 住所2
  addressLine2: string(),
  // 電話番号
  phone: string()
    .matches(/^0\d{9,10}$/, 'ハイフンは入れずに半角数字でご記入ください。')
    .min(9, '電話番号は9桁以上である必要があります.')
    .required(),
  // 携帯番号
  mobile: string().matches(/^0\d{9,10}$/, 'ハイフンは入れずに半角数字でご記入ください。').min(9, '携帯番号は9桁以上である必要があります.'),
  // FAX番号
  fax: string()
    .matches(/^0\d{9,10}$/, 'ハイフンは入れずに半角数字でご記入ください。')
    .min(9, 'FAX番号は9桁以上である必要があります。'),
  // パスワード
  password: string()
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        'パスワードには大文字、小文字、数字、特殊文字(@、$、!、%、*、?、&)が含まれている必要があります'
    )
    .min(8, 'パスワードは少なくとも8文字以上である必要があります')
    .max(64, 'パスワードは64文字以下である必要があります')
    .required(),
  // WEBサイト
  website: string().url('有効なURLを入力してください。').nullable(),
  // 専門分野
  specialty: string().required('選択してください。'),
  // 業種
  industry: string().required(),
  // 利用規約
  checkbox: string().oneOf(['1'], 'チェックする必要があります。').required(),
});

// Profile Page
export const profileSchema = commonSchema;

// Profile Page - PasswordDialog
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

// Profile Page - MailDialog
export const authSchema = object({
  email: string().email().required(),
  password: string().required(),
});

// Portfolio Page
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


// export const validationSchema = object({
//   // name: string().required(),
//   // officeName: string().required(),
//   // email: string().email().required(),
//   ...commonSchema,
//   email: string().email().required(),
//   // zipCode: string().length(7, '郵便番号はハイフンなしの7桁で入力する必要があります。').required(),
//   zipCode: string().matches(/^\d{7}$/, '郵便番号はハイフンなしの7桁で入力する必要があります。').required(),
//   state: string().required(),
//   address: string().required(),
//   phone: string()
//     .matches(/[0-9-]+/, '電話番号は9桁以上である必要があります。')
//     .min(9, '電話番号は9桁以上である必要があります。')
//     .required(),
//   password: string()
//     .matches(
//         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
//         'パスワードには大文字、小文字、数字、特殊文字(@、$、!、%、*、?、&)が含まれている必要があります'
//     )
//     .min(8, 'パスワードは少なくとも8文字以上である必要があります')
//     .max(64, 'パスワードは64文字以下である必要があります')
//     .required(),
//   specialty: string().required('選択してください。'),
//   checkbox: string().oneOf(['1'], 'チェックする必要があります。').required(),
//   image: mixed()
//     .test('fileType', 'PNGまたはJPG形式の画像をアップロードしてください', (value) => {
//     if (!value) return true; // 値がない場合、バリデーションをスキップ
//     return (
//       value && (value.type === 'image/png' || value.type === 'image/jpeg')
//     );
//   }),
//   website: string().url('有効なURLを入力してください。').nullable(),
// });
