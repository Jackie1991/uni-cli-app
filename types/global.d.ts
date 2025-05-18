// 接口返回
declare interface ResponseData<T = any> {
  code: number; // 状态码
  data: T; // 数据
  message: string; // 提示信息
}

// 分页参数
declare interface PageParams {
  pageNo: number; // 当前页码
  pageSize: number; // 每页数量
}

// 商品规格类型
declare interface ProductSpecsType {
  name: string; // 商品名称
  skuCode: string; // 商品编码
}

// 商品类型
declare interface ProductType {
  id: number | string; // 商品id
  name: string; // 商品名称
  price: number; // 商品价格
  poster: string; // 商品图片
  description: string; // 商品描述
  stock: number; // 商品库存
  specs: ProductSpecsType[]; // 商品规格
}

// 订单商品类型
declare interface OrderProductType {
  id: number | string; // 商品id
  name: string; // 商品名称
  price: number; // 商品价格
  quantity: number; // 商品数量
  poster: string; // 商品图片
  specs: ProductSpecsType | null; // 商品选择的规格
  total: number; // 商品总价
}

// 订单类型
declare interface OrderInstance {
  id?: number | string;
  name: string; // 订单名称
  quantity: number; // 订单商品数量
  total: number; // 订单总价
  products: OrderProductType[]; // 订单商品
}
