<template>
  <v-container class="fill-height" fluid>
    <v-row>
      <v-col>
        <p class="mt-8 mb-8">
          最大5件まで登録可能。<br>
          申請後、事業所より承認され次第、担当者がWEBページに反映させます。<br>
          変更を保存後、最下部の「ポートフォリオを申請する」ボタンを押してください。
        </p>
        <List></List>
        <Create></Create>
        <!-- File upload -->
        <div
          class="drop_area"
          @dragenter="dragEnter"
          @dragleave="dragLeave"
          @dragover.prevent
          @drop.prevent="dropFile"
          :class="{enter: isEnter}"
        >
          ファイルアップロード
          {{ imageError ? imageError : '' }}
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { validationSchema } from '../../validate/validate';

import List from '@/components/List.vue';
import Create from '@/components/Create.vue';


const imageError = ref('');
const files = ref([]);

const isEnter = ref(false);
// ドラッグした時
const dragEnter = () => {
  isEnter.value = true;
}
// 離れた時
const dragLeave = () => {
  isEnter.value = false;
}
// エリアにいる間
const dragOver = () => {
  console.log('dragOver');
}
// ---------------------------------------------
const dropFile = () => {
  const uploadedFile = event.dataTransfer.files[0]; // 1つのファイルのみを考慮しています
  console.log(uploadedFile); // 1

  // ファイルのバリデーションを実行
  validateImage(uploadedFile);
};

const validateImage = (file) => {
  // 画像のバリデーションルールを適用
  const schema = validationSchema.fields.image;
  try {
    schema.validateSync(file);
    // バリデーション成功時
    imageError.value = ''; // エラーメッセージをクリア
    // ファイルを追加
    files.value.push(file);
  } catch (error) {
    // バリデーションエラー時
    imageError.value = error.message;
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
  color: gray;
  font-weight: bold;
  font-size: 1.2em;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 300px;
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
../../validate/validate
