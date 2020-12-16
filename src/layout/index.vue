<!--
 * @Author: zhangyang
 * @Date: 2020-12-10 17:14:23
 * @LastEditTime: 2020-12-11 10:44:15
 * @Description: 整体布局
-->
<template>
  <!-- 页面整体布局 -->
  <div :class="classObj" class="app-wrapper">
    <!-- <div v-if="device === 'mobile' && sidebar.opened && null" class="drawer-bg" @click="handleClickOutside" /> -->
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div class="fixed-header">
        <nav-bar />
        <tags-view />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { NavBar, Sidebar, AppMain, TagsView } from './AppMain/index';
import { useStore } from 'vuex';
export default defineComponent({
  name: 'Layout',
  components: {
    NavBar,
    Sidebar,
    AppMain,
    TagsView
  },
  setup() {
    const store = useStore();

    const sidebar = computed(() => store.getters.sidebar);
    const device = computed(() => store.getters.device);

    const classObj = computed(() => {
      return {
        hideSidebar: !sidebar.value.opened,
        openSidebar: sidebar.value.opened,
        withoutAnimation: sidebar.value.withoutAnimation,
        mobile: device.value === 'mobile'
      };
    });

    const handleClickOutside = () => {
      store.dispatch('app/closeSideBarAsync', { withoutAnimation: false });
    }
    return {
      sidebar,
      device,
      classObj
    };
  }
});
</script>

<style lang="scss" scoped>
  @import "../styles/mixin.scss";
  @import "../styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px);
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>