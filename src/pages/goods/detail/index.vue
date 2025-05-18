<template>
  <view class="goods-container">
    <view class="goods-navigation">
      <uni-icons type="back" size="30" color="#fff" @click="handleBack" />
    </view>
    <view class="goods-swiper-wrapper">
      <swiper class="goods-swiper" autoplay circular @change="handleSwiperChange">
        <swiper-item v-for="src in swiperList" :key="src">
          <image class="goods-swiper-img" :src="src" mode="aspectFill" />
        </swiper-item>
      </swiper>
      <view class="goods-swiper-indicator">{{ swiperCurrent }} / {{ swiperList.length }}</view>
    </view>
    <view class="goods-infor">
      <view class="goods-price">¥{{ (product.price || 0).toFixed(2) }}</view>
      <view class="goods-name">{{ product.name }}</view>
      <view class="goods-desc">已售1234件</view>
    </view>
    <view class="goods-wrapper">
      <view class="goods-wrapper-title">规格</view>
    </view>
    <view class="goods-wrapper">
      <view class="goods-wrapper-title">详情</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { getProductDetail } from '@/api/product';

const swiperList = ref<string[]>([]);
const swiperCurrent = ref<number>(1);
const product = ref<ProductType>({});

const handleBack = () => {
  uni.navigateBack();
};

const handleSwiperChange = (e: any) => {
  swiperCurrent.value = e.detail.current + 1;
};

onLoad(async (options: { id: number | string }) => {
  const { data } = await getProductDetail(options.id);
  swiperList.value = data.images;
  product.value = data;
});
</script>

<style lang="scss" scoped>
.goods-container {
  .goods-navigation {
    position: absolute;
    top: max(var(--window-top), 20rpx);
    left: 20rpx;
    z-index: 10;

    .uni-icons {
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 50%;
      padding: 5rpx;
    }
  }

  .goods-swiper {
    @include position-inset;
    height: auto;

    &-wrapper {
      position: relative;
      padding-top: 100%;
      overflow: hidden;
    }

    &-img {
      width: 100%;
      height: 100%;
    }

    &-indicator {
      position: absolute;
      right: 10rpx;
      bottom: 10rpx;
      padding: 10rpx 20rpx;
      font-size: 24rpx;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 50rpx;
    }
  }

  .goods-infor {
    overflow: hidden;
    padding: var(--c-padding);

    .goods-price {
      float: right;
      font-size: 46rpx;
    }

    .goods-name {
      font-size: 38rpx;
    }

    .goods-desc {
      font-size: 24rpx;
      color: #999;
    }
  }

  .goods-wrapper {
    margin-top: 20rpx;
    border-radius: 10rpx;
    overflow: hidden;

    &-title {
      padding: 20rpx;
      font-size: 32rpx;
      font-weight: bold;
      border-bottom: 1rpx solid #eee;
    }
  }

  .goods-wrapper {
    margin-top: 20rpx;
    border-radius: 10rpx;
    overflow: hidden;
  }
}
</style>
