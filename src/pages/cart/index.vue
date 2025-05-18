<template>
  <view class="cart-container">
    <uni-swipe-action ref="cartUniSwipeAction" class="cart-goods-wrapper">
      <uni-swipe-action-item
        v-for="item in cartGoods"
        :key="item.id"
        :right-options="actions"
        @click="handleClick(item.id)"
      >
        <view class="cart-goods" @click.stop="handleItem(item.id)">
          <view
            class="cart-goods-checkbox"
            :class="{ active: selected.findIndex((e) => e.id === item.id) > -1 }"
            @click.stop="handleSelect(item)"
          >
            <uni-icons type="checkmarkempty" :size="18" />
          </view>
          <image :src="item.poster" class="cart-goods-poster" />
          <view class="cart-goods-info">
            <view class="cart-goods-name">{{ item.name }}</view>
            <view class="cart-goods-price">
              <text>￥{{ item.price }}</text>
              <uni-number-box v-model="item.quantity" @click.stop />
            </view>
          </view>
        </view>
      </uni-swipe-action-item>
    </uni-swipe-action>
    <view class="cart-goods-footer">
      <view
        class="cart-goods-checkbox"
        :class="{ active: selected.length === cartGoods.length }"
        @click.stop="handleAllSelect"
      >
        <uni-icons type="checkmarkempty" :size="16" />
        <text>全选</text>
      </view>
      <text class="price">¥{{ totalPrice }}</text>
      <c-button type="primary" inline @click="handleOrder">结算</c-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useAclStore } from '@/store/acl';

const { cartGoods, removeGoods } = useAclStore();
const cartUniSwipeAction = ref<any>(null); // uni-swipe-action组件实例
const actions = [{ text: '删除', style: { backgroundColor: '#dd524d' } }]; // uni-swipe-action组件右侧按钮配置
const selected = ref<OrderProductType[]>([]); // 已选中的商品列表
// 计算已选中商品的总价
const totalPrice = computed<string>(() => {
  return selected.value.reduce((total, item) => (total * 100 + item.price * 100 * item.quantity) / 100, 0).toFixed(2);
});

// 删除商品
const handleClick = (id: number | string) => {
  baseConfirm(
    '确定要删除该商品吗？',
    '',
    async () => {
      cartUniSwipeAction.value!.closeAll();
      await removeGoods(id);
    },
    () => {
      cartUniSwipeAction.value!.closeAll();
    }
  );
};

// 选择商品
const handleSelect = (item: OrderProductType) => {
  const index = selected.value.findIndex((i) => i.id === item.id);
  if (index > -1) {
    selected.value.splice(index, 1);
  } else {
    selected.value.push(item);
  }
};

const handleAllSelect = () => {
  if (selected.value.length === cartGoods.length) {
    selected.value = [];
  } else {
    selected.value = cartGoods;
  }
};

// 点击商品
const handleItem = (id: number | string) => {
  uni.navigateTo({
    url: `/pages/goods/detail/index?id=${id}`,
  });
};

// 下单结算
const handleOrder = async () => {
  console.log(selected.value);
  uni.navigateTo({
    url: `/pages/order/index?id=${1}`,
  });
};
</script>

<style lang="scss" scoped>
.cart-container {
  @include flex-column;
  padding: 0 var(--c-padding);

  .cart-goods {
    display: flex;
    padding: var(--c-padding) 0;
    border-bottom: 1px solid #eee;

    &-wrapper {
      flex: 1;
      height: 0;
      overflow: hidden auto;
    }

    &-checkbox {
      @include flex-center;
      align-self: center;
      margin-right: 15rpx;

      .uni-icons {
        color: white !important;
        width: 30rpx;
        height: 30rpx;
        border: 1px solid #ccc;
        border-radius: 50%;
        overflow: hidden;

        & + text {
          margin-left: 10rpx;
        }
      }

      &.active .uni-icons {
        background-color: var(--c-color-red);
        border-color: var(--c-color-red);
      }
    }

    &-poster {
      width: 160rpx;
      height: 160rpx;
    }

    &-info {
      @include flex-column;
      flex: 1;
      width: 0;
      margin-left: 20rpx;
    }

    &-name {
      font-size: 28rpx;
      color: #333;
    }

    &-price {
      @include flex-center(space-between);
      font-size: 32rpx;
      margin-top: auto;
      color: var(--c-color-red);
    }
  }

  .cart-goods-footer {
    @include flex-center(flex-start);
    padding: var(--c-padding) 0;
    border-top: 1px solid #eee;

    .cart-goods-checkbox {
      margin-right: auto;
    }

    .price {
      font-size: 36rpx;
      color: var(--c-color-red);
      margin-right: 10rpx;
    }

    .c-button {
      border-radius: 0;
      line-height: 2.4;
      padding: 0 40rpx;
      color: white;
      border-radius: 40rpx;
    }
  }
}
</style>
