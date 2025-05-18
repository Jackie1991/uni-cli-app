class TimeFormatter {
  #date: Date;

  constructor(input: number | string | undefined) {
    if (input === undefined) {
      this.#date = new Date();
    } else if (typeof input === 'number' || typeof input === 'string') {
      this.#date = new Date(input);
    } else {
      throw new Error('输入值类型必须为 number 或 string');
    }
  }

  format(formatStr = 'YYYY-MM-DD HH:mm:ss'): string {
    const year = this.#date.getFullYear();
    const month = String(this.#date.getMonth() + 1).padStart(2, '0');
    const day = String(this.#date.getDate()).padStart(2, '0');
    const hour = String(this.#date.getHours()).padStart(2, '0');
    const minute = String(this.#date.getMinutes()).padStart(2, '0');
    const second = String(this.#date.getSeconds()).padStart(2, '0');

    return formatStr.replace('YYYY', String(year)).replace('MM', month).replace('DD', day).replace('HH', hour).replace('mm', minute).replace('ss', second);
  }
}

// 定义一个特殊对象用于表示 undefined 输入
const UNDEFINED_INPUT_KEY = {};
const formatterCache = new WeakMap<object, TimeFormatter>();

const createCacheKey = (input: number | string | undefined): object => {
  if (input === undefined) {
    return UNDEFINED_INPUT_KEY;
  }
  return { value: input };
};

const timeFormat = (input?: number | string): { format: (formatStr?: string) => string } => {
  const cacheKey = createCacheKey(input);

  if (!formatterCache.has(cacheKey)) {
    const formatter = new TimeFormatter(input);
    formatterCache.set(cacheKey, formatter);
  }
  const cachedFormatter = formatterCache.get(cacheKey)!;
  return {
    format: (formatStr?: string) => cachedFormatter.format(formatStr),
  };
};

export default timeFormat;
