/*
 * @Author: zhangyang
 * @Date: 2020-12-09 17:21:19
 * @LastEditTime: 2020-12-10 08:56:21
 * @Description: 页面权限控制
 */
import router from './route/index';
import NProgress from 'nprogress';

import { ElMessageBox, ElMessage } from 'element-plus';
import { getToken } from './util/auth';

NProgress.configure({
  showSpinner: false
});

/**
 * 前置导航守卫
 */
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  document.title = to.meta.title || '小黑后台';

  const canvas: HTMLElement | null = document.querySelector('#number-rain-canvas');
  if (canvas) {
    if (to.path !== '/login') {
      canvas.style.display = 'none';
    } else {
      canvas.style.display = 'block';
    }
  }

  // 此处添加鉴权
  if (!getToken().token && to.path !== '/login') {
    await ElMessageBox.confirm('请先去登录', '提示', {
      type: 'error',
      showCancelButton: false,
      closeOnClickModal: false,
    }).catch(() => null);
    next({
      path: `/login`,
      query: {
        redirect: to.path
      }
    });

    NProgress.done();
  } else if (false) {
    // // 具体页面权限 map 判断
    // ElMessage.error('权限不足，无法进入');
    // if (from.path === '/login') {
    //   canvas && (canvas.style.display = 'block');
    // }
    // next(from.path);
  } else {
    next();
  }
});

/**
 * 后置导航守卫
 */
router.afterEach(() => {
  NProgress.done();
});