import { storage } from '@/firebase/firebase';
import {
  ref,
  getDownloadURL,
  getMetadata, // メタデータ取得
  uploadBytesResumable
} from "firebase/storage";


export async function upload(fileData, userID) {
  try {
    // ファイルの名前を変える
    const fileName = `profile_${userID}`;

    const imageRef = ref(storage, fileName); // Storageの参照を作成

    const metadata = await getMetadata(imageRef); // ファイルのメタデータを取得

    const allowedContentTypes = ['image/jpeg', 'image/png', 'image/gif']; // 許可するコンテンツタイプのリスト

    const snapshot = await uploadBytesResumable(imageRef, fileData, metadata);
    const url = await getDownloadURL(snapshot.ref);

    return url;

  } catch (error) {
    console.error("Storageへのデータ保存エラーby Storage:", error);
    throw error; // throw: 呼び出し元に例外処理を投げる
  }
}
export async function createFirebase(title, fileData) {
  try {
    const metadata = {
      contentType: 'image/jpeg',
    }
    const imageRef = ref(storage, title); // Storageの参照を作成
    // const imageRef = storage.child(title); // これも同じ意味？

    const snapshot = await uploadBytesResumable(imageRef, fileData, metadata);
    const url = await getDownloadURL(snapshot.ref);

    return url;

  } catch (error) {
    console.error("Storageへのデータ保存エラーby Storage:", error);
    throw error; // throw: 呼び出し元に例外処理を投げる
  }
}
// // カスタムファイル名を生成
// const timestamp = new Date().getTime();
// const customFileName = `portfolio_${userID}_${articleID}_${timestamp}.jpg`;

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

