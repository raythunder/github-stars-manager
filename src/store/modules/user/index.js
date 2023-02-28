import { defineStore } from 'pinia';
import { login as userLogin, logout as userLogout } from '@/api/user';
import { setToken, clearToken } from '@/utils/auth';
import { removeRouteListener } from '@/utils/route-listener';
import useAppStore from '../app';
import { Octokit } from '@octokit-next/core';
import useDataStore from '../data';
import { getUser } from '@/api/user';

const useUserStore = defineStore('user', {
  state: () => ({
    name: undefined,
    login: '',
    html_url: '',
    avatar_url: '',
    octokit: null,
  }),

  getters: {
    userInfo(state) {
      return { ...state };
    },
  },

  actions: {
    init(token) {
      const octokit = new Octokit({ auth: token });
      this.octokit = octokit;

      const dataStore = useDataStore();
      dataStore.fetchGistData();
    },
    switchRoles() {
      return new Promise((resolve) => {
        this.role = this.role === 'user' ? 'admin' : 'user';
        resolve(this.role);
      });
    },
    // Set user's information
    setInfo(partial) {
      this.$patch(partial);
    },

    // Reset user's information
    resetInfo() {
      this.$reset();
    },

    // Get user's information
    async info() {
      const data = await getUser();
      console.log(
        '%c [ data ]-52',
        'font-size:13px; background:pink; color:#bf2c9f;',
        data
      );
      this.setInfo(data);
    },

    logoutCallBack() {
      const appStore = useAppStore();
      this.resetInfo();
      clearToken();
      removeRouteListener();
      appStore.clearServerMenu();
    },
    // Logout
    async logout() {
      try {
        await userLogout();
      } finally {
        this.logoutCallBack();
      }
    },
  },
});

export default useUserStore;
