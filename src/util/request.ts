/*
 * @Author: zhangyang
 * @Date: 2020-12-09 16:02:36
 * @LastEditTime: 2020-12-09 17:03:23
 * @Description: 封装不同的请求方法
 */
import net from './net';
import { getToken } from './auth';
import { Method } from 'axios';

interface ParamsObj {
  [property: string]: any;
}

/**
 * 一维对象传参(属性值皆为简单数据类型)
 */
const paramsGenerate = (args: ParamsObj) => {
  let url = '?';
  for (const i in args) {
    url = url + i + '=' + args[i] + '&';
  }
  url = url.substr(0, url.length - 1);
  return url;
};

/**
 * 不需要 token 的请求，默认 post 请求
 */
const requestWithoutToken = (param: ParamsObj, method: Method = 'post') => {
  return net({
    url: paramsGenerate(param),
    method
  });
};

/**
 * 需要 token 的普通请求，默认 post 请求
 */
const basicRequest = (param: ParamsObj, method: Method = 'post') => {
  const { token, autoid } = getToken();
  param['token'] = token;
  param['aid'] = autoid;
  return net({
    url: paramsGenerate(param),
    method
  });
};
/**
 * 文件上传
 */
const upload = (param: ParamsObj, formData: FormData) => {
  const { token, autoid } = getToken();
  param['token'] = token;
  param['aid'] = autoid;
  return net({
    url: paramsGenerate(param),
    method: 'post',
    headers: { 'Content-type': 'multipart/form-data' },
    data: formData
  });
};

export {
  requestWithoutToken,
  basicRequest,
  upload
}