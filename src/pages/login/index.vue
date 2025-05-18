<template>
  <view class="login-container">
    <view class="login-title">登录</view>
    <c-form v-model="loginForm" :fields="fields" :rules="rules" submitText="登录" @submit="handleLogin" />
  </view>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/user';

const userStore = useUserStore();
const login = (info: any) => userStore.login(info);
const loginForm = ref<any>({});

const fields = [
  {
    label: '用户名',
    prop: 'username',
    type: 'text',
    placeholder: '请输入用户名',
  },
  {
    label: '密码',
    prop: 'password',
    type: 'password',
    placeholder: '请输入密码',
  },
];
const rules = {
  username: {
    rules: [{ required: true, errorMessage: '请输入用户名', trigger: 'blur' }],
  },
  password: {
    rules: [{ required: true, errorMessage: '请输入密码', trigger: 'blur' }],
  },
};

const handleLogin = (values: any) => {
  login(values).then(() => {
    uni.reLaunch({
      url: '/pages/index/index',
    });
  });
};
</script>

<style lang="scss" scoped>
.login-container {
  padding: 50rpx 0;

  .login-title {
    line-height: 3.6;
    font-size: 36rpx;
    font-weight: 600;
    text-align: center;
  }

  .c-form {
    width: 90vw;
    margin: auto;
  }
}
</style>
