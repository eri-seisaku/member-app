import { defineStore } from 'pinia';
// import { ref, computed } from 'vue';

export const useUploadStore = defineStore('upload', {
  state: () => ({
    errorMessage: '',
  }),
  actions: {
    setErrorMessage(message) {
      this.errorMessage = message;
    },
    // エラーメッセージをクリアするアクション
    clearErrorMessage() {
      this.errorMessage = '';
    },
  },
});

// export const useUploadStore = defineStore('upload', () => {
// 	const errorMessage = ref('');

// 	// エラーメッセージを計算プロパティとして定義
//   const computedErrorMessage = computed(() => {
//     return errorMessage.value;
//   });

//   // エラーメッセージを設定するアクション
//   const setErrorMessage = (message) => {
//     errorMessage.value = message;
//   };

//   // エラーメッセージをクリアするアクション
//   const clearErrorMessage = () => {
//     errorMessage.value = '';
//   };

// 	return {
//     computedErrorMessage,
//     setErrorMessage,
//     clearErrorMessage,
//   };
// });


