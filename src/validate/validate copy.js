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
  // name: string().required(),
  // officeName: string().required(),

  // // ChatGPT
  // name: string()
  // .transform((originalValue, originalObject) => {
  //   // スペースを半角に統一
  //   return originalValue.replace(/\s+/g, ' ');
  // })
  // .trim() // 文字列の前後の空白を削除
  // .matches(/^.*[ \u3000].*$/, '「姓 名」の形式で入力してください')
  // .required(),

  // Bing Chat
  name: string().matches(/^[^\s]+\s[^\s]+$/, {
    message: '名前は姓と名の間にスペースを1つだけ含む必要があります',
    excludeEmptyString: true,
  }).required(),
};
export const profileSchema = commonSchema;


export const validationSchema = object({
  // name: string().required(),
  // officeName: string().required(),
  // email: string().email().required(),
  ...commonSchema,
  email: string().email().required(),
  // zipCode: string().length(7, '郵便番号はハイフンなしの7桁で入力する必要があります。').required(),
  zipCode: string().matches(/^\d{7}$/, '郵便番号はハイフンなしの7桁で入力する必要があります。').required(),
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
  specialty: string().required('選択してください。'),
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

// profile PasswordDialog用
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

// profile MailDialog用
export const authSchema = object({
  email: string().email().required(),
  password: string().required(),
});

// portfolio用
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


const isValidDate = (value) => {
  const formattedValue = value.replace(/\//g, '-');
  const date = new Date(formattedValue);
  return date instanceof Date && !isNaN(date) && formattedValue === date.toISOString().split('T')[0];
};

const corporationSchema = {
  officeName: string().when('userType', {
    is: (value) => value === '法人',
    then: () => string().required(),
    otherwise: () => string().strip(),
  }),
  officeNameKana: string().when('userType', {
    is: (value) => value === '法人',
    then: () => string()
      .required()
      .matches(/^[\p{Script=Katakana}\s]+$/u, 'カタカナで入力してください'),
    otherwise: () => string()
      .strip(),
  }),
  capital: string().when('userType', {
    is: (value) => value === '法人',
    then: () => string()
      .required()
      .matches(/^[0-9]+$/, '数字のみ入力してください'),
    otherwise: () => string().strip(),
  }),
  // incorporationDate: string().required().matches(/^\d{4}\/\d{2}(\/\d{2})?$/, '半角数字8桁のYYYYMMDD形式でご記入ください。').test('isValidDate', '有効な日付を入力してください', isValidDate),
  incorporationDate: string().when('userType', {
    is: (value) => value === '法人',
    then: () => string()
      .required()
      .matches(/^\d{4}\/\d{2}(\/\d{2})?$/, '半角数字8桁のYYYYMMDD形式でご記入ください。')
      .test('isValidDate', '有効な日付を入力してください', isValidDate),
    otherwise: () => string().strip(),
  }),
};

export const signupValidationSchema = object({
  ...commonSchema,
  ...corporationSchema,
  // nameKana: string()
  //   .transform((originalValue) => {
  //     return originalValue.replace(/\s+/g, ' ');
  //   })
  //   .trim()
  //   .matches(/^.*[ \u3000].*$/, '「セイ メイ」の形式で入力してください')
  //   .matches(/^[\p{Script=Katakana}\s]+$/u, 'カタカナで入力してください')
  //   .required(),
  // nameKana: string()
  //   .matches(/^[^\s]+\s[^\s]+$/, {
  //     message: '名前は姓と名の間にスペースを1つだけ含む必要があります',
  //     excludeEmptyString: true,
  //   })
  //   .matches(/^[\p{Script=Katakana}\s]+$/u, 'カタカナで入力してください')
  //   .required(),
  nameKana: string()
    .matches(/^[^\s]+\s[^\s]+$/, '名前は姓と名の間にスペースを1つだけ含む必要があります')
    .matches(/^[\p{Script=Katakana}\s]+$/u, 'カタカナで入力してください')
    .required(),
  email: string().email().required(),
  userType: string().required(),

  // birthday: string().required().matches(/^\d{4}\/\d{2}(\/\d{2})?$/, '半角数字8桁のYYYYMMDD形式でご記入ください。').test('isValidDate', '有効な日付を入力してください', isValidDate),

  birthday: string().required().matches(/^\d{4}\/\d{2}(\/\d{2})?$/, '半角数字8桁のYYYYMMDD形式でご記入ください。').test('isValidDate', '有効な日付を入力してください', isValidDate),
  zipCode: string().matches(/^\d{7}$/, '郵便番号はハイフンなしの7桁で入力する必要があります。').required(),
  state: string().required(),
  addressLine1: string().required(),
  addressLine2: string(),
  phone: string().matches(/^0\d{9,10}$/, 'ハイフンは入れずに半角数字でご記入ください。').min(9, '電話番号は9桁以上である必要があります.').required(),
  mobile: string().matches(/^0\d{9,10}$/, 'ハイフンは入れずに半角数字でご記入ください。').min(9, '携帯番号は9桁以上である必要があります.'),
  // phone: string()
  //   .matches(/^0\d{9,10}$/, '電話番号は9桁以上である必要があります。')
  //   .min(9, '電話番号は9桁以上である必要があります。')
  //   .required(),
  // mobile: string()
  //   .matches(/^0\d{10,11}$/, '携帯番号は10桁以上である必要があります。')
  //   .min(10, '携帯番号は10桁以上である必要があります。')
  //   .required(),
  fax: string()
    .matches(/^0\d{9,10}$/, 'ハイフンは入れずに半角数字でご記入ください。')
    .min(9, 'FAX番号は9桁以上である必要があります。'),
  password: string()
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        'パスワードには大文字、小文字、数字、特殊文字(@、$、!、%、*、?、&)が含まれている必要があります'
    )
    .min(8, 'パスワードは少なくとも8文字以上である必要があります')
    .max(64, 'パスワードは64文字以下である必要があります')
    .required(),
  website: string().url('有効なURLを入力してください。').nullable(),
  specialty: string().required('選択してください。'),
  industry: string().required(),
  checkbox: string().oneOf(['1'], 'チェックする必要があります。').required(),
});

//
// export const signupValidationSchema = object({
//   ...commonSchema,
//   nameKana: string()
//     .transform((originalValue, originalObject) => {
//       return originalValue.replace(/\s+/g, ' ');
//     })
//     .trim()
//     .matches(/^.*[ \u3000].*$/, '「セイ メイ」の形式で入力してください')
//     .matches(/^[\p{Script=Katakana}\s]+$/u, 'カタカナで入力してください')
//     .required(),
//   email: string().email().required(),
//   userType: string().required('選択してください。'),
//   officeName: string().when('userType', {
//     is: (value) => value === '法人',
//     then: () => string().required('法人の場合は必須項目です。'),
//     otherwise: () => string().strip(),
//   }),
//   officeNameKana: string().when('userType', {
//     is: (value) => value === '法人',
//     then: () => string()
//       .required('法人の場合は必須項目です。')
//       .matches(/^[\p{Script=Katakana}\s]+$/u, 'カタカナで入力してください'),
//     otherwise: () => string()
//       .strip(),
//   }),
//   capital: string().when('userType', {
//     is: (value) => value === '法人',
//     then: () => string()
//       .required('法人の場合は必須項目です。')
//       .matches(/^[0-9]+$/, '数字のみ入力してください'),
//     otherwise: () => string().strip(),
//   }),
//   // incorporationDate: string().required().matches(/^\d{4}\/\d{2}(\/\d{2})?$/, '半角数字8桁のYYYYMMDD形式でご記入ください。').test('isValidDate', '有効な日付を入力してください', isValidDate),
//   incorporationDate: string().when('userType', {
//     is: (value) => value === '法人',
//     then: () => string()
//       .required('法人の場合は必須項目です。')
//       .matches(/^\d{4}\/\d{2}(\/\d{2})?$/, '半角数字8桁のYYYYMMDD形式でご記入ください。')
//       .test('isValidDate', '有効な日付を入力してください', isValidDate),
//     otherwise: () => string().strip(),
//   }),
//   // birthday: string().required().matches(/^\d{4}\/\d{2}(\/\d{2})?$/, '半角数字8桁のYYYYMMDD形式でご記入ください。').test('isValidDate', '有効な日付を入力してください', isValidDate),
//   birthday: string().required().matches(/^\d{4}\/\d{2}(\/\d{2})?$/, '半角数字8桁のYYYYMMDD形式でご記入ください。').test('isValidDate', '有効な日付を入力してください', isValidDate),
//   zipCode: string().matches(/^\d{7}$/, '郵便番号はハイフンなしの7桁で入力する必要があります。').required(),
//   state: string().required(),
//   addressLine1: string().required(),
//   addressLine2: string(),
//   phone: string().matches(/^0\d{9,10}$/, 'ハイフンは入れずに半角数字でご記入ください。').min(9, '電話番号は9桁以上である必要があります.').required(),
//   mobile: string().matches(/^0\d{9,10}$/, 'ハイフンは入れずに半角数字でご記入ください。').min(9, '携帯番号は9桁以上である必要があります.'),
//   // phone: string()
//   //   .matches(/^0\d{9,10}$/, '電話番号は9桁以上である必要があります。')
//   //   .min(9, '電話番号は9桁以上である必要があります。')
//   //   .required(),
//   // mobile: string()
//   //   .matches(/^0\d{10,11}$/, '携帯番号は10桁以上である必要があります。')
//   //   .min(10, '携帯番号は10桁以上である必要があります。')
//   //   .required(),
//   fax: string()
//     .matches(/^0\d{9,10}$/, 'ハイフンは入れずに半角数字でご記入ください。')
//     .min(9, 'FAX番号は9桁以上である必要があります。'),
//   password: string()
//     .matches(
//         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
//         'パスワードには大文字、小文字、数字、特殊文字(@、$、!、%、*、?、&)が含まれている必要があります'
//     )
//     .min(8, 'パスワードは少なくとも8文字以上である必要があります')
//     .max(64, 'パスワードは64文字以下である必要があります')
//     .required(),
//   website: string().url('有効なURLを入力してください。').nullable(),
//   specialty: string().required('選択してください。'),
//   industry: string().required(),
//   checkbox: string().oneOf(['1'], 'チェックする必要があります。').required(),
// });
