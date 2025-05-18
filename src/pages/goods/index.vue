<template>
  <view class="goods-container">
    <view class="goods-nav">
      <view class="goods-nav-wrapper">
        <view
          v-for="(item, index) in goodsNav"
          :key="item"
          class="goods-nav-item"
          :class="{ active: navActive === index }"
          @click="navActive = index"
        >
          商品{{ item }}
        </view>
      </view>
      <uni-icons type="more" size="24" />
    </view>
    <c-goods-list :list="list" />
  </view>
</template>

<script setup lang="ts">
import { getProducts } from '@/api/product';

const goodsNav = ref<any[]>(['a', 'b', 'c']);
const navActive = ref<number>(0);
const list = ref<any[]>([]);
const page = ref<number>(1);
const size = ref<number>(10);
const total = ref<number>(0);

const loadData = async () => {
  const { data } = await getProducts({ pageNo: page.value, pageSize: 10 });
  if (page.value === 1) list.value = [];
  list.value = [...list.value, ...data.records];
  total.value = data.total;
};

onReachBottom(() => {
  if (page.value * size.value >= total.value) return;
  page.value += 1;
  loadData();
});

onMounted(() => {
  loadData();
});
</script>

<style lang="scss" scoped>
.goods-container {
  .goods-nav {
    position: sticky;
    top: var(--window-top);
    @include flex-center;
    padding: 16rpx;
    background-color: white;
    z-index: 2;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
    font-size: 32rpx;

    &-wrapper {
      display: flex;
      flex: 1;
      width: 0;
      margin-right: 15rpx;
    }

    &-item {
      margin-right: 25rpx;

      &:not(.active) {
        opacity: 0.5;
      }
    }
  }
}
</style>
