import { db } from './firebase';
import {
  collection,
  doc,
  setDoc, // 登録(上書き)
  addDoc, // 登録(追加)
  getDoc, // 取得
  getDocs, // 全て取得
  updateDoc // 更新
} from "firebase/firestore";

// 登録(上書き)
export async function saveData(user, fieldName, userData) {
  try {
    const userCollection = collection(db, fieldName);
    const userRef = doc(userCollection, user.uid);
    await setDoc(userRef, userData);
    return userRef;
  } catch (error) {
    console.error("Firestoreへのデータ保存エラーby Firestore:", error);
    throw error; // throw: 呼び出し元に例外処理を投げる
  }
}

// 登録(追加)
export async function addData(user, fieldName, userData) {
  try {
    const userCollection = collection(db, fieldName);
    await addDoc(userCollection, userData);
  } catch (error) {
    console.error("Firestoreへのデータ保存エラーby Firestore:", error);
    throw error; // throw: 呼び出し元に例外処理を投げる
  }
}

// 取得 - プロフィール
export async function getData(userId, fieldName) {
  try {
    const userRef = doc(db, fieldName, userId);
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
export async function updateData(userId, fieldName, updatedData) {
  try {
    const userDocRef = doc(db, fieldName, userId);
    await updateDoc(userDocRef, updatedData);
  } catch (error) {
    console.error("ユーザーデータの更新エラーby Firestore:", error);
    throw error;
  }
}

// 全データ取得
export async function getAllData(collectionName) {
  try {
    const allData = [];
    const querySnapshot = await getDocs(collection(db, collectionName));
    querySnapshot.forEach((doc) => {

      allData.push(doc.data())
    })
    return allData;
  } catch (error) {
    console.error('ユーザーデータ取得エラーby Firestore', error);
    throw error;
  }
}


