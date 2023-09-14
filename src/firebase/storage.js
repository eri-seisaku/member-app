// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
// import { storage } from './firebase';


// // カスタムファイル名を生成
// const timestamp = new Date().getTime();
// const customFileName = `portfolio_${userId}_${articleId}_${timestamp}.jpg`;

// // ファイルを保存するパス
// const filePath = `images/portfolio/${customFileName}`;

// const fileData = /* ここでファイルデータを取得するコードを記述する */;

// const metadata = {
//   contentType: 'image/jpeg', // ファイルのコンテンツタイプ
// };


// export async function uploadImageToStorage(file, fileName) {
//   const imageRef = ref(storage, fileName);
//   const metadata = {
//     contentType: file.type,
//   };

//   try {
//     const snapshot = await uploadBytesResumable(imageRef, file, metadata);
//     return snapshot.ref.getDownloadURL(); // アップロード成功時にダウンロードURLを返す
//   } catch (error) {
//     console.error('Upload failed', error);
//     throw error; // エラーを呼び出し元に投げる
//   }
// }

