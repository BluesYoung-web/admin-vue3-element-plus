<!--
 * @Author: zhangyang
 * @Date: 2020-12-03 14:25:14
 * @LastEditTime: 2020-12-10 17:54:16
 * @Description: 测试
-->
<template>
  <h1>来了老弟</h1>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
export default defineComponent({
  name: 'Test',
  setup() {
    const store = useStore();
    const size = computed(() => store.getters.size)
      store.dispatch('app/setSizeAsync', 'small')
    return {
      size
    }
  }
})
</script>