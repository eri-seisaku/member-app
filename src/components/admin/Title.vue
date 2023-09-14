<template>
  <div class="ma-4">
    <h2 class="text-h4 d-inline pa-4 rounded-lg" :style="titleStyle">
      <v-icon
        end
        :icon="iconName"
      ></v-icon>
      <slot name="title"></slot>
    </h2>
</div>
</template>

<script setup>
const props = defineProps({
  titleColor: String, // タイトルの色
  iconName: String,  // アイコン名
  titleText: String  // タイトルテキスト
});

const titleStyle = {
  color: props.titleColor, // titleColor プロパティを利用したテキスト色
  border: `2px solid ${props.titleColor}` // titleColor プロパティを利用した border スタイル
};
</script>

