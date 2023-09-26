<script setup>
const fetchAddress = async () => {
  try {
    const res = await axios.get(`https://api.zipaddress.net/?zipcode=${zip_code.value.value}`, {adapter: axiosJsonpAdapter});

    if (res.status === 200) {
      // 200 OKの場合、有効なデータが返されたと判断
      zipCodeErrorMessage.value = ''; // エラーメッセージをクリア
      address.value = res.data.address;
    } else {
      // 200 OK以外のステータスコードが返ってきた場合
      zipCodeErrorMessage.value = 'APIからデータを取得できませんでした'; // エラーメッセージを設定
    }
  } catch (error) {
    // エラーが発生した場合
    console.error('郵便番号検索エラー:', error);
    zipCodeErrorMessage.value = '郵便番号検索中にエラーが発生しました'; // エラーメッセージを設定
  }
};
