<template>
  <button
    class="c-button"
    :class="[
      type ? `c-button-${type}` : '',
      { 'is-text': text, 'is-plain': plain, 'is-inline': inline, 'is-disabled': disabled, 'is-mini': mini },
    ]"
    @click="emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
// 表单项
interface ButtonProps {
  type?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  text?: boolean; // 是否为文本按钮
  plain?: boolean; // 是否为朴素按钮
  inline?: boolean; // 是否为行内按钮
  disabled?: boolean; // 是否禁用
  mini?: boolean; // 是否为小按钮
}
withDefaults(defineProps<ButtonProps>(), {
  text: false,
  plain: false,
  full: false,
  mini: false,
});
// 事件
interface Emits {
  (e: 'click'): void;
}
const emit = defineEmits<Emits>();
</script>

<style lang="scss" scoped>
.c-button {
  --c-button-bg-color: #f8f8f8;
  --c-button-border-color: #f8f8f8;
  --c-button-text-color: var(--c-text-color);
  --c-button-disabled-color: #dedede;

  color: var(--c-button-text-color);
  background-color: var(--c-button-bg-color);
  padding: 0 var(--c-padding);
  border-radius: 10rpx;
  font-size: var(--c-font-size);
  margin: 0;

  &::after {
    border-color: var(--c-button-border-color);
  }

  &.is-inline {
    display: inline-block;
    width: fit-content;
    margin: 0;
  }

  &.is-plain {
    --c-button-border-color: var(--c-text-color);
  }

  &.is-text {
    display: inline;
    background: none;
    padding: 0;

    &::after {
      display: none;
    }
  }

  &.is-disabled {
    color: var(--c-text-disable);
    background-color: var(--c-button-disabled-color);
  }

  &.is-mini {
    font-size: calc(var(--c-font-size) - 4rpx);
    padding: 0 calc(var(--c-padding) / 2);
    line-height: 1.8;
  }

  $types: primary, success, warning, error, info;

  @each $type in $types {
    &-#{$type} {
      --c-button-bg-color: var(--c-color-#{$type});
      --c-button-text-color: var(--c-text-color-reverse);
      --c-button-border-color: var(--c-color-#{$type});
      --c-button-disabled-color: var(--c-color-#{$type}-disabled);

      &.is-plain {
        --c-button-bg-color: var(--c-color-#{$type}-lighter);
        --c-button-text-color: var(--c-color-#{$type});
      }

      &.is-text {
        --c-button-text-color: var(--c-color-#{$type});
      }
    }
  }
}
</style>
