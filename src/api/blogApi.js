import instance from './axiosInstance';

// 获取博客列表
export async function getBlogs(opt = {}) {
  const { page = 1, pageSize = 10, category = '', keyword = ''} = opt;
  const url = `/blog-service/blog/list?page=${page}&pageSize=${pageSize}&category=${category}&keyword=${keyword}`;
  return instance.get(url);
}

// 获取博客详情
export async function getBlogById(id) {
  return instance.get(`/blog-service/blog/${id}`);
}

// 创建新博客
export async function createBlog(blogData) {
  return instance.post('/blog-service/create-blog', blogData);
}

// 编辑博客
export async function editBlog(id, blogData) {
  return instance.put(`/blog-service/edit-blog/${id}`, blogData);
}

// 删除博客
export async function deleteBlog(id) {
  return instance.delete(`/blog-service/blog/${id}`);
}

// 给博客点赞
export async function likeBlog(id) {
  return instance.post(`/blog/${id}/like`);
}

// 取消博客点赞
export async function unlikeBlog(id) {
  return instance.delete(`/blog/${id}/unlike`);
}

// 收藏博客
export async function favoriteBlog(id) {
  return instance.post(`/blog/${id}/favorite`);
}

// 取消收藏博客
export async function unfavoriteBlog(id) {
  return instance.delete(`/blog/${id}/unfavorite`);
}

// 搜索博客
export async function searchBlogs(keyword) {
  return instance.get('/blogs/search', { params: { keyword } });
}

// 导出所有API接口
export default {
  getBlogs,
  getBlogById,
  createBlog,
  editBlog,
  deleteBlog,
  likeBlog,
  unlikeBlog,
  favoriteBlog,
  unfavoriteBlog,
  searchBlogs,
};
