/*
 * @Author: zhangyang
 * @Date: 2020-12-03 14:06:59
 * @LastEditTime: 2020-12-12 10:40:39
 * @Description: 前端路由
 */
import { createRouter, createWebHashHistory } from 'vue-router';

import commonRoute from './common/index';

import Layout from '/src/layout/index.vue';


export const routes = [
  ...commonRoute,
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('/src/views/test/index.vue'),
        meta: { title: 'Home', affix: true, icon: 's-home' }
      },
      {
        path: '/000',
        name: '000',
        component: () => import('/src/views/test/000.vue'),
        meta: { title: '测试000' }
      },
      {
        path: '/111',
        name: '111',
        component: () => import('/src/views/test/111.vue'),
        meta: { title: '测试111' }
      },
      {
        path: '/222',
        name: '222',
        component: () => import('/src/views/test/222.vue'),
        meta: { title: '222' }
      }
    ]
  },
  // 页面不存在，重定向到 404,必须放在最后！！！
  { path: '/:allMatch(.*)', redirect: '/404', hidden: true }

];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;