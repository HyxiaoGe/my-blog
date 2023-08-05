import axios from 'axios';

// 创建axios实例
const instance = axios.create({
  baseURL: 'http://localhost:3000/api', // 设置请求的base URL，根据实际情况进行修改
  timeout: 5000, // 设置请求超时时间
});

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 在请求发送前做一些处理，例如添加请求头、loading效果等
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    // 请求错误处理
    console.error('请求拦截器错误：', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  response => {
    // 在响应接收后做一些处理，例如处理全局错误提示等

    // response.data 的数据结构是 {status: xxx, data: xxx, msg: xxx}
    // 根据 status 是否是 'success' 进行成功的判断
    const resData = response.data || {};
    if (resData.status !== 'success') {
      return Promise.reject(resData.msg);
    } else {
      return resData.data;
    }

    // return response.data;
  },
  error => {
    // 响应错误处理
    console.error('响应拦截器错误：', error);
    return Promise.reject(error);
  }
);

// 封装GET请求
export function get(url, params) {
  return instance.get(url, { params });
}

// 封装POST请求
export function post(url, data) {
  return instance.post(url, data);
}

// 封装 PUT 请求
export function put(url, data) {
  return instance.put(url, data);
}

// 封装 DELETE 请求
export function del(url, data) {
    return instance.delete(url, data);
}

// 导出 api 实例
export default instance;