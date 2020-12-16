<!--
 * @Author: zhangyang
 * @Date: 2020-12-10 14:41:26
 * @LastEditTime: 2020-12-10 14:46:51
 * @Description: 点击跳转组件(内部 / 外链)
-->
<template>
  <a v-if="linkProps(to) === 'a'" href="to" target="_blank" rel="noopener">
    <slot />
  </a>
  <router-link v-else to="to">
    <slot />
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { isHttpUrl } from '../../../util/valid';
export default defineComponent({
  name: 'Link',
  props: {
    to: { type: String, required: true }
  },
  setup() {
    const linkProps = (url: string) => {
      if (isHttpUrl(url)) {
        return 'a';
      } else {
        return 'router-link'
      }
    }
    return {
      linkProps
    };
  }
});
</script>