import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    userProfile: null,
  }),
  actions: {
    login(userProfile) {
      this.isAuthenticated = true;
      this.userProfile = userProfile;
    },
    logout() {
      this.isAuthenticated = false;
      this.userProfile = null;
    },
  },
});
