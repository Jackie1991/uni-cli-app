import Mock from 'mockjs';

// 模拟商品列表
const productList = Mock.mock({
  'list|15': [
    {
      'id|1-100': 1,
      name: '@ctitle(5, 20)',
      price: '@float(0, 1000, 2, 2)',
      'poster|1': '@image(200x200, @color)',
      description: '@cparagraph(3, 10)',
      'stock|1-100': 1,
      'specs|1-5': [{ name: '@cword(2, 4)', skuCode: '@string(number, 12)' }],
    },
  ],
}).list;

// 模拟商品列表
Mock.mock(/\/api\/product\/list/, 'get', (options: PageParams & { [key: string]: string }) => {
  const urlParams = new URLSearchParams(options.url.split('?')[1]);
  const pageNo = parseInt(urlParams.get('pageNo') || '1');
  const pageSize = parseInt(urlParams.get('pageSize') || '10');

  const startIndex = (pageNo - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const records = productList.slice(startIndex, endIndex);

  return {
    code: 200,
    message: 'success',
    data: {
      records,
      total: productList.length,
    },
  };
});

// 模拟商品列表
Mock.mock(/\/api\/product\/detail/, 'get', (options: any) => {
  const urlParams = new URLSearchParams(options.url.split('?')[1]);
  const id = urlParams.get('id');
  if (!id) {
    return {
      code: 404,
      message: '商品未找到',
      data: null,
    };
  }
  const productRest = Mock.mock({
    'images|1-5': ['@image(200x200, @color)'],
  });
  return {
    code: 200,
    message: 'success',
    data: {
      ...productList.find((item: any) => item.id === parseInt(id)),
      ...productRest,
    },
  };
});
