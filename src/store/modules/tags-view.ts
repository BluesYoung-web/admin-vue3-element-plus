/*
 * @Author: zhangyang
 * @Date: 2020-12-07 17:24:01
 * @LastEditTime: 2020-12-12 14:54:22
 * @Description: 标签选项卡 Vuex
 */
import { RouteLocation } from "vue-router";
import { Commit, Dispatch, StoreOptions } from "vuex";

const visitedViews: RouteLocation[] = [];
const cachedViews: (string | symbol | undefined)[] = [];

interface RouteState {
  /**
   * 访问过的页面，路由对象
   */
  visitedViews: RouteLocation[];
  /**
   * 已缓存的页面名称
   */
  cachedViews: (string | symbol | null | undefined)[];
}

interface ActionParams {
  dispatch: Dispatch,
  commit: Commit,
  state: RouteState
}

const tagsView: StoreOptions<any> = {
  state: () => ({
    visitedViews,
    cachedViews
  }),
  mutations: {
    addVisitedView: (state: RouteState, view: RouteLocation) => {
      if (state.visitedViews.some((v) => v.path === view.path)) {
        return;
      }
      view.meta.title && state.visitedViews.push(Object.assign({}, view, {
        title: view.meta.title,
        icon: view.meta.icon ? view.meta.icon : null
      }));
    },
    addCachedView: (state: RouteState, view: RouteLocation) => {
      // 查询该标签是否已缓存
      if (state.cachedViews.includes(view.name)) {
        return;
      }
      // 禁用缓存
      if (!view.meta.noCache) {
        state.cachedViews.push(view.name);
      }
    },
    delVisitedView: (state: RouteState, view: RouteLocation) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews.splice(i, 1);
          return;
        }
      }
    },
    delCachedView: (state:RouteState, view: RouteLocation) => {
      const index = state.cachedViews.indexOf(view.name);
      index > -1 && state.cachedViews.splice(index, 1);
    },
    delOthersVisitedViews: (state: RouteState, view: RouteLocation) => {
      state.visitedViews = state.visitedViews.filter((v) => {
        return v.meta.affix || v.path === view.path;
      });
    },
    delOthersCachedViews: (state: RouteState, view: RouteLocation) => {
      state.cachedViews = state.cachedViews.filter((v) => {
        return v === view.name;
      });
    },
    delAllVisitedViews: (state: RouteState) => {
      const affixTags = state.visitedViews.filter((tag) => tag.meta.affix);
      state.visitedViews = affixTags;
    },
    delAllCachedViews: (state: RouteState) => {
      state.cachedViews.length = 0;
    },
    updateVisitedView: (state: RouteState, view: RouteLocation) => {
      for (let v of state.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view);
          return;
        }
      }
    }
  },
  actions: {
    addViewAsync({ dispatch }, view: RouteLocation) {
      dispatch('addVisitedViewAsync', view);
      dispatch('addCachedViewAsync', view);
    },
    addVisitedViewAsync({ commit }, view: RouteLocation) {
      commit('addVisitedView', view);
    },
    addCachedViewAsync({ commit }, view: RouteLocation) {
      commit('addCachedView', view);
    },

    delViewAsync({ dispatch, state }: ActionParams, view: RouteLocation) {
      return new Promise((resolve) => {
        dispatch('delVisitedViewAsync', view);
        dispatch('delCachedViewAsync', view);
        resolve({
          visitedViews: [...state.visitedViews],
          cachedViews: [...state.cachedViews]
        });
      });
    },
    delVisitedViewAsync({ commit, state }: ActionParams, view: RouteLocation) {
      return new Promise((resolve) => {
        commit('delVisitedView', view);
        resolve([...state.visitedViews]);
      });
    },
    delCachedViewAsync({ commit, state }: ActionParams, view: RouteLocation) {
      return new Promise((resolve) => {
        commit('delCachedView', view);
        resolve([...state.cachedViews]);
      });
    },
    delOthersViewsAsync({ dispatch, state }: ActionParams, view: RouteLocation) {
      return new Promise((resolve) => {
        dispatch('delOthersVisitedViewsAsync', view);
        dispatch('delOthersCachedViewsAsync', view);
        resolve({
          visitedViews: [...state.visitedViews],
          cachedViews: [...state.cachedViews]
        });
      });
    },
    delOthersVisitedViewsAsync({ commit, state }: ActionParams, view: RouteLocation) {
      return new Promise((resolve) => {
        commit('delOthersVisitedViews', view);
        resolve([...state.visitedViews]);
      });
    },
    delOthersCachedViewsAsync({ commit, state }: ActionParams, view: RouteLocation) {
      return new Promise((resolve) => {
        commit('delOthersCachedViews', view);
        resolve([...state.cachedViews]);
      });
    },
    delAllViewsAsync({ dispatch, state }: ActionParams) {
      return new Promise((resolve) => {
        dispatch('delAllVisitedViewsAsync');
        dispatch('delAllCachedViewsAsync');
        resolve({
          visitedViews: [...state.visitedViews],
          cachedViews: [...state.cachedViews]
        });
      });
    },
    delAllVisitedViewsAsync({ commit, state }: ActionParams) {
      return new Promise((resolve) => {
        commit('delAllVisitedViews');
        resolve([...state.visitedViews]);
      });
    },
    delAllCachedViewsAsync({ commit, state }: ActionParams) {
      return new Promise((resolve) => {
        commit('delAllCachedViews');
        resolve([...state.cachedViews]);
      });
    },
    updateVisitedViewAsync({ commit }: ActionParams, view: RouteLocation) {
      commit('updateVisitedView', view);
    }
  }
}

export default {
  // 启用命名空间
  namespaced: true,
  ...tagsView
};