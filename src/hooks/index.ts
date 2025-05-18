/**
 * 双向绑定
 * @params: props 父组件传递的props
 * @params: propName 需要双向绑定的属性名
 * @params: emit 父组件传递的emit
 */
export const useVModel = (props: any, propName: string, emit: any) => {
  return computed({
    get() {
      return new Proxy(props[propName], {
        get(target, key, receiver) {
          return Reflect.get(target, key, receiver);
        },
        set(target, key, value) {
          emit(`update:${propName}`, { ...target, [key]: value });
          return true;
        },
      });
    },
    set(value) {
      emit(`update:${propName}`, value);
    },
  });
};

/**
 * 全局loading
 * @params: loadingText 显示文本
 */
export const baseLoading = {
  show: (loadingText = '加载中...') => {
    uni.showLoading({
      title: loadingText,
      mask: true,
    });
  },
  hide: () => {
    uni.hideLoading();
  },
};

/**
 * 全局toast
 * @params: title 显示文本
 */
export const baseAlert = (title = '加载中...') => {
  uni.showToast({
    title,
    icon: 'none',
    mask: true,
  });
};
baseAlert.hide = () => {
  uni.hideToast();
};

const showModal = (
  content: string,
  title: string = '提示',
  showCancel: boolean = true,
  confirm?: () => void,
  cancel?: () => void
) => {
  uni.showModal({
    title,
    content,
    showCancel,
    success(res: any) {
      if (res.confirm) {
        confirm && confirm();
      } else {
        cancel && cancel();
      }
    },
  });
};
/**
 * 全局模态提示弹窗
 * @params: title 显示标题
 * @params: content 显示文本
 * @params: cb 确认回调
 */
export const baseMessage = (content: string, title: string, confirm?: () => void) => {
  showModal(content, title, false, confirm);
};

/**
 * 全局模态提示确认弹窗
 * @params: title 显示标题
 * @params: content 显示文本
 * @params: cb 确认回调
 */
export const baseConfirm = (content: string, title: string, confirm?: () => void, cancel?: () => void) => {
  showModal(content, title, true, confirm, cancel);
};
