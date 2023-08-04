import instance from './axiosInstance';

// 获取博客列表
export async function getBlogs() {
  return instance.get('/blogs');
}

// 获取博客详情
export async function getBlogById(id) {
  return instance.get(`/blog/${id}`);
}

// 创建新博客
export async function createBlog(blogData) {
  return instance.post('/user/create-blog', blogData);
}

// 编辑博客
export async function editBlog(id, blogData) {
  return instance.post(`/user/edit-blog/${id}`, blogData);
}

// 删除博客
export async function deleteBlog(id) {
  return instance.delete(`/user/delete-blog/${id}`);
}

// 给博客点赞
export async function likeBlog(id) {
  return instance.post(`/user/like/${id}`);
}

// 取消博客点赞
export async function unlikeBlog(id) {
  return instance.delete(`/user/unlike/${id}`);
}

// 收藏博客
export async function favoriteBlog(id) {
  return instance.post(`/user/favorite/${id}`);
}

// 取消收藏博客
export async function unfavoriteBlog(id) {
  return instance.delete(`/user/unfavorite/${id}`);
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
