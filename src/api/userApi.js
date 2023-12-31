import instance from './axiosInstance';

// 用户注册
export async function register(userData) {
  try {
    const response = await instance.post('/user/register', userData);
    return response;
  } catch (error) {
    console.error('用户注册失败：', error);
    throw error;
  }
}

// 用户登录
export async function login(userData) {
  try {
    const response = await instance.post('/user/login', userData);
    return response;
  } catch (error) {
    console.error('用户登录失败：', error);
    throw error;
  }
}

// 获取用户个人信息
export async function getUserInfo() {
  try {
    const response = await instance.get(`/user/me`);
    return response;
  } catch (error) {
    console.error('获取用户信息失败：', error);
    throw error;
  }
}

// 导出所有API接口
export default {
  register,
  login,
  getUserInfo,
};
