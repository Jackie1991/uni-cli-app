<template>
  <view class="c-goods-list">
    <view v-for="(item, index) in list" :key="item.id" class="c-goods-list-item" @click="handleDetail(item.id)">
      <slot :row="item" :index="index">
        <view class="c-goods-pictrue">
          <image class="c-goods-pictrue__img" :src="item.poster" mode="aspectFill" />
        </view>
        <view class="c-goods-title">{{ item.name }}</view>
        <view class="c-goods-content">
          <view class="c-goods-price">￥{{ (item.price || 0).toFixed(2) }}</view>
          <view class="c-goods-btn" @click.stop="handleCart(item)">
            <image class="icon" src="/static/tabbar/cart_on.png" mode="aspectFill" />
          </view>
        </view>
      </slot>
    </view>
    <uni-popup ref="popupRef" type="bottom" background-color="#fff" borderRadius="20rpx 20rpx 0 0">
      <view class="goods-popup">
        <slot name="popup">
          <view class="goods-popup-infor">
            <image class="goods-img" :src="orderInfo.poster" mode="aspectFill" />
            <view class="goods-price">￥{{ orderInfo.price.toFixed(2) }}</view>
            <view class="goods-line">库存{{ popupInfor.stock }}件</view>
            <view class="goods-line">已选择{{ orderInfo.specs?.name }}</view>
          </view>
          <view class="goods-popup-specs">
            <view class="goods-specs-title">规格</view>
            <view
              v-for="item in popupInfor.specs"
              :key="item.skuCode"
              class="goods-specs-item"
              @click="orderInfo.specs = item"
            >
              {{ item.name }}
            </view>
          </view>
          <view class="goods-popup-count">
            <view class="goods-count-title">数量</view>
            <uni-number-box v-model="orderInfo.quantity" @click.stop />
          </view>
          <view class="goods-popup-btns">
            <c-button plain @click="submitProduct(orderInfo, 'buy')">立即购买</c-button>
            <c-button type="primary" @click="submitProduct(orderInfo, 'cart')">加入购物车</c-button>
          </view>
        </slot>
      </view>
    </uni-popup>
  </view>
</template>

<script setup lang="ts">
interface Props {
  list: ProductType[];
}
defineProps<Props>();

const popupRef = ref<any>(null);
const popupInfor = ref<{ specs: ProductSpecsType[]; stock: number }>({ specs: [], stock: 0 });
const orderInfo = reactive<OrderProductType>({
  id: -1,
  name: '',
  poster: '',
  price: 0,
  quantity: 1,
  specs: null,
  total: 0,
});

const handleDetail = (id: number | string) => {
  uni.navigateTo({
    url: `/pages/goods/detail/index?id=${id}`,
  });
};

const handleCart = ({ specs, stock, ...rest }: ProductType) => {
  popupInfor.value = { specs, stock };
  orderInfo.id = rest.id;
  orderInfo.name = rest.name;
  orderInfo.poster = rest.poster;
  orderInfo.price = rest.price;
  popupRef.value?.open();
};

const submitProduct = (values: OrderProductType, type: string) => {
  values.total = (values.price * 100 * values.quantity) / 100;
  if (!values.specs) {
    return baseAlert('请选择规格');
  }
  if (type === 'buy') {
    uni.navigateTo({
      url: `/pages/order/index?id=${values.id}`,
    });
  } else {
    baseAlert('加入购物车成功');
  }
  popupRef.value?.close();
};
</script>

<style lang="scss" scoped>
.c-goods-list {
  column-count: 2;
  gap: var(--c-padding);
  padding: var(--c-padding);

  &-item {
    break-inside: avoid;
    margin-bottom: 20rpx;

    .c-goods-pictrue {
      position: relative;
      width: 100%;
      padding-top: 100%;
      border-radius: 10rpx;
      overflow: hidden;
      margin-bottom: 10rpx;

      &__img {
        @include position-inset;
        width: 100%;
        height: 100%;
      }
    }

    .c-goods-title {
      font-size: 28rpx;
      line-height: 40rpx;
      color: var(--c-text-color);
      @include text-ellipsis(2);
    }

    .c-goods-content {
      @include flex-between;

      .c-goods-price {
        align-self: flex-end;
        font-size: 28rpx;
        line-height: 40rpx;
        color: var(--c-color-red);
      }

      .c-goods-btn {
        width: 46rpx;
        height: 46rpx;
        @include flex-center;

        .icon {
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
      }
    }
  }
}

.goods-popup {
  padding: var(--c-padding);
  font-size: 28rpx;

  &-infor {
    overflow: hidden;
    margin-bottom: 20rpx;

    .goods-img {
      float: left;
      width: 140rpx;
      height: 140rpx;
      margin-right: 20rpx;
    }

    .goods-price {
      font-size: 54rpx;
      line-height: 1;
      margin-bottom: 10rpx;
    }
  }

  &-specs {
    @include flex-wrap;
    margin-bottom: 20rpx;

    .goods-specs-title {
      width: 100%;
      font-size: 32rpx;
      line-height: 2;
    }

    .goods-specs-item {
      margin: 0 20rpx 10rpx 0;
      line-height: 1.6;
      padding: 5rpx 20rpx;
      background-color: #f7f7f7;
    }
  }

  &-count {
    @include flex-between;
    line-height: 2;

    .goods-count-title {
      font-size: 32rpx;
    }
  }

  &-btns {
    @include flex-center;

    .c-button {
      flex: 1;
      margin: 20rpx 20rpx 0;
    }
  }
}
</style>
