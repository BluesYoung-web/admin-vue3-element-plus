/*
 * @Author: zhangyang
 * @Date: 2020-12-10 08:57:28
 * @LastEditTime: 2020-12-10 11:22:43
 * @Description: 获取用户详细信息及其拥有权限的路由
 */
import { getUserInfo } from '../api/user';
import { NavArrItem } from './../store/modules/nav';
import { isArray } from './isType';
import { setUserInfo, setNavArr, setRoleRoute, UserInfo, getRoleRoute } from '../store/sessionStorage/index';

let role_route: string[] = [];

const generateRoleRoute = (arr: NavArrItem[], num?: number): string[] => {
  if (num === 1) {
    role_route = [];
  }
  for (const item of arr) {
    item.node_path && role_route.push(item.node_path);
    // 子节点递归遍历
    if (isArray(item.part) && item.part.length > 0) {
      const part = JSON.parse(JSON.stringify(item.part));
      // 尾递归优化
      generateRoleRoute(part);
    }
  }
  return role_route;
};

const generateUserInfo = async () => {
  const infoObj = await getUserInfo();
  if (infoObj) {
    const {
      admin_name,
      real_name,
      role_id,
      role_name,
      is_enable,
      autoid,
      phone_number,
      menuBar
    } = infoObj as any;
    const userInfo: UserInfo = {
      admin_name,
      autoid,
      real_name,
      role_id,
      role_name: isArray(role_name) ? role_name : [role_name],
      is_enable,
      tel: phone_number || ''
    };
    const navArr: NavArrItem[] = menuBar;
    const roleRoute: string[] = generateRoleRoute(navArr, 1);
  
    setUserInfo(userInfo);
    setNavArr(navArr);
    setRoleRoute(roleRoute);
  } else {
    return;
  }
};

export {
  generateUserInfo
};