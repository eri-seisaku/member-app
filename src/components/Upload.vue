<template>
  <v-dialog v-model="parentDialog" max-width="450px">
    <v-card
      @drop.prevent="onDrop($event)"
      @dragover.prevent="dragover = true"
      @dragenter.prevent="dragover = true"
      @dragleave.prevent="dragover = false"
      :class="{ 'grey lighten-2': dragover }"
    >
      <v-card-text>
        <v-row class="d-flex flex-column" dense align="center" justify="center">
          <!-- ドラッグエリア -->
          <v-icon :class="[dragover ? 'mt-2, mb-6' : 'mt-5']" size="60">mdi-cloud-upload</v-icon>
          <p>ファイルをここにドロップするか、クリックして選択します。</p>
          <!-- ファイル選択ボタン -->
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
          <!-- /ドラッグエリア -->
        </v-row>

        <!-- Scrollエリア -->
        <v-virtual-scroll
          v-if="uploadedFiles.length > 0"
          :items="uploadedFiles"
          height="150"
          item-height="50"
        >
          <template v-slot:default="{ item }">
            <v-list-item :key="item.name">
              <v-list-item-title>
                {{ item.name }}
                <span class="ml-3 text-disabled">
                  {{ item.size }} バイト</span
                >
              </v-list-item-title>
              <template v-slot:append>
                <v-btn @click.stop="removeFile(item.name)" icon
                variant="text">
                  <v-icon> mdi-close-circle </v-icon>
                </v-btn>
              </template>
            </v-list-item>

            <v-divider></v-divider>
          </template>
        </v-virtual-scroll>
        <!-- /Scrollエリア -->
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn @click="closeDialog" icon>
          <v-icon id="close-button">mdi-close</v-icon>
        </v-btn>

        <v-btn @click.stop="submit" icon>
          <v-icon id="upload-button">mdi-upload</v-icon>
        </v-btn>
      </v-card-actions>
      <v-card-text>
        <!-- エラーメッセージを表示する要素 -->
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { ref, computed } from 'vue'

// 親→子へ
const props = defineProps({
  dialog: Boolean,
  multiple: Boolean,
});

// 子→親へ
const emit = defineEmits([
  'update:dialog', // ダイアログの開閉
  'update:filesUploaded', // ファイル情報
  'update:errorMessage' // エラーメッセージ
]);

// 直接v-modelにバインドしないように
const parentDialog = computed({
  get: () => props.dialog,
  set: (val) => emit('update:dialog', val),
});

// 子→親へ
const closeDialog = () => emit('update:dialog', false);

// 初期化
const dragover = ref(false);
const uploadedFiles = ref([]);
const errorMessage = ref('');

// ドロップ時の関数
const onDrop = (e) => {
  dragover.value = false;

  if (!props.multiple && e.dataTransfer.files.length > 1) {
    errorMessage.value = "一度にアップロードできるファイルは 1 つだけです。";
    emit('update:errorMessage', errorMessage.value); // 子→親へ

  } else {
    errorMessage.value = '';
    const fileInfo = Array.from(e.dataTransfer.files);
    fileInfo.forEach(element =>
      uploadedFiles.value.push(element)
    );
  }
}


// ファイルを削除する関数 findIndex見つからなかったら-1を返す
const removeFile = (fileName) => {
  const index = uploadedFiles.value.findIndex(
    file => file.name === fileName
  );

  if (index > -1) uploadedFiles.value.splice(index, 1);
}

const submit = () => {
  if (uploadedFiles.value.length > 0) {
    errorMessage.value = '';
    emit('update:filesUploaded', uploadedFiles.value); // 子→親へ
    closeDialog();
  } else {
    errorMessage.value = "アップロードするファイルがありません。";
    emit('update:errorMessage', errorMessage.value); // 子→親へ
  }
}

// 初期化
const fileInput = ref(null);
// 非表示のファイルinputと連動
const openFileInput = () => fileInput.value.click();

const handleFileInput = (event) => {
  // ファイルが選択されたときの処理
  const files = event.target.files;
  if (files.length > 0) {
    errorMessage.value = '';
    for (let i = 0; i < files.length; i++) {
      uploadedFiles.value.push(files[i]);
    }
  } else {
    errorMessage.value = "アップロードするファイルがありません。";
    emit('update:errorMessage', errorMessage.value); // 子→親へ
  }
}
</script>
