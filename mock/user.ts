import Mock from 'mockjs';

Mock.mock('/api/login', 'post', {
  code: 200,
  message: '登录成功',
  token: '@string("upper", 32)', // 生成32位大写字母的随机字符串
});

Mock.mock('/api/logout', 'post', {
  code: 200,
  message: '退出成功',
});

Mock.mock('/api/getUserInfo', 'get', {
  code: 200,
  message: 'success',
  data: {
    'id|1-100': 1,
    name: '@cname',
    'age|18-60': 1,
    'gender|1': ['男', '女'],
    'avatar|1': 'https://cdn.jsdelivr.net/gh/lyt-cc/CDN/img/avatar.jpg',
  },
});
