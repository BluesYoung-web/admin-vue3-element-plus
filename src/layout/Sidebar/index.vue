<!--
 * @Author: zhangyang
 * @Date: 2020-12-10 15:46:00
 * @LastEditTime: 2020-12-12 14:02:38
 * @Description: 侧边栏组件
-->
<template>
  <div :class="showLogo ? 'has-logo' : ''">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :unique-opened="false"
        :collapse="isCollapse"
        :default-active="activeMenu"
        background-color="#304156"
        active-text-color="#409EFF"
        text-color="#bfcbd9"
        mode="vertical"
      >
        <sidebar-item v-for="(route, index) in finalRoutes" :key="index + 'vdksjhgfew54654cds'" :item="route" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import Logo from '../components/Logo/index.vue';
import SidebarItem from '../components/SidebarItem/index.vue';

import { NavArrItem } from '../../store/modules/nav';

export default defineComponent({
  name: 'Sidebar',
  components: {
    Logo,
    SidebarItem
  },
  setup() {
    const showLogo = ref(true);

    const store = useStore();
    const isCollapse = computed(() => !store.getters.sidebar.opened);
  
    const leftNavArr: ComputedRef<NavArrItem[]> = computed(() => store.getters.leftArr);
    
    const finalRoutes = computed(() => leftNavArr.value.filter((item) => item.part.length > 0));
    

    const activeMenu = computed(() => {
      const route = useRoute();
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path || '';
    });

    return {
      showLogo,
      isCollapse,
      finalRoutes,
      activeMenu
    };
  }
});
</script>