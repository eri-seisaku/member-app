<template>
  <h2 class="text-h5">CHECK</h2>
  <p class="mt-8">
    加入申請をされる前に、以下の加入資格を全て満たしているか、必ずご確認下さい。<br>
    下記の3項目の全てにチェックをつけられた方のみ、加入申請が出来ます。
  </p>
  <div v-for="(item, index) in checkboxItems" :key="index">
    <v-checkbox
      v-model="item.value"
      :label="item.label"
    ></v-checkbox>
  </div>
  <v-btn
    type="submit"
    variant="outlined"
    @click="redirectToSignup"
    :disabled="!isAllChecked"
  >
    登録フォームへ
  </v-btn>

</template>

<script setup>
import { reactive, computed } from 'vue';

// router
import { useRouter } from 'vue-router';
const router = useRouter();

const checkboxItems = reactive([
  { label: '税務署に確定申告書を提出している', value: false },
  { label: '確定申告書の職業欄に当協会に加入出来る職業名が記載されている', value: false },
  { label: '業務として制作された作品のプリントコピーを添付出来る', value: false },
]);

const isAllChecked = computed(() => {
  return checkboxItems.every(item => item.value);
});

const redirectToSignup = () => {
  if (isAllChecked.value) {
    router.push({ name: 'SignUp' }); // 保守性がある書き方
    // router.push('/signup');
  }
};

</script>
