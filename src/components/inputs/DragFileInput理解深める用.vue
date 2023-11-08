<template>
  <div>
    <!-- File upload -->
    <div
      @dragenter="dragover = true"
      @dragover.prevent
      @dragleave="dragover = false"
      @drop.prevent="dropFile"
      :class="{enter: dragover}"
      class="drop_area d-flex flex-column justify-center align-center"
    >
      <!-- 中身 -->
        <v-icon size="60">mdi-cloud-upload</v-icon>
        <p>ここに写真をドラッグ</p>
        <p>{{ errorMessage ? errorMessage : '' }}</p>
        <p>又は</p>
          <v-btn
            color="primary"
            @click="openFileInput"
          >
            ファイルを選択
          </v-btn>
          <!-- 非表示画像選択input -->
          <input
            ref="fileInput"
            class="d-none"
            type="file"
            @change="handleFileInput"
          >
      <!-- /中身 -->
    </div>

    <ul class="d-flex justify-start">
      <li
      v-for="(file, index) in files"
        :key="index"
        class="d-flex flex-column align-center ma-5 hover-action-pointer"
        @click="deleteFile(index)"
      >
        <div style="position: relative;">
          <span class="delete-mark">×</span>
          <v-icon icon="mdi-file-outline" class="text-h3" color="gray" />
        </div>
        <span class="text-caption">{{ file.name }}</span>
      </li>
    </ul>
    <div v-show="files.length">
      <v-btn
      class="mr-4"
      type="submit"
    >
      送信
    </v-btn>
    </div>
    <!-- /File upload -->
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { validationSchema } from '@/validate/validate';
const files = ref([]);
const targetFile = ref([]);

// const uploadedFiles = ref([]);
const dragover = ref(false);
const errorMessage = ref('');

// 子から親へ
const emit = defineEmits([
  'update:filesUploaded', // ファイル情報
  'update:errorMessage' // エラーメッセージ
]);


// 非表示のファイルinputと連動
const fileInput = ref(null);
const openFileInput = () => fileInput.value.click();

const handleFileInput = (e) => {
  targetFile.value = e.target.files;
  if (e.target.files.length > 1) {
    errorMessage.value = "一度にアップロードできるファイルは 1 つだけです。";
    emit('update:errorMessage', errorMessage.value);
  }
  console.log(e.target.files.length); // 1
  errorMessage.value = '';
  const uploadedFile = e.target.files[0];
  console.log(uploadedFile); // 1
  validateImage(uploadedFile);
}

// 共通: ファイルを追加する関数
const addFiles = (files) => {
  if (files.length > 0) {
    errorMessage.value = '';

    validateImage(files);

  } else {
    errorMessage.value = "アップロードするファイルがありません。";
    emit('update:errorMessage', errorMessage.value);
  }
}

// ドロップ時の関数
const dropFile = (e) => {
  console.log(e); // 1
  dragover.value = false; // ドロップが終わると枠線の色が変わる
  console.log(e.dataTransfer.files.length);

  if (e.dataTransfer.files.length > 1) {
    errorMessage.value = "一度にアップロードできるファイルは 1 つだけです。";
    emit('update:errorMessage', errorMessage.value);
  } else {
    errorMessage.value = '';
    const uploadedFile = e.dataTransfer.files[0];
    console.log(uploadedFile); // 1
    validateImage(uploadedFile);
  }
};

// バリデーション
const validateImage = (file) => {
  // 画像のバリデーションルールを適用
  const schema = validationSchema.fields.image;
  try {
    schema.validateSync(file);
    // バリデーション成功時
    errorMessage.value = ''; // エラーメッセージをクリア
    // ファイルを追加
    files.value.push(file);
  } catch (error) {
    // バリデーションエラー時
    errorMessage.value = error.message;
    // ファイルを追加しない
  }
};
// ---------------------------------------------
// アップロードした画像を削除
const deleteFile = (index) => {
  files.value.splice(index, 1);
}
</script>

<style>
ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
.drop_area {
  width: 500px;
  height: 200px;
  border: 5px solid gray;
  border-radius: 15px;
}
.enter {
  border: 10px dotted powderblue;
}
.delete-mark {
  color: gray;
  position: absolute;
  top: -14px;
  right: -10px;
  font-size: 20px;
}
.hover-action-pointer {
  cursor: pointer;
}
</style>
