/*
 * @Author: zhangyang
 * @Date: 2020-12-07 16:10:23
 * @LastEditTime: 2020-12-10 11:17:03
 * @Description: 窗口相关的 VueX
 */
import { Commit, Dispatch, StoreOptions } from "vuex";

import { get as getCookie, set as setCookie } from 'js-cookie';

const SIDE_BAR_STATUS = 'sidebarStatus';
const SIZE = 'size';

export interface Sidebar {
  /**
   * 侧边栏开启状态
   */
  opened: boolean;
  /**
   * 是否禁用动画
   */
  withoutAnimation: boolean;
}

interface AppState {
  /**
   * 侧边栏状态
   */
  sidebar: Sidebar;
  /**
   * 设备类型(PC | 移动端)
   */
  device: string;
  /**
   * 窗口大小
   */
  size: string;
}

interface ActionParams {
  dispatch: Dispatch,
  commit: Commit,
  state: AppState
}

const app: StoreOptions<any> = {
  state: () => ({
    // 侧边栏开启状态
    sidebar: {
      opened: !!getCookie(SIDE_BAR_STATUS) && (getCookie(SIDE_BAR_STATUS) ===  '1'),
      withoutAnimation: false
    },
    // 设备类型
    device: '',
    // 窗口大小
    size: getCookie(SIZE) || 'medium'
  }),
  mutations: {
    toggleSideBar: (state: AppState) => {
      state.sidebar.opened = !state.sidebar.opened;
      state.sidebar.withoutAnimation = false;
      if (state.sidebar.opened) {
        setCookie(SIDE_BAR_STATUS, '1');
      } else {
        setCookie(SIDE_BAR_STATUS, '0');
      }
    },
    closeSideBar: (state: AppState, withoutAnimation: boolean) => {
      setCookie(SIDE_BAR_STATUS, '0');
      state.sidebar.opened = false;
      state.sidebar.withoutAnimation = withoutAnimation;
    },
    toggleDevice: (state: AppState, device: string) => {
      state.device = device;
    },
    setSize: (state: AppState, size: string) => {
      state.size = size;
      setCookie(SIZE, size);
    }
  },
  actions: {
    toggleSideBarAsync({ commit, state }: ActionParams) {
      return new Promise((resolve) => {
        commit('toggleSideBar');
        resolve(state.sidebar);
      });
    },
    closeSideBarAsync({ commit, state }: ActionParams, { withoutAnimation }: Sidebar) {
      return new Promise((resolve) => {
        commit('closeSideBar', withoutAnimation);
        resolve(state.sidebar);
      });
    },
    toggleDeviceAsync({ commit, state }: ActionParams, device: string) {
      return new Promise((resolve) => {
        commit('toggleDevice', device);
        resolve(state.device);
      });
    },
    setSizeAsync({ commit, state }: ActionParams, size: string) {
      return new Promise((resolve) => {
        commit('setSize', size);
        resolve(state.size);
      });
    }
  }
}

export default {
  // 启用命名空间
  namespaced: true,
  ...app
};