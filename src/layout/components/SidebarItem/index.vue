<!--
 * @Author: zhangyang
 * @Date: 2020-12-10 15:26:18
 * @LastEditTime: 2020-12-12 13:58:46
 * @Description: 侧边栏菜单项
-->
<template>
  <div>
    <template v-if="isOne">
      <app-link v-if="item.is_show" :to="resolvePath(item.node_path)">
        <el-menu-item :index="item.node_name" :class="isNest ? '' : 'submenu-title-noDropdown'">
          <sub-item :title="item.node_name" :icon="item.icon" />
        </el-menu-item>
      </app-link>
    </template>
    <el-submenu v-else :index="item.node_name" popper-append-to-body>
      <template #title>
        <sub-item v-if="item.is_show" :title="item.node_name" :icon="item.icon" />
      </template>
      <sidebar-item v-for="child in item.part" :key="child.node_path" :item="child" :is-nest="true" :bath-path="resolvePath(child.node_path)" class="nest-menu" />
    </el-submenu>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue';
import SubItem from '../SubItem/index';
import AppLink from '../Link/index.vue';

import { NavArrItem } from '../../../store/modules/nav';
export default defineComponent({
  name: 'SidebarItem',
  components: {
    SubItem,
    AppLink
  },
  props: {
    item: { type: Object, required: true },
    isNest: { type: Boolean, default: false },
    bashPath: { type: String, default: '' }
  },
  setup(props) {
    let onlyOneChild = null;
    
    const isOne = computed(() => hasOneShowingChild((props.item as NavArrItem).part, (props.item as NavArrItem)));

    const hasOneShowingChild = (children: NavArrItem[], parent: NavArrItem) => {
      const showingChildren = children.filter((item) => {
        if (!item.is_show) {
          return false;
        } else {
          onlyOneChild = item;
          return true;
        }
      });
      if (showingChildren.length === 1) {
        return true;
      }
      if (showingChildren.length === 0) {
        onlyOneChild = {
          ...parent,
          node_path: '',
          noShowingChildren: true
        };
        return true;
      }
      return false;
    };

    const resolvePath = () => '/test';

    return {
      isOne,
      ...toRefs(props),
      resolvePath
    };
  }
});
</script>