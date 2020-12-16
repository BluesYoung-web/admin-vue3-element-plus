/*
 * @Author: zhangyang
 * @Date: 2020-12-10 09:01:29
 * @LastEditTime: 2020-12-10 09:55:36
 * @Description: 专门管理 sessionStorage 存储
 */
import { NavArrItem } from "../modules/nav";

enum KEYS  {
  /**
   * 存储用户信息信息
   */
  USER_INFO = 'user_info',
  /**
   * 存储用户导航栏信息
   */
  NAV_ARR = 'nav_arr',
  /**
   * 存储用户拥有访问权限的路由节点
   */
  ROLE_ROUTE = 'role_route'
};

enum ENABLE_STATUS {
  NO,
  YES
};

export interface UserInfo {
  admin_name: string;
  real_name: string;
  autoid: number;
  is_enable: ENABLE_STATUS,
  tel: string;
  role_id: number[];
  role_name: string[];
};

const setUserInfo = (userinfo: UserInfo) => {
  sessionStorage.setItem(KEYS.USER_INFO, JSON.stringify(userinfo));
};

const getUserInfo = (): UserInfo => {
  const json = sessionStorage.getItem(KEYS.USER_INFO) || '{}';
  return JSON.parse(json);
};

const setNavArr = (nav_arr: NavArrItem[]) => {
  sessionStorage.setItem(KEYS.NAV_ARR, JSON.stringify(nav_arr));
};

const getNavArr = (): NavArrItem[] => {
  const json = sessionStorage.getItem(KEYS.NAV_ARR) || '[]';
  return JSON.parse(json);
};

const setRoleRoute = (role_route: string[]) => {
  sessionStorage.setItem(KEYS.ROLE_ROUTE, JSON.stringify(role_route));
};

const getRoleRoute = (): string[] => {
  const json = sessionStorage.getItem(KEYS.ROLE_ROUTE) || '[]';
  return JSON.parse(json);
};

export {
  getUserInfo,
  setUserInfo,
  getNavArr,
  setNavArr,
  getRoleRoute,
  setRoleRoute
}