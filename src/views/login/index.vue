<!--
 * @Author: zhangyang
 * @Date: 2020-12-03 14:25:49
 * @LastEditTime: 2020-12-10 11:50:04
 * @Description: 登录
-->
<template>
  <!-- 登录 -->
  <div class="main">
    <el-card class="login-card">
    <div class="login-container">
      <el-form
        ref="loginRef"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        @keyup.enter="loginHandler"
      >
      <div class="title-container">
        <h3 class="title">管理员登录</h3>
      </div>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" placeholder="请输入账户" tabindex="1" auto-complete="on" size="large" clearable />
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" placeholder="请输入密码" type="password" tabindex="2" auto-complete="on" size="large" clearable  />
      </el-form-item>
      <el-button :loading="loading" type="primary" size="large" style="width: 100%; margin-bottom: 30px" @click="loginHandler">登 录</el-button>
    </el-form>
    </div>
  </el-card>
  </div>
</template>

<script lang="ts">
import { ref, reactive, toRefs, watch, defineComponent, Ref } from 'vue';
import { login } from '../../api/user';
import { setToken, UserKey } from '../../util/auth';
import { generateUserInfo } from '../../util/generateUserInfo';
import { ElMessage } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
import { LoginRule } from '../../../src/form.d';

interface LoginForm {
  username: string;
  password: string;
}

export default defineComponent({
  name: 'Login',
  setup() {
    /**
     * 路由实例，记录当前路径之类的
     */
    const route = useRoute();
    const redirect = route.query?.redirect??'/';
    /**
     * 路由器实例，负责改变路由
     */
    const router = useRouter();
    
    const loginRef: Ref = ref(null);
    const loginForm: LoginForm = reactive({
      username: '',
      password: ''
    });
    const loginRules: LoginRule = reactive({
      username: [
        {
          required: true,
          type: 'string',
          trigger: 'blur',
          message: '请输入账户'
        }
      ],
      password: [
        {
          required: true,
          type: 'string',
          trigger: 'blur',
          message: '请输入密码'
        }
      ]
    });

    let loading = ref(false);

    const loginHandler = () => {
      loginRef.value?.validate(async (valid: boolean) => {
        if (valid) {
          loading.value = true;
          const data = await login(loginForm.username, loginForm.password);
          if (data) {
            setToken(data as unknown as UserKey);
            await generateUserInfo();
            loading.value = false;
            router.push(redirect as string);
          }
        } else {
          ElMessage.error('请仔细检查表单内容');
          return;
        }
      });
    }

    return {
      loading,
      loginHandler,
      loginRef,
      loginForm,
      loginRules
    }
  }
});
</script>

<style lang="scss">

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

.main {
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.98;
  height: 100%;
}

.login-card {
  width: 600px;
}

.login-container {
  background-color: $light_gray;
}

.login-container {
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 80px 35px;
    margin: 0 auto;
    overflow: hidden;
  }

  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $bg;
      margin: 0px auto 60px auto;
      text-align: center;
      font-weight: bold;
    }
  }

}
</style>
