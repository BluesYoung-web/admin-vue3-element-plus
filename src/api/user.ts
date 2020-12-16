/*
 * @Author: zhangyang
 * @Date: 2020-12-09 15:56:27
 * @LastEditTime: 2020-12-10 09:13:07
 * @Description: 用户相关的请求接口
 */
import { requestWithoutToken, basicRequest } from '../util/request';

enum Params {
  com = 10000
};

const login = async (username: string, password: string) => {
  const task = 1;
  const params = {
    com: Params.com,
    task,
    login_name: username,
    login_code: password
  };

  return await requestWithoutToken(params);
};

const getUserInfo = async () => {
  const task = 3;
  const params = {
    com: Params.com,
    task
  };

  return await basicRequest(params);
}

export {
  login,
  getUserInfo
}
