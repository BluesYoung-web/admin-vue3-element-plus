/*
 * @Author: zhangyang
 * @Date: 2020-11-12 10:23:05
 * @LastEditTime: 2020-12-08 14:13:29
 * @Description: 判断变量的类型
 */
function isArray(arr: any) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}
function isObject(obj: any) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}
function isNumber(num: any) {
  return Object.prototype.toString.call(num) === '[object Number]';
}
function isString(str: any) {
  return Object.prototype.toString.call(str) === '[object String]';
}
function isBoolean(bool: any) {
  return Object.prototype.toString.call(bool) === '[object Boolean]';
}
function isNull(n: any) {
  return Object.prototype.toString.call(n) === '[object Null]';
}
function isUndefined(u: any) {
  return Object.prototype.toString.call(u) === '[object Undefined]';
}
function isMap(m: any) {
  return Object.prototype.toString.call(m) === '[object Map]';
}
function isWeakMap(m: any) {
  return Object.prototype.toString.call(m) === '[object WeakMap]';
}
function isSet(s: any) {
  return Object.prototype.toString.call(s) === '[object Set]';
}
function isWeakSet(s: any) {
  return Object.prototype.toString.call(s) === '[object WeakSet]';
}
function isArrayBuffer(s: any) {
  return Object.prototype.toString.call(s) === '[object ArrayBuffer]';
}
function isRegExp(reg: any) {
  return Object.prototype.toString.call(reg) === '[object RegExp]';
}
function isFunction(f: any) {
  return Object.prototype.toString.call(f) === '[object Function]';
}
function isSymbol(s: any) {
  return Object.prototype.toString.call(s) === '[object Symbol]';
}
export {
  isArray,
  isObject,
  isNumber,
  isString,
  isBoolean,
  isNull,
  isUndefined,
  isMap,
  isWeakMap,
  isSet,
  isWeakSet,
  isArrayBuffer,
  isRegExp,
  isFunction,
  isSymbol
}