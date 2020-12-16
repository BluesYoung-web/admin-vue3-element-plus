/*
 * @Author: zhangyang
 * @Date: 2020-12-08 11:15:26
 * @LastEditTime: 2020-12-09 17:04:18
 * @Description: 用户身份认证 Cookie
 */
import { get, set, remove } from 'js-cookie';

const TONKEN_KEY = 'www.bluesyoung-web.top';

/**
 * 获取 Token
 */
const getToken = () => {
  const token = get(TONKEN_KEY) || '{}'
  return JSON.parse(token);
};

export interface UserKey {
  admin_id: number;
  token: string;
}
/**
 * 设置 Token
 * @param key 后端返回的用户信息 
 */
const setToken = (key: UserKey) => {
  const { token, admin_id: autoid } = key;
  return set(TONKEN_KEY, { token, autoid });
};
/**
 * 删除 Token，退出登录
 */
const removeToken = () => {
  return remove(TONKEN_KEY);
};

export {
  getToken,
  setToken,
  removeToken
}