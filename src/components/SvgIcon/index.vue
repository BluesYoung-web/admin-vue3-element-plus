<!--
 * @Author: zhangyang
 * @Date: 2020-12-10 14:54:02
 * @LastEditTime: 2020-12-12 11:26:24
 * @Description: SVG 图标组件
-->
<template>
  <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" />
  <svg
    v-else
    :class="svgClass"
    v-html="iconName"
  />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { isHttpUrl } from '../../util/valid';
import SvgJson from '../../assets/svg/svg'
export default defineComponent({
  name: 'SvgIcon',
  props: {
    iconClass: { type: String, required: true },
    className: { type: String, default: '' }
  },
  setup(props) {
    const isExternal = computed(() => isHttpUrl(props.iconClass));
    const iconName = computed(() => (SvgJson as any)[`${props.iconClass}`]);
    const svgClass = computed(() => {
      if (props.className) {
        return 'svg-icon ' + props.className;
      } else {
        return 'svg-icon';
      }
    });
    const styleExternalIcon = computed(() => {
      return {
        mask: `url(${props.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${props.iconClass}) no-repeat 50% 50%`
      }
    });

    return {
      isExternal,
      iconName,
      svgClass,
      styleExternalIcon
    }
  }
});
</script>

<style scoped>
.svg-icon {
  fill: currentColor;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover!important;
  display: inline-block;
}
</style>
