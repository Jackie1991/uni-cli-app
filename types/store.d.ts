// 用户状态属性
declare interface UserStore {
  token: string; // token
  username: string; // 用户名
  usercode: string; // 用户编码
}

// 购物车状态属性
declare interface AclStore {
  orderMenus: { name: string; code: string }[]; // 订单类型
  cartGoods: OrderProductType[]; // 购物车商品
}
