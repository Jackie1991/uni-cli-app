import request from '@/utils/request';

// 添加购物车商品
export const addGoods = (data: any) => {
  return request({
    url: '/cart/add',
    method: 'POST',
    data,
  });
};

// 移除购物车商品
export const removeGoods = (id: number | string) => {
  return request({
    url: '/cart/del',
    method: 'POST',
    data: { id },
  });
};
