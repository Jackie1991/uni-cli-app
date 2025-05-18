<template>
  <view class="c-form">
    <uni-forms ref="formRef" :modelValue="formData" :border="border" v-bind="formProps">
      <template v-for="{ label, prop, type, rules, labelPosition, labelWidth, labelAlign, placeholder, options, ...filed } in fields" :key="prop">
        <uni-forms-item
          class="c-form-item"
          :label="label"
          :name="prop"
          :label-position="labelPosition"
          :label-width="labelWidth"
          :label-align="labelAlign"
          :rules="rules"
          :required="rules?.some((rule) => rule.required)"
        >
          <template v-if="['text', 'textarea', 'number', 'password', 'digit'].includes(type)">
            <uni-easyinput :type="type" v-model="formData[prop]" :placeholder="placeholder || `请输入${label || '内容'}`" v-bind="filed" />
          </template>
          <template v-if="type === 'numberStep'">
            <uni-number-box v-model="formData[prop]" v-bind="filed" />
          </template>
          <template v-if="type === 'select'">
            <uni-data-select v-model="formData[prop]" :localdata="options" :placeholder="placeholder || `请选择${label || '内容'}`" v-bind="filed" />
          </template>
          <template v-if="type === 'search'">
            <uni-combox v-model="formData[prop]" :candidates="options" :placeholder="placeholder || `请选择${label || '内容'}`" v-bind="filed" />
          </template>
          <template v-if="['date', 'datetime', 'daterange', 'datetimerange'].includes(type)">
            <uni-datetime-picker :type="type" v-model="formData[prop]" :placeholder="placeholder || `请选择${label || '内容'}`" v-bind="filed" />
          </template>
          <template v-if="['radio', 'checkbox'].includes(type)">
            <uni-data-checkbox :type="type" v-model="formData[prop]" :multiple="type === 'checkbox'" :localdata="options" v-bind="filed" />
          </template>
        </uni-forms-item>
      </template>
    </uni-forms>
    <view v-if="showFooter" class="c-form-footer">
      <slot name="footer">
        <c-button v-for="btn in formButtons" :key="btn.text" :type="btn.type" @click.stop="btn.handler">{{ btn.text }}</c-button>
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { FormProps } from './types';

const props = withDefaults(defineProps<FormProps>(), {
  modelValue: () => ({}),
  fields: () => [],
  labelPosition: 'left',
  labelAlign: 'left',
  border: false,
  showFooter: true,
  submitText: '提交',
  buttons: 'submit', // 按钮类型，多个用逗号分隔 submit,reset,cancel
});
// 对外暴露事件
interface Emits {
  (e: 'update:modelValue', value: any): void; // v-model
  (e: 'submit', value: any): void; // 提交
  (e: 'reset'): void; // 重置
  (e: 'cancel'): void; // 取消
}
const emit = defineEmits<Emits>();
// 表单对象
const formRef = ref<any>(null);
// 表单属性
const formProps = computed<any>(() => ({
  rules: props.rules,
  labelPosition: props.labelPosition,
  labelWidth: props.labelWidth,
  labelAlign: props.labelAlign,
}));
// 使用v-model
const formData = useVModel(props, 'modelValue', emit);
// 表单按钮
const formButtons = computed<any[]>(() => {
  const btns = props.buttons.split(',');
  const btnMap: { [key: string]: any } = {
    submit: { text: props.submitText, type: 'primary', handler: formSubmit },
    reset: { text: '重置', type: 'warning', handler: formReset },
    cancel: { text: '取消', handler: formCancel },
  };
  return btns.map((btn: string) => btnMap[btn]);
});

// 表单提交
const formSubmit = async () => {
  const isValid = await formRef.value.validate();
  console.log(isValid);
  if (!isValid) return;
  emit('submit', formData.value);
};

// 表单重置
const formReset = () => {
  formData.value = {};
  emit('reset');
};

// 表单取消
const formCancel = () => {
  formData.value = {};
  emit('cancel');
};
</script>

<style lang="scss" scoped>
.c-form {
  padding: 20rpx;

  &-item {
    font-size: var(--c-font-size);
  }

  &-footer {
    .c-button {
      & + .c-button {
        margin-top: 20rpx;
      }

      &.is-text,
      &.is-inline {
        & + .c-button {
          margin-left: 20rpx;
          margin-top: 0;
        }
      }
    }
  }
}
</style>
