<!--
 * @Author: zhangyang
 * @Date: 2020-12-10 10:10:36
 * @LastEditTime: 2020-12-10 10:32:15
 * @Description: 顶部导航(一级节点)
-->
<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item v-for="(route, index) in routes" :key="index" :item="route" :index="route.node_name" v-text="route.node_name" />
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { getNavArr } from '../../../store/sessionStorage/index';
import { useStore } from 'vuex';
export default defineComponent({
  name: 'HeadNav',
  setup() {
    // 获取顶部导航栏数据(一级节点)
    const routes = computed(() => getNavArr().filter((item) => item.is_show === 1));
    const store = useStore();
    // 设置对应的侧边导航栏数据(二级节点及以后)
    store.dispatch('nav/setLeftArrAsync', routes.value[0].part);

    // 初始激活标签
    let activeIndex = ref(routes.value[0].node_name);

    const handleSelect = (key: string) => {
      routes.value.forEach((item) => {
        item.node_name === key && store.dispatch('nav/setLeftArrAsync', item.part);
      });
    }

    return {
      routes,
      activeIndex,
      handleSelect
    }
  }
});
</script>

<style scoped>
  .el-menu--horizontal > .el-menu-item {
    height: 50px;
    line-height: 50px;
  }
</style>
