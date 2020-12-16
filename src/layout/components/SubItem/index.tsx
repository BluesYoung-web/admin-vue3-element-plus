/**
 * @Author: zhangyang
 * @Date: 2020-12-10 14:47:44
 * @LastEditTime: 2020-12-10 14:47:45
 * @Description: 子组件
 */

import { defineComponent } from 'vue';
export default defineComponent({
  name: 'SubItem',
  props: {
    icon: { type: String, default: '' },
    title: { type: String, default: '' }
  },
  setup(props) {
    return () => (
      <>
        <i class={ props.icon ? 'el-icon-' + props.icon : '' }></i>
        <span id="title">{ props.title }</span>
      </>
    );
  }
});