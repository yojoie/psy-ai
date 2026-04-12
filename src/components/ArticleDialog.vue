<template>
  <el-dialog
    title="文章详情"
    v-model:visible="dialogVisible"
    width="50%"
    @close="handleClose"
  >
  </el-dialog>

</template>

<script setup>
import { ref } from 'vue'

defineProps({
  dialogVisible: {
    type: Boolean,
    default: false
  }
})
//const dialogVisible = ref(false)
//关闭弹窗
const handleClose = () => {
  dialogVisible.value = false
}
</script>
