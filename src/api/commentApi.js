import instance from './axiosInstance';

// 获取博客评论列表
export async function getComments(blogId) {
  try {
    const response = await instance.get(`/comment/blog_comment/${blogId}`);
    return response;
  } catch (error) {
    console.error('获取博客评论列表失败：', error);
    throw error;
  }
}

// 创建评论
export async function createComment(blogId, content) {
  try {
    console.log('blogId:', blogId);
    const response = await instance.post(`/comment`, { blogId, content });
    console.log('response:', response);
    return response;
  } catch (error) {
    console.error('创建评论失败：', error);
    throw error;
  }
}

// 删除评论
export async function deleteComment(blogId, commentId) {
  try {
    const response = await instance.delete(`/comment/blog/${blogId}/comment/${commentId}`);
    return response;
  } catch (error) {
    console.error('删除评论失败：', error);
    throw error;
  }
}

// 导出所有API接口
export default {
  getComments,
  createComment,
  deleteComment,
};
