import request from '@/utils/request';

// 获取商品列表
export const getProducts = (data: PageParams & {}) => {
  return request({
    url: '/product/list',
    method: 'GET',
    data,
  });
};

// 获取商品详情
export const getProductDetail = (id: number) => {
  // 发送请求，获取产品详情
  return request({
    url: '/product/detail',
    method: 'GET',
    data: { id },
  });
};
