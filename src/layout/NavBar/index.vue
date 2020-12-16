<!--
 * @Author: zhangyang
 * @Date: 2020-12-10 11:30:30
 * @LastEditTime: 2020-12-11 17:03:24
 * @Description: 顶部导航栏组件
-->
<template>
  <!-- 导航栏组件 -->
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleClick" />
    <head-nav />
    <!-- 右侧个人中心下拉框 -->
    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click" size="large">
        <div class="avatar-wrapper">
          <img src="/src/assets/img/head.png" class="user-avatar">
          <span class="role-name">
            <p style="margin-top: 3px">{{ admin_name }}</p>
            <p>{{ role_name }}</p>
          </span>
          <i class="el-icon-caret-bottom" />
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>
                Home
              </el-dropdown-item>
            </router-link>
            <el-dropdown-item @click="isEdit = true">
              修改密码
            </el-dropdown-item>
            <el-dropdown-item divided @click="loginOut">
              <div>退出登录</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <!-- 修改密码的弹框 -->
    <young-dialog
      :is-edit="isEdit"
      real-title="修改密码"
      width="500px"
      @sure="saveHandler"
      @clear="closeHandler"
    >
      <template #body>
        <el-form ref="formRef" :model="form" :rules="formRules" label-width="70px">
          <el-form-item prop="old_pwd" label="原密码">
            <el-input v-model="form.old_pwd" placeholder="请输入原密码" type="password" size="small" />
          </el-form-item>
          <el-form-item prop="new_pwd" label="新密码">
            <el-input v-model="form.new_pwd" placeholder="请输入新密码" type="password" size="small" />
          </el-form-item>
          <el-form-item prop="new_pwd_again" label="确认密码">
            <el-input v-model="form.new_pwd_again" placeholder="请再次输入新密码" type="password" size="small" />
          </el-form-item>
        </el-form>
      </template>
    </young-dialog>
  </div>
</template>

<script lang="ts">
import { ref, reactive, computed, ComputedRef, defineComponent, watch } from 'vue';
import { useStore } from 'vuex';
import { Sidebar } from '../../store/modules/app';
import { getUserInfo } from '../../store/sessionStorage/index';

import Hamburger from '../components/Hamburger/index.vue';
import HeadNav from '../components/HeadNav/index.vue';
import YoungDialog from '/src/components/YoungDialog/index.vue';
import { LoginRule } from '../../form.d';
export default defineComponent({
  name: 'NavBar',
  components: {
    YoungDialog,
    Hamburger,
    HeadNav
  },
  setup() {
    const store = useStore();
    
    const sidebar: ComputedRef<Sidebar> = computed(() => store.getters.sidebar);

    const toggleClick = () => {
      store.dispatch('app/toggleSideBarAsync');
    };

    const formRef = ref(null);
    const form = reactive({
      old_pwd: '',
      new_pwd: '',
      new_pwd_again: ''
    });
    const formRules: LoginRule = reactive({
      old_pwd: [
        { required: true, message: '请输入原始密码', trigger: 'blur' }
      ],
      new_pwd: [
        { required: true, message: '请输入新密码', trigger: 'blur' }
      ],
      new_pwd_again: [
        { required: true, message: '请再次输入新密码', trigger: 'blur' }
      ]
    });

    const isEdit = ref(false);
    const admin_name = computed(() => getUserInfo().admin_name);
    const role_name = computed(() => getUserInfo().role_name[0]);

    const loginOut = () => console.log('退出登录');
    const saveHandler = () => {
      console.log('确认修改');
      isEdit.value = false;
    };
    const closeHandler = () => {
      console.log('取消修改');
      isEdit.value = false;
    };
    

    return {
      sidebar,
      toggleClick,
      formRef,
      form,
      formRules,
      isEdit,
      admin_name,
      role_name,
      loginOut,
      saveHandler,
      closeHandler
    }
  }
});
</script>

<style lang="scss" scoped>
  .navbar {
    height: 50px;
    width: 100%;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
    display: flex;
    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background .3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, .025);
      }
    }
  }
  .right-menu {
    position: absolute;
    float: right;
    right: 10px;
    height: 100%;
    width: 150px;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;
    }

    &.hover-effect {
      cursor: pointer;
      transition: background .3s;

      &:hover {
        background: rgba(0, 0, 0, .025);
      }
    }
  }

  .avatar-container {
    margin-right: 30px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      display: flex;
      position: relative;

      .role-name {

        display: inline;
        line-height: 20px;
        p {
          margin: 0;
        }
      }
      .user-avatar {
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 10px;
        margin: 0 10px 0 0;
      }
      .el-icon-caret-bottom {
        cursor: pointer;
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
</style>
