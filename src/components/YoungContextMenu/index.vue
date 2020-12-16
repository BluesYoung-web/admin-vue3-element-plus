<!--
 * @Author: zhangyang
 * @Date: 2020-12-11 13:56:45
 * @LastEditTime: 2020-12-11 15:11:40
 * @Description: 上下文菜单组件
-->
<template>
  <ul
    v-show="showContextMenu"
    :style="{ left: left + 'px', top: top + 'px' }"
    class="contextmenu"
  >
    <li
      v-for="(item, index) in menuList"
      :key="index + 'fsdjfljk'"
      @click="clickHandler(item.handlerName)"
    >
      {{ item.title }}
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';

export default defineComponent({
  name: 'YoungContextMenu',
  props: {
    showContextMenu: { type: Boolean, required: true },
    left: { type: [Number, String], required: true },
    top: { type: [Number, String], required: true },
    menuList: { type: Array, required: true }
  },
  emits: ['clickItem'],
  setup(props, { emit }) {
    const clickHandler = (handler: string) => {
      emit('clickItem', handler);
    };
    return {
      clickHandler,
      ...toRefs(props)
    };
  }
});
</script>

<style lang="scss" scoped>
.contextmenu {
  margin: 0;
  background: #fff;
  z-index: 3000;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>