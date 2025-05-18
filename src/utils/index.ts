// 导出
import timeFormat from './date';

// 导出export default的方法
export { timeFormat };
// 导出export中的全部方法
export * from './storage';

/**
 * 防抖
 * @param func 接受的函数
 * @param delay 延迟时间，单位毫秒
 */
export const debounce = <T extends (...args: any[]) => any>(func: T, delay: number = 1500): ((...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

/**
 * 节流
 * @param func 接受的函数
 * @param delay 延迟时间，单位毫秒
 */
export const throttle = <T extends (...args: any[]) => any>(func: T, limit: number = 1500): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean = false;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
