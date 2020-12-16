/*
 * @Author: zhangyang
 * @Date: 2020-11-12 10:21:58
 * @LastEditTime: 2020-12-08 14:22:25
 * @Description: 深度克隆
 */
import { isArray } from './isType';
export default function deepClone(obj: any) {
  // 常见的 非 值
  if ([null, undefined, NaN, false].includes(obj)) {
    return obj;
  }
  // 原始数据类型
  if (typeof obj !== 'object' && typeof obj !== 'function') {
    return obj;
  }
  const temp:any = isArray(obj) ? [] : {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 子属性值是否为复杂数据类型
      temp[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key];
    }
  }
}