<template>
  <view class="me-container">
    <view class="me-infor">
      <image src="/static/logo.png" mode="aspectFill" class="avatar" />
      <view class="login-btn">登录 / 注册</view>
    </view>
    <view class="me-wrapper">
      <view class="me-wrapper__title">
        <view>订单中心</view>
        <view class="title-action">全部</view>
      </view>
      <view class="me-wrapper__menu">
        <view v-for="item in orderMenus" :key="item.code" class="me-wrapper__menu-item">
          <image :src="`/static/icon/order_${item.code}.png`" mode="aspectFill" class="menu-icon" />
          <view class="menu-name">{{ item.name }}</view>
        </view>
      </view>
    </view>
    <view class="me-wrapper">
      <view class="me-wrapper__title">基础服务</view>
      <view class="me-wrapper__menu">
        <view v-for="item in serverMenus" :key="item.code" class="me-wrapper__menu-item">
          <image :src="`/static/icon/serve_${item.code}.png`" mode="aspectFill" class="menu-icon" />
          <view class="menu-name">{{ item.name }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useAclStore } from '@/store/acl';

const aclStore = useAclStore();
const orderMenus = computed<OrderType[]>(() => aclStore.orderMenus.filter((item) => item.code !== 'all'));
const serverMenus = [
  { name: '收货地址', code: 'address' },
  { name: '设置', code: 'setting' },
];
</script>

<style lang="scss" scoped>
.me-container {
  background-color: #f2f2f2;
  padding: var(--c-padding);

  .me-infor,
  .me-wrapper {
    border-radius: 10rpx;
    padding: var(--c-padding);
    box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
  }

  .me-infor {
    @include flex-column-center;
    background-color: var(--c-color-primary);

    .avatar {
      width: 100rpx;
      height: 100rpx;
      border-radius: 50%;
      margin-bottom: 20rpx;
    }

    .login-btn {
      text-align: center;
      font-size: 24rpx;
      color: white;
      padding: 10rpx 20rpx;
      border-radius: 60rpx;
      border: 1rpx solid white;
    }
  }

  .me-wrapper {
    background-color: white;
    margin-top: 20rpx;

    &__title {
      @include flex-center(space-between);
      font-size: 32rpx;
      font-weight: bold;
      padding-bottom: 20rpx;
      border-bottom: 1rpx solid #eee;

      .title-action {
        float: right;
        font-size: 24rpx;
        color: #929292;
      }
    }

    &__menu {
      @include grid(4, 20rpx);
      margin-top: 20rpx;

      &-item {
        text-align: center;
        font-size: 24rpx;
        color: #666;
        padding: 10rpx 0;

        .menu-icon {
          width: 60rpx;
          height: 60rpx;
        }
      }
    }
  }
}
</style>
