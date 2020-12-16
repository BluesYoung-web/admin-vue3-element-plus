/*
 * @Author: zhangyang
 * @Date: 2020-12-08 11:26:10
 * @LastEditTime: 2020-12-12 15:53:04
 * @Description: HTTP 网络请求模块
 */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessageBox, ElMessage, ElLoading } from 'element-plus';
import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type';
import { removeToken } from './auth';

/**
 * 加载动画实例
 */
let loading: ILoadingInstance;
/**
 * 开始加载
 */
const startLoading = () => {
  loading = ElLoading.service({
    lock: true,
    text: '拼命加载中...',
    background: 'rgb(255, 255, 255, 0)'
  });
};
/**
 * 结束加载
 */
const endLoading = () => {
  loading.close();
};
/**
 * 请求地址
 */
const IS_ON_LINE = (import.meta.env as any).VITE_ONLINE_FLAG;
/**
 * 本地开发版使用代理路径，打包发布版使用真实路径
 */
const BASE_URL = !!IS_ON_LINE ? (import.meta.env as any).VITE_BASE_HTTP : (import.meta.env as any).VITE_API;
/**
 * 创建 Axios 实例
 */
const net = axios.create({
  baseURL: BASE_URL,
  timeout: 1000 * 5
});
/**
 * 设置请求拦截器
 */
net.interceptors.request.use((req: AxiosRequestConfig) => {
  startLoading();
  return req;
}, (error) => {
  console.error(error);
  ElMessage.error(error);
  return Promise.reject(error);
});

enum Status {
  TOKEN_NO_USE = -1,
  OK
}

interface ResponseObj {
  status: number;
  data: any;
  msg: string;
}

/**
 * 设置响应拦截器
 */
net.interceptors.response.use((response: AxiosResponse<any>) => {
  endLoading();
  const res = response.data;
  if ((res as ResponseObj).status === Status.OK) {
    return (res as ResponseObj).data;
  } else if ((res as ResponseObj).status === Status.TOKEN_NO_USE) {
    ElMessageBox.confirm('登录信息过期，请重新登录！', '提示', {
      showCancelButton: false,
      type: 'warning'
    }).finally(() => {
      removeToken();
      location.reload();
    });
  } else {
    const ErrMsg = (res as ResponseObj).msg;
    console.error(ErrMsg);
    ElMessage.error(ErrMsg);
  }
}, (error) => {
  endLoading();
  console.error(error);
  ElMessage.error(error);
});

export default net;