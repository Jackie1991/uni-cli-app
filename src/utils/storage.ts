/* localStorage 方法 */
export const storage = {
  /**
   * 获取数据
   * @param key 需要获取storage的参数名
   */
  get(key: string) {
    const json = uni.getStorageSync(key);
    if (!json) return null;
    return JSON.parse(json);
  },
  /**
   * 存入数据
   * @param key 需要存储的参数名
   * @param value 需要存储的数据
   */
  set(key: string, value: any) {
    uni.setStorageSync(key, JSON.stringify(value));
  },
  /**
   * 删除storage指定数据
   * @param key 需要删除的参数名
   */
  remove(key: string) {
    uni.removeStorageSync(key);
  },
  /**
   * 清空storage
   */
  clear() {
    uni.clearStorageSync();
  },
};
