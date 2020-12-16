<!--
 * @Author: zhangyang
 * @Date: 2020-12-10 10:51:05
 * @LastEditTime: 2020-12-10 14:00:33
 * @Description: 弹出层组件，封装常用的按钮
-->
<template>
  <el-dialog
    v-model="showDialog"
    :title="realTitle || title"
    :width="width"
    :fullscreen="fullscreen"
    :top="top"
    :modal="modal"
    :append-to-body="appendToBody"
    :lock-scroll="lockScroll"
    :custom-class="customClass"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
    :show-close="showClose"
    :before-close="beforeClose"
    :center="center"
    :destroy-on-close="destroyOnClose"
  >
    <slot name="body" />
    <template #footer>
      <slot name="button" />
      <el-button size="mini" @click="beforeClose">取 消</el-button>
      <slot name="step1" />
      <slot name="step2" />
      <el-button size="mini" type="primary" @click="sure">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs, watchEffect } from 'vue';
import { ElMessageBox } from 'element-plus';
export default defineComponent({
  name: 'YoungDialog',
  props: {
    realTitle: { type: String, default: '' },
    width: { type: String, default: '50%' },
    fullscreen: { type: Boolean, default: false },
    top: { type: String, default: '15vh' },
    modal: { type: Boolean, default: true },
    appendToBody: { type: Boolean, default: false },
    lockScroll: { type: Boolean, default: true },
    customClass: { type: String, default: '' },
    closeOnClickModal: { type: Boolean, default: false },
    closeOnPressEscape: { type: Boolean, default: false },
    showClose: { type: Boolean, default: true },
    center: { type: Boolean, default: false },
    destroyOnClose: { type: Boolean, default: false },
    isAdd: { type: Boolean, default: false },
    isEdit: { type: Boolean, default: false },
    isMore: { type: Boolean, default: false }
  },
  emits: ['sure', 'clear'],
  setup(props, { emit }) {
    const title = computed(() => {
      let str = '新建';
      if (props.isEdit) {
        str = '编辑';
      }
      if (props.isMore) {
        str = '详情';
      }
      return str;
    });
    const showDialog = computed(() => props.isAdd || props.isMore || props.isEdit);

    const sure = () => {
      if (props.isMore) {
        emit('clear');
        return;
      }
      emit('sure');
    };
    const beforeClose = () => {
      if (props.isMore) {
        emit('clear');
        return;
      }
      ElMessageBox.confirm('数据未保存，关闭将丢失数据，确认关闭？', '提示').then(() => {
        emit('clear');
      }).catch(() => null);
    };

    return {
      ...toRefs(props),
      title,
      showDialog,
      sure,
      beforeClose
    };
  }
});
</script>
