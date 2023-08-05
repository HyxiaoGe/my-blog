<script setup>
import { ref, reactive } from 'vue';
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus';
import { useRouter } from 'vue-router';
import { register } from '../api/userApi';
import useTitle from '../hooks/useTitle'

useTitle('注册')
const router = useRouter();
const registerForm = ref();

// 定义表单数据和校验规则
const formData = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  nickname: '',
});

const formRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9_]+$/,
      message: '用户名只能包含数字、字母和下划线',
      trigger: 'blur',
    },
    { min: 6, max: 20, message: '用户名长度应在6到20个字符之间', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 8, max: 20, message: '密码长度应在8到20个字符之间', trigger: 'blur' },
    // 添加更多的校验规则
    { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+=[\]{}|\\,.?/-]{8,20}$/, message: '密码必须包含至少一个小写字母、一个大写字母和一个数字', trigger: 'blur' },
    // 这里可以添加更多的密码校验规则，比如包含字母和数字等
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    // 自定义校验规则，用于校验两次输入的密码是否一致
    {
      validator: (rule, value, callback) => {
        if (value !== formData.password) {
          callback(new Error('两次输入的密码不一致'));
        } else {
          callback();
        }
      },
      trigger: 'blur',
    },
  ],
  nickname: [
    // 可以根据需要添加更多校验规则
  ],
};

// 提交表单
function handleSubmit(formEl) {
  formEl.validate(async (valid) => {
    if (valid) {
      // 表单校验通过，执行注册逻辑
      await register(formData);
    //   console.log('form data', formData);
      router.push('/login')
    } else {
      // 表单校验不通过，不执行注册逻辑
      console.log('表单校验不通过');
      return false;
    }
  });
}
</script>

<template>
  <div class="registration-form">
    <h2 class="title">注册新用户</h2>
    <el-form
      ref="registerForm"
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
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input type="password" v-model="formData.confirmPassword" class="input" />
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="formData.nickname" class="input" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit(registerForm)">注册</el-button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        已有帐号？点击<router-link to="/login">登录</router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.registration-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
}

.form {
  width: 400px;
}

.input {
  width: 75%;
}
</style>