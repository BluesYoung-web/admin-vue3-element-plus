<!--
 * @Author: zhangyang
 * @Date: 2020-12-11 11:16:27
 * @LastEditTime: 2020-12-11 15:28:31
 * @Description: 
-->
<template>
  <ScrollPane>
    <el-tag
      v-for="(item, index) in new Array(30)"
      :key="index + 'fd1sf324'"
      closable
      type="success"
      size="large"
      @contextmenu.prevent="openContextMenu"
    >
      {{ '来了老弟' + index }}
    </el-tag>
  </ScrollPane>
  <YoungContextMenu
    :show-context-menu="showContextMenu"
    :left="left"
    :top="top"
    :menu-list="menuList"
    @clickItem="clickItemHandler"
  />
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import ScrollPane from '../../layout/components/ScrollPane/index.vue'
import YoungContextMenu from '/src/components/YoungContextMenu/index.vue';

export default defineComponent({
  name: 'T',
  components: { ScrollPane, YoungContextMenu },
  setup() {
    const showContextMenu = ref(false);
    const left = ref(0);
    const top = ref(0);
    const menuList = reactive([
      { title: '刷新此页面', handlerName: 'refresh' },
      { title: '关闭此页面', handlerName: 'closeThis' },
      { title: '关闭其他页面', handlerName: 'closeOthers' },
      { title: '关闭所有页面', handlerName: 'closeAll' }
    ]);

    interface Handlers {
      [props: string] : () => void
    };

    const menuHandlers: Handlers = {
      'refresh': () => {
        console.log('刷新');
      },
      'closeThis': () => {
        console.log('关闭此页面');
      },
      'closeOthers': () => {
        console.log('关闭其他');
      },
      'closeAll': () => {
        console.log('关闭全部');
      }
    };

    const clickItemHandler = (handler: string) => {
      menuHandlers[handler] && menuHandlers[handler]();
      showContextMenu.value = false;
    };
    const store = useStore();
    const openContextMenu = (e: MouseEvent) => {
      const menuMinWidth = 105;
      const sideWidth = 210;
      const screenWidth = window.innerWidth;
      const normal = e.clientX - sideWidth;
      left.value = (normal + menuMinWidth + 200 < screenWidth) ? normal : (normal - menuMinWidth);
      const opened = store.getters.sidebar.opened;
      !opened && (left.value += 156);
      top.value = e.clientY;
      showContextMenu.value = true;
    }

    return {
      showContextMenu,
      left,
      top,
      menuList,
      clickItemHandler,
      openContextMenu
    };
  }
});
</script>