export const useUserStore = defineStore('user', {
  state: (): UserStore => ({
    token: '',
    username: '', // 用户名
    usercode: '', // 用户编码
  }),
  getters: {
    getToken(): string {
      return this.token;
    },
  },
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    async login(info: any) {
      this.username = info.username;
      this.usercode = info.usercode;
      this.setToken(info.token);
    },
  },
});
