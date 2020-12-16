/*
 * @Author: zhangyang
 * @Date: 2020-12-03 10:13:50
 * @LastEditTime: 2020-12-09 14:47:52
 * @Description: Vue3 配置文件
 */
const { resolve } = require('path');
const fs = require('fs');

// Dotenv 是一个零依赖的模块，它能将环境变量中的变量从 .env 文件加载到 process.env 中
const dotenv = require("dotenv");

const envFiles = [
  /** default file */ `.env`,
  /** mode file */ `.env.${process.env.NODE_ENV}`
];

for (const file of envFiles) {
  const envConfig = dotenv.parse(fs.readFileSync(file));
  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }
}
// 打包的文件没有代理，直接换为原地址；
// 如果此处不换则需后端设置 nginx 代理
if (process.env.IS_ONLINE) {
  fs.writeFileSync('.env.local', 'VITE_ONLINE_FLAG = true', 'utf-8');
} else {
  try {
    fs.unlinkSync('.env.local');
  } catch (error) {
    null;
  }
}


module.exports = {
  /**
   * 生产中的基础路径
   * 部署目录相对于网站根目录
   */
  base: '/admin',
  /**
   * 本地运行监听端口号
   */
  port: 9527,
  /**
   * 是否开启 https
   */
  https: false,
  /**
   * 是否开启服务端渲染
   */
  ssr: false,
  /**
   * 路径别名
   * 键必须以斜线开始和结束
   */
  alias: {
    '/@/': resolve(__dirname, './src'),
    '/img/': resolve(__dirname, './src/assets/img'),
    '/components/': resolve(__dirname, './src/components'),
    '/views/': resolve(__dirname, './src/views'),
    '/utils/': resolve(__dirname, './src/util')
  },
  /**
   * 引入第三方配置
   * 会将引入的第三方文件移动到 node_mudules/.vite_opt_cache 目录下
   */
  optimizeDeps: {
    include: ['element-plus', 'element-plus/lib/locale/lang/zh-cn', 'element-plus/lib/theme-chalk/fonts']
  },
  /**
   * 开启源码视图
   */
  sourcemap: true,
  cors: {
    origin: '*'
  },
  /**
   * 本地代理服务器
   */
  proxy: {
    [process.env.VITE_API]: {
      target: process.env.VITE_BASE_HTTP,
      changeOrigin: true,
      // 此处替换的字符会拼接于真实请求之后，按需修改
      rewrite: path => path.replace(/^\/api/, '')
    }
  }
};
