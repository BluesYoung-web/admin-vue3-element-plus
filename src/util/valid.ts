/*
 * @Author: zhangyang
 * @Date: 2020-11-12 10:59:58
 * @LastEditTime: 2020-12-08 14:19:41
 * @Description: 常用的正则验证函数
 */
import { isString, isArray, isObject } from './isType';
/**
 * 验证是否为合法的 email
 * @param {string} email 
 */
function isEmail(email: string) {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(email);
}
/**
 * 验证是否为合法的手机号
 * @param {string} tel 
 */
function isMobile(tel: string) {
  return /^1[23456789]\d{9}$/.test(tel);
}
/**
 * 验证是否为合法的 http url
 * @param {string} url 
 */
function isHttpUrl(url: string) {
  return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(url);
}
/**
 * 验证是否为合法的 websocket url
 * @param {string} url 
 */
function isWebSocketUrl(url: string) {
  return /ws(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(url);
}
/**
 * 验证是否为合法的日期格式
 * @param {string} date 
 */
function isDate(date: string | number | Date) {
  return !/Invalid|NaN/.test(new Date(date).toString());
}
/**
 * 验证是否为合法的ISO日期格式
 * @param {string} date 
 */
function isISODate(date: string) {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(new Date(date).toString());
}
/**
 * 是否为十进制数
 * @param {number} num
 */
function isDecimal(num: string | number) {
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(num + '');
}
/**
 * 是否为整数
 * @param {number} num
 */
function isInteger(num: string | number) {
  return /^\d+$/.test(num + '');
}
/**
 * 是否为合法的身份证
 * @param {number} id 
 */
function isIdCard(id: string | number) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(id + '');
}
/**
 * 是否为合法车牌号
 * @param {string} value 
 */
function isLicensePlate(value: string) {
	// 新能源车牌
	const xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
	// 旧车牌
	const creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
	if (value.length === 7) {
		return creg.test(value);
	} else if (value.length === 8) {
		return xreg.test(value);
	} else {
		return false;
	}
}
/**
 * 是否为中文（不包含标点符号）
 * @param {string} str 
 */
function isChinese(str: string) {
  return /^[\u4e00-\u9fa5]+$/gi.test(str);
}
/**
 * 是否为英文字母
 * @param {string} str 
 */
function isLetter(str: string) {
  return /^[a-zA-Z]+$/.test(str);
}
/**
 * 是否为合法的座机号码
 * @param {string} value 
 */
function isLandline(value: string) {
	return /^\d{3,4}-\d{7,8}(-\d{3,4})?$/.test(value);
}
/**
 * 是否为 JSON 字符串
 * @param {string} str 
 */
function isJsonStr(str: any) {
  if (isString(str)) {
    try {
      const obj = JSON.parse(str);
      if (isObject(obj) || isArray(obj)) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
  return false;
}
export {
  isEmail,
  isMobile,
  isHttpUrl,
  isWebSocketUrl,
  isDate,
  isISODate,
  isDecimal,
  isInteger,
  isIdCard,
  isLicensePlate,
  isChinese,
  isLetter,
  isLandline,
  isJsonStr
}