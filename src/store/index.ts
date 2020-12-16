/*
 * @Author: zhangyang
 * @Date: 2020-12-07 15:38:07
 * @LastEditTime: 2020-12-10 17:50:23
 * @Description: Vuex 模块
 */
import { createStore } from 'vuex';

import app, { Sidebar } from './modules/app';
import tagsView from './modules/tags-view';
import nav from './modules/nav';
import routes from './modules/routes';

// 无用，仅作为提示
export interface StoreObj{
  /**
   * 状态对象
   */
  state: () => ({
    [propName: string]: any
  });
  /**
   * 获取状态
   * @use store.getters.getterName
   * @get mapGetters([{ alias: 'getterName' }]) || mapGetters(['getterName1', 'getterName2'])
   * @fn getterName: (state, getters) => state.name
   */
  getters: object;
  /**
   * 同步操作状态的方法
   * @use store.commit('mutationName', playload)
   * @get mapMutations([{ alias: 'mutationName' }]) || mapMutations(['mutationName1', 'mutationName2'])
   * @fn mutationName(state, playload) {}
   */
  mutations: object;
  /**
   * 异步操作状态的方法,
   * @use store.dispatch('asyncName', playload)
   * @get mapActions([{ alias: 'actionName' }]) || mapActions(['actionName1', 'actionName2'])
   * @fn actionName({ dispatch, commit, state }, playload)
   */
  actions: object
}

const store = createStore({
  modules: {
    app,
    tagsView,
    nav,
    routes
  },
  getters: {
    sidebar: (state): Sidebar => state?.app?.sidebar,
    size: (state) => state?.app?.size,
    device: (state) => state?.app?.device,

    visitedViews: (state) => state?.tagsView?.visitedViews,
    cachedViews: (state) => state?.tagsView?.cachedViews,

    leftArr: (state) => state?.nav?.leftArr,

    routes: (state) => state?.routes?.routes
    
  }
});

export default store;