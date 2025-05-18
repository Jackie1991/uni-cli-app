// 表单类型
type FormItemType =
  | 'text'
  | 'number'
  | 'numberStep'
  | 'textarea'
  | 'password'
  | 'digit'
  | 'select'
  | 'search'
  | 'radio'
  | 'checkbox'
  | 'date'
  | 'datetime'
  | 'daterange'
  | 'datetimerange';

// 校验规则
type FormItemRuleType = {
  required?: boolean; // 是否必填
  message?: string; // 错误提示
  trigger?: string; // 触发方式
  validator?: (rule: any, value: any, callback: any) => void; // 自定义校验规则
};

// 选项类型
type OptionType = {
  text: string; // 显示文本
  value: any; // 选项值
  disable?: boolean; // 是否禁用
};

// 表单项
export interface FormItemProps {
  prop: string; // 表单项字段名
  type: FormItemType; // 表单类型
  rules?: FormItemRuleType[];
  label?: string;
  labelPosition?: (string & 'left') | 'top'; // 标签位置
  labelWidth?: string | number; // 标签宽度
  labelAlign?: (string & 'left') | 'center' | 'right'; // 标签对齐方式
  placeholder?: string; // 占位符
  options?: string[] | OptionType[]; // 选项
  multiple?: boolean; // 是否多选
  [key: string]: string | number | boolean | any; // 其他属性
}

// 表单字段
export interface FormProps {
  modelValue: any; // 表单数据
  fields: FormItemProps[]; // 表单字段
  rules?: any; // 表单校验规则
  labelPosition?: (string & 'left') | 'top'; // 标签位置
  labelWidth?: string | number; // 标签宽度
  labelAlign?: (string & 'left') | 'center' | 'right'; // 标签对齐方式
  border?: boolean; // 是否显示边框
  showFooter?: boolean; // 是否显示底部按钮
  submitText?: string; // 提交按钮文本
  buttons?: string; // 底部按钮
}
