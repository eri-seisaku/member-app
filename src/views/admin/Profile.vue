<template>
  <v-container class="fill-height" fluid>
    <v-row no-gutters>
      <v-col cols="12" md="4">
        <EditAvatar />
      </v-col>
      <v-col cols="12" md="8">
        <v-sheet class="pa-6 ma-6" rounded>
          <!-- <EditProfileForm /> -->
          <ProfileForm />
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// components
import EditAvatar from '@/views/admin/child_profile/EditAvatar.vue';
// import EditProfileForm from '@/views/admin/child_profile/EditProfileForm.vue';
import ProfileForm from '@/views/admin/child_profile/ProfileForm.vue'; // 未解決


</script>

