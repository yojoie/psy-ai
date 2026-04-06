<template>
  <div class="page-head">
    <p class="page-title">{{ props.title }}</p>
    <!-- 插槽 -->
    <div class="action-btn">
      <slot name="buttons"></slot>
    </div>    
  </div>
</template>

<script setup>
//从父组件当中获取title数据（在父组件的模板里，调用子组件的那一行）
const props = defineProps({
  title: {
    type: String,//属性类型
    default: '页面标题'//默认值
  }
})
</script>

<style setup lang="scss">
.page-head {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .page-title {
    font-size: 24px;
    color: #2d3748;
  }
}
</style>
