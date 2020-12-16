<!--
 * @Author: zhangyang
 * @Date: 2020-12-12 08:46:13
 * @LastEditTime: 2020-12-12 13:38:51
 * @Description: 
-->
<template>
  <SvgIcon class="test" iconClass="dashboard" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SvgIcon from '/src/components/SvgIcon/index.vue';
export default defineComponent({
  name: '222',
  components: { SvgIcon },
  setup() {
    return {
      
    };
  }
});
</script>

<style lang="scss" scoped>
.test {
  transform: scale(0.3);
}
</style>