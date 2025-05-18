<template>
  <view class="index-container">
    <c-goods-list :list="goodsList" />
  </view>
</template>

<script setup lang="ts">
const goodsList = ref<any[]>([
  { id: 1, name: '苹果' },
  {
    id: 2,
    name: '香蕉香蕉香蕉香蕉香蕉香蕉香蕉香蕉香蕉香蕉香蕉香蕉香蕉香蕉香蕉香蕉香蕉香蕉香蕉香蕉香蕉香蕉香蕉香蕉香蕉香蕉香蕉香蕉香蕉香蕉',
  },
  { id: 3, name: '橙子' },
  { id: 4, name: '西瓜' },
  { id: 5, name: '葡萄' },
  { id: 6, name: '草莓' },
  {
    id: 7,
    name: '樱桃樱桃樱桃樱桃樱桃樱桃樱桃樱桃樱桃樱桃樱桃樱桃樱桃樱桃樱桃樱桃樱桃樱桃樱桃樱桃樱桃樱桃樱桃樱桃樱桃樱桃樱桃',
  },
  { id: 8, name: '柠檬' },
  { id: 9, name: '芒果' },
  {
    id: 10,
    name: '菠萝菠萝菠萝菠萝菠萝菠萝菠萝菠萝菠萝菠萝菠萝菠萝菠萝菠萝菠萝菠萝菠萝菠萝菠萝菠萝菠萝菠萝菠萝菠萝菠萝菠萝菠萝',
  },
  { id: 11, name: '火龙果' },
  { id: 12, name: '椰子' },
  { id: 13, name: '榴莲' },
  { id: 14, name: '荔枝' },
  { id: 15, name: '龙眼' },
]);
</script>

<style lang="scss" scoped>
.index-container {
  .text-area {
    color: var(--c-text-color);
  }

  .c-button {
    background-color: red;
  }
}
</style>
