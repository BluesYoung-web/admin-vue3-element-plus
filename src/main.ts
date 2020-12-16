/*
 * @Author: zhangyang
 * @Date: 2020-12-02 17:59:44
 * @LastEditTime: 2020-12-10 09:44:14
 * @Description: 项目入口文件
 */

//  引入 Element Plus
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
// 引入中文资源(默认英文)
// vite 警告，将后面引号的内容加入 vite.config.js 的 optimizeDeps 的 include 里面可解决
import locale from 'element-plus/lib/locale/lang/zh-cn';

// 引入 VueRouter
import Router from './route/index';
// 引入 Vuex
import Vuex from './store/index';
// 引入路由导航守卫
import './permission';
import { getToken } from './util/auth';
import { generateUserInfo } from './util/generateUserInfo';

// 统一浏览器样式
import 'normalize.css/normalize.css';
// 自定义样式
import '/@/styles/index.scss';

import { createApp } from 'vue';
import App from './App.vue';

// 刷新页面的时候，如果存在 token 就直接获取导航栏列表
if (getToken().token) {
  generateUserInfo();
}

// 创建应用实例
const app = createApp(App);
// 使用 Element Plus，启用中文资源，全局默认小图标
app.use(ElementPlus, { locale, size: 'mini' });
// 使用路由
app.use(Router);
// 使用 Vuex
app.use(Vuex);

app.config

// 挂载应用
app.mount('#app');
