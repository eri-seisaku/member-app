import { db } from '@/firebase/firebase';
import {
  collection,
  doc,
  setDoc, // 登録(上書き)
  addDoc, // 登録(追加)
  getDoc, // 取得
  getDocs, // 全て取得
  updateDoc // 更新
} from "firebase/firestore";

// 新規登録(上書き)
export async function setData(userID, fieldName, userData) {
  try {
    const userCollection = collection(db, fieldName);
    const userRef = doc(userCollection, userID);
    await setDoc(userRef, userData);
    return userRef;
  } catch (error) {
    console.error("Firestoreへのデータ保存エラーby Firestore:", error);
    throw error; // throw: 呼び出し元に例外処理を投げる
  }
}

// 追加登録 userDataは連想配列を期待している
export async function addData(fieldName, userData) {
  try {
    const userCollection = collection(db, fieldName);
    await addDoc(userCollection, userData);
  } catch (error) {
    console.error("Firestoreへのデータ保存エラーby Firestore:", error);
    throw error;
  }
}

// 開発中 -------------------------------
export async function addArticle(userID, articleData) {
  try {
    const userDocRef = doc(db, "articles", userID); // ユーザーのドキュメントへの参照を取得
    const postCollectionRef = collection(userDocRef, "posts"); // "posts" サブコレクションへの参照を取得

    // 新しい投稿を自動生成IDで追加
    const newPostDocRef = await addDoc(postCollectionRef, articleData);

    // newPostDocRef.id を使用して新しく生成されたドキュメントのIDにアクセスできます
  } catch (error) {
    console.error("Firestoreへのデータ保存エラー:", error);
    throw error;
  }
}

// ユーザーの特定の記事を取得
export async function getArticle(userID, postID) {
  try {
    const userDocRef = doc(db, "articles", userID); // ユーザーのドキュメントへの参照を取得
    const postCollectionRef = collection(userDocRef, "posts"); // "posts" サブコレクションへの参照を取得

    const postDocRef = doc(postCollectionRef, postID); // 記事のドキュメントへの参照を取得
    const postDoc = await getDoc(postDocRef);

    if (postDoc.exists()) {
      return postDoc.data();
    } else {
      throw new Error("記事データが見つかりません");
    }
  } catch (error) {
    console.error("記事データ取得エラー:", error);
    throw error;
  }
}

// ユーザーの全ての記事を取得
export async function getAllArticles(userID) {
  try {
    const userDocRef = doc(db, "articles", userID); // ユーザーのドキュメントへの参照を取得
    const postCollectionRef = collection(userDocRef, "posts"); // "posts" サブコレクションへの参照を取得

    const querySnapshot = await getDocs(postCollectionRef);
    const articles = [];

    querySnapshot.forEach((doc) => {
      articles.push(doc.data());
    });

    return articles;
  } catch (error) {
    console.error("記事データ取得エラー:", error);
    throw error;
  }
}

// 1階層の全データ取得(コレクション名-ドキュメント名-フィールド)
export async function getOneLevelAllData(collectionName) {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const allData = [];

    querySnapshot.forEach((doc) => {
      allData.push(doc.data())
    });

    return allData;
  } catch (error) {
    console.error('データ取得エラーby Firestore:', error);
    throw error;
  }
}

// 2階層の全データ取得(コレクション名-ドキュメント名-コレクション名-ドキュメント名-フィールド)
export async function getTwoLevelAllData(userID, firstCollectionName, secondCollectionName) {
  try {
    const userDocRef = doc(db, firstCollectionName, userID);
    const postCollectionRef = collection(userDocRef, secondCollectionName);

    const querySnapshot = await getDocs(postCollectionRef);
    const allData = [];

    querySnapshot.forEach((doc) => {
      allData.push(doc.data());
    });

    return allData;
  } catch (error) {
    console.error('データ取得エラーby Firestore:', error);
    throw error;
  }
}



// ここまで --------------------------------------
// 取得 - プロフィール
export async function getData(userID, fieldName) {
  try {
    const userRef = doc(db, fieldName, userID);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      throw new Error("ユーザーデータが見つかりません");
    }
  } catch (error) {
    console.error('ユーザーデータ取得エラーby Firestore', error);
    throw error;
  }
}

// 更新
export async function updateData(userID, fieldName, updatedData) {
  try {
    const userDocRef = doc(db, fieldName, userID);
    await updateDoc(userDocRef, updatedData);
  } catch (error) {
    console.error("ユーザーデータの更新エラーby Firestore:", error);
    throw error;
  }
}

// // ユーザーデータ全取得
// export async function getAllUsers(collectionName) {
//   try {
//     const allData = [];
//     const querySnapshot = await getDocs(collection(db, collectionName));
//     querySnapshot.forEach((doc) => {

//       allData.push(doc.data())
//     })
//     return allData;
//   } catch (error) {
//     console.error('ユーザーデータ取得エラーby Firestore', error);
//     throw error;
//   }
// }


