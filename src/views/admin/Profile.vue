<template>
  <v-container class="fill-height" fluid>
    <v-row no-gutters>
      <v-col cols="12" md="4">
        <EditAvatar />
      </v-col>
      <v-col cols="12" md="8">
        <v-sheet class="pa-6 ma-6" rounded>
          <EditProfileForm />
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// 各コンポーネントをインポート
import EditAvatar from '@/views/admin/profile/EditAvatar.vue';
import EditProfileForm from '@/views/admin/profile/EditProfileForm.vue';

</script>

