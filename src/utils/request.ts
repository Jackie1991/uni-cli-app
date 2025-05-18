/**
 * header 接受的属性
 */
interface HeaderType {
  'Content-Type'?: string;
  Authorization?: string;
}
interface RequestProps {
  url: string;
  method: 'POST' | 'GET';
  data?: any;
  header?: HeaderType;
  options?: {
    token?: boolean; // 是否需要token
    loading?: boolean; // 是否需要loading
    loadingText?: string; // loading文字
  };
}

/**
 * 请求
 * @param url 请求地址
 * @param method 请求方法
 * @param data 请求参数
 * @param header 请求头
 * @returns Promise
 */
const request = ({
  url,
  method = 'POST',
  data,
  header = {
    'Content-Type': 'application/json',
  },
  options = {
    token: true,
    loading: true,
    loadingText: '加载中...',
  },
}: RequestProps): Promise<ResponseData | any> => {
  // 是否需要token
  if (options.token) {
    header['Authorization'] = uni.getStorageSync('token');
  }
  // 是否需要拼接请求域名
  url = url.indexOf('http') > -1 ? url : import.meta.env.VITE_APP_API_BASE_URL + url;
  // 未禁用loading的时候显示loading
  if (options.loading !== false) baseLoading.show(options.loadingText);
  // 返回promise
  return new Promise((resolve, reject) => {
    uni.request({
      url,
      method,
      data,
      header,
      success: ({ statusCode, data }: any) => {
        if (options.loading !== false) baseLoading.hide();
        if (statusCode !== 200) {
          uni.showToast({
            title: data.message || '请求失败',
            icon: 'none',
          });
          reject(data);
          return;
        }
        resolve(data as ResponseData);
      },
      fail: (err) => {
        if (options.loading !== false) baseLoading.hide();
        reject(err);
      },
    });
  });
};

export default request;
