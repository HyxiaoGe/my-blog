import axios from 'axios'

// 创建axios实例
const instance = axios.create({
  // baseURL: 'http://localhost:3000/api/', // 设置请求的base URL，根据实际情况进行修改
  baseURL: 'http://www.hyxiaoblog.com/api/',
  timeout: 30000 // 设置请求超时时间
})

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    const resData = response.data || {}
    if (resData.status !== 200) {
      return Promise.reject(resData.msg)
    } else {
      return resData.data
    }
  },
  (error) => {
    // 响应错误处理
    console.error('响应拦截器错误：', error)
    return Promise.reject(error)
  }
)

// 封装GET请求
export function get(url, params) {
  return instance.get(url, { params })
}

// 封装POST请求
export function post(url, data) {
  return instance.post(url, data)
}

// 封装 PUT 请求
export function put(url, data) {
  return instance.put(url, data)
}

// 封装 DELETE 请求
export function del(url, data) {
  return instance.delete(url, data)
}

// 导出 api 实例
export default instance
