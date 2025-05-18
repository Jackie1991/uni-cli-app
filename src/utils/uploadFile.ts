/**
 * 上传文件
 * @param filePath 需要上传的文件路径
 * @returns Promise
 */
const uploadFile = (filePath: string) => {
  baseLoading.show('上传中...');

  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: `${import.meta.env.VITE_APP_API_BASE_URL}/upload`,
      filePath,
      name: 'file',
      success: (res) => {
        baseLoading.hide();
        resolve(res.data);
      },
      fail: (err) => {
        baseLoading.hide();
        reject(err);
      },
    });
  });
};

export default uploadFile;
