export const useAclStore = defineStore('acl', {
  state: (): AclStore => ({
    // 订单类型菜单
    orderMenus: [
      { name: '全部', code: 'all' },
      { name: '待付款', code: 'pending' },
      { name: '待发货', code: 'shipped' },
      { name: '待收货', code: 'received' },
      { name: '退款', code: 'refund' },
    ],
    // 购物车商品列表
    cartGoods: [], // 购物车商品列表
  }),
  getters: {},
  actions: {
    // 添加商品到购物车
    addGoods(goods: any) {
      this.cartGoods.push(goods);
    },
    // 从购物车中移除商品
    removeGoods(id: number | string) {
      const index = this.cartGoods.findIndex((item: any) => item.id === id);
      if (index === -1) return;
      this.cartGoods.splice(index, 1);
    },
    // 清空购物车
    clearCart() {
      this.cartGoods = [];
    },
  },
});
