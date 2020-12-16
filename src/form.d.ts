/*
 * @Author: zhangyang
 * @Date: 2020-12-10 11:48:14
 * @LastEditTime: 2020-12-10 11:49:00
 * @Description: 接口定义
 */
export interface Rule {
  required?: boolean;
  type?: string;
  trigger: string | string[];
  message?: string;
  validator?: () => void;
}

export interface LoginRule {
  [propname: string]: Rule[];
}