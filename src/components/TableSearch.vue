<template>
  <el-form :model="formData">
    <template v-for="item in props.formItem" :key="item.prop">
      <el-form-item :label="item.label" :prop="item.prop">
        <component
          :is="isComp(item.comp)"
          v-model="formData[item.prop]"
          :placeholder="item.placeholder"
          clearable
          style="width: 220px"
        >
          <template v-if="item.comp === 'select'">
            <!-- 写死的选项 -->
             <el-option label="全部" value=""></el-option>
            <el-option
              v-for="opt in item.options"
              :key="opt.value"
              :label="opt.label"
              :value="opt.value"
            />
          </template>
        </component>
      </el-form-item>
    </template>
    <el-form-item>
      <el-button type="primary" @click="$emit('search', formModel)">搜索</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElInput, ElSelect } from 'element-plus'

//表单数据
const formData = reactive({})

// 接收父组件传递过来的formItem数组
const props = defineProps({
  formItem: {
    //它必须是数组，如果你不给我，我就默认用 []，而且数组 / 对象必须用函数返回
    type: Array,
    default: () => []
  }
})

defineEmits(['search'])
const formModel = reactive({})

// 定义一个函数，判断组件是否存在
const isComp = (comp) => {
  return {
    // 用组件对象映射，避免字符串动态组件解析失败
    input: ElInput,
    select: ElSelect,
  }[comp]
}
</script>
