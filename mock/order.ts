import Mock from 'mockjs';

Mock.mock('/api/getUserInfo', 'get', {
  code: 200,
  message: 'success',
  data: {
    'id|1-100': 1,
    name: '@cname',
    'age|18-60': 1,
    email: '@email',
  },
});

// 模拟商品列表
Mock.mock('/api/products', 'get', {
  code: 200,
  message: 'success',
  data: {
    'list|10': [
      {
        'id|1-100': 1,
        name: '@cname',
        'price|100-1000': 1,
        'count|1-100': 1,
      },
    ],
  },
});
