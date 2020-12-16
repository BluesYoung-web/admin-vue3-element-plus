/*
 * @Author: zhangyang
 * @Date: 2020-12-10 17:40:51
 * @LastEditTime: 2020-12-10 17:49:01
 * @Description: 路由表
 */
import { routes } from '../../route/index';
import { RouteRecord } from 'vue-router';
import { Commit, Dispatch, StoreOptions } from 'vuex';

interface RouteState {
  /**
   * 当前所有的路由
   */
  routes: RouteRecord[];
  /**
   * 异步路由
   */
  addRoutes: RouteRecord[];
}

interface ActionParams {
  dispatch: Dispatch,
  commit: Commit,
  state: RouteState
}

const route: StoreOptions<any> = {
  state: () => ({
    routes
  }),
  mutations: {
    setRoutes: (state: RouteState, routes: RouteRecord[]) => {
      state.addRoutes = routes;
      state.routes = routes.concat(routes);
    }
  },
  actions: {
    // generateRoutesAsync({ commit }, roles) {
    //   return new Promise((resolve) => {
    //     let accessedRoutes = null;
    //     if (roles.includes('admin')) {
    //       accessedRoutes = [];
    //     } else {
    //       accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
    //     }
    //     commit('setRoutes', accessedRoutes);
    //     resolve(accessedRoutes);
    //   });
    // }
  }
}

export default {
  // 启用命名空间
  namespaced: true,
  ...route
};