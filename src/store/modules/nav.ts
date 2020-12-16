/*
 * @Author: zhangyang
 * @Date: 2020-12-08 09:26:11
 * @LastEditTime: 2020-12-12 14:04:22
 * @Description: 导航栏相关的 Vuex
 */
import { Commit, Dispatch, StoreOptions } from "vuex";

enum SHOW_STATE {
  NOT_SHOW,
  SHOW
}

export interface NavArrItem {
  /**
   * 节点唯一 id，自增
   */
  autoid: number;
  /**
   * 是否节点显示
   * 0-不显示，1-显示
   */
  is_show: SHOW_STATE;
  /**
   * 节点描述
   */
  node_desc: string;
  /**
   * 节点名称
   */
  node_name: string;
  /**
   * 节点路径
   */
  node_path: string;
  /**
   * 节点排序标志
   */
  node_sort: number;
  /**
   * 节点层级
   */
  node_type: number;
  /**
   * 此节点父节点的唯一 id
   */
  parent_id: number;
  /**
   * 此节点下的子节点
   */
  part: NavArrItem[];
  /**
   * 图标名称
   */
  icon?: string;
}

interface NavState {
  /**
   * 左边导航栏的内容
   */
  leftArr: NavArrItem[];
}

interface ActionParams {
  commit: Commit;
  dispatch: Dispatch;
  state:NavState
}

const nav: StoreOptions<any> = {
  state: () => ({
    leftArr: []
  }),
  mutations: {
    setLeftArr(state: NavState, arr: NavArrItem[]) {
      state.leftArr = arr;
    }
  },
  actions: {
    setLeftArrAsync({ commit, state }: ActionParams, arr: NavArrItem[]) {
      return new Promise((resolve) => {
        commit('setLeftArr', arr);
        resolve(state.leftArr);
      });
    }
  }
};

export default {
  namespaced: true,
  ...nav
}