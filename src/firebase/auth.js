import { auth } from './firebase';
import {
  createUserWithEmailAndPassword, // signup
  signInWithEmailAndPassword, // login
  signOut, // logout
  EmailAuthProvider, // 再認証に必要?
  reauthenticateWithCredential, // 再認証
  updateEmail, // email更新
  updatePassword, // password更新
  sendEmailVerification, // メールアドレス変更後確認メール送信
  sendPasswordResetEmail // パスワードの再設定メール送信
} from "firebase/auth";

// 新規登録処理
export async function signUp(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error) {
    console.error("ユーザー登録エラーby Auth:", error.code, error.message);
    throw error; // throw: 呼び出し元に例外処理を投げる
  }
}

// ログイン中のユーザー情報を取得する関数
export async function getCurrentUser() {
  const user = auth.currentUser;
  return user;
}

// ログイン処理
export async function login(email, password) {
  try {
    // Firebaseのログイン処理
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // ログイン成功後の処理を追加
    return user;
  } catch (error) {
    console.error('ログインエラーby Auth', error);
    throw error; // throw: 呼び出し元に例外処理を投げる
  }
}

// ログアウト処理
export async function logout() {
  try {
    // Firebaseのログアウト処理
    await signOut(auth);
  } catch (error) {
    console.error('ログアウトエラーby Auth', error);
    throw error; // throw: 呼び出し元に例外処理を投げる
  }
}

// メールアドレスを更新する関数
export async function updateEmailByAuth(newEmail) {
  try {
    const user = auth.currentUser;

    if (user) {
      // メールアドレスを更新
      await updateEmail(user, newEmail);

      // 更新したメールアドレスに確認メールを送信
      await sendEmailVerification(user);

    } else {
      throw new Error("ユーザーがログインしていません。by Auth");
    }
  } catch (error) {
    console.error("メールアドレスの更新エラーby Auth:", error);
    throw error;
  }
}

// メールアドレス更新チェック
export async function emailCheck(submitEmail) {
  try {
    const user = auth.currentUser;

    if (user) {
      // メールアドレスを更新
      if (user.email !== submitEmail) {
        throw new Error("再認証が必要");
      }

      // 更新したメールアドレスに確認メールを送信
      await updateEmailByAuth(submitEmail);

    } else {
      throw new Error("ユーザーがログインしていません。by Auth");
    }
  } catch (error) {
    console.error("メールアドレスの更新エラーby Auth:", error);
    throw error;
  }
}

// パスワードを更新する関数
export async function updatePasswordByAuth(currentPassword, newPassword) {
  try {
    const user = auth.currentUser;

    if (user) {
      // ユーザーを再認証する
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      console.log(credential);
      await reauthenticateWithCredential(user, credential);

      // パスワード更新
      await updatePassword(user, newPassword);
    } else {
      throw new Error("ユーザーがログインしていません。");
    }
  } catch (error) {
    console.error("パスワードの更新エラーby Auth:", error);
    throw error;
  }
}

// パスワード再設定
export async function resetPassword(email) {
  try {
    const user = auth.currentUser;

    if (user) {
      await updatePassword(user, newPassword);
    } else {
      throw new Error("ユーザーがログインしていません。");
    }
  } catch (error) {
    console.error("パスワードの更新エラーby Auth:", error);
    throw error;
  }
}


