<script setup>
import useTitle from '../hooks/useTitle'
import { ref, reactive, watch } from 'vue';
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus';
import { useRouter } from 'vue-router';
import { login } from '../api/userApi';
import { useUserStore } from '../stores/user';
import useNavToHome from '../hooks/useNavToHome';

const router = useRouter();

const { userInfo } = useUserStore();
// 监听 userInfo.username 的变化，如果有值，说明用户已经登录，跳转到首页
watch(() => userInfo.username, (val) => {
  if (val) {
    router.push('/');
  }
}, { immediate: true });

// 如果用户已经登录，则跳转到首页
useNavToHome();

useTitle('登录')

const loginForm = ref();

const formData = reactive({
  username: '',
  password: '',
});

const formRules = {
    username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含数字、字母和下划线', trigger: 'blur' },
    { min: 6, max: 20, message: '用户名长度应在6到20个字符之间', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 8, max: 20, message: '密码长度应在8到20个字符之间', trigger: 'blur' },
    // 添加更多的校验规则
    { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+=[\]{}|\\,.?/-]{8,20}$/, message: '密码必须包含至少一个小写字母、一个大写字母和一个数字', trigger: 'blur' },
  ],
};

// 处理登录逻辑
function handleLogin(formEl) {
    formEl.validate(async (valid) => {

      if (!valid) {
        console.log('表单校验不通过');
        return false;
      }

    if (valid) {
      // 表单校验通过，执行登录逻辑
        const { token } = await login(formData);
      // 将 token 存储到 localStorage 中
      localStorage.setItem('token', token);
      router.push('/');
      // 这里可以添加登录逻辑，比如将用户信息提交到后端进行验证
    } else {
      // 表单校验不通过，不执行登录逻辑
      console.log('表单校验不通过');
    }
  });
}

</script>

<template>
  <div class="login-form">
    <h2 class="title">用户登录</h2>
    <el-form
      ref="loginForm"
      :model="formData"
      :rules="formRules"
      label-width="80px"
      class="form"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formData.username" class="input" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="formData.password" class="input" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin(loginForm)">登录</el-button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        新用户请<router-link to="/register">注册</router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
}

.form {
  width: 400px;
}

/* 统一输入框样式 */
.input {
  width: 75%;
  margin-left: 20px; /* 调整左侧对齐的间距，可以根据需要调整 */
}
</style>