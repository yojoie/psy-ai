<template>
  <el-form ref="formRef" :model="formData">
    <el-row :gutter="24">
    <template v-for="item in formItemAttrs" :key="item.prop">
      <el-col v-bind="item.col">
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
      </el-col>
    </template>
    </el-row>
    <el-row>
      <el-button type="primary" @click="handleSearch">查询</el-button>
      <el-button  @click="handleReset(formRef)"> 重置</el-button>
    </el-row>
  </el-form>
</template>

<script setup>
import { ref, reactive ,computed} from 'vue'
import { ElInput, ElSelect } from 'element-plus'

//表单数据
const formRef = ref(null)

const formData = reactive({})

// 接收父组件传递过来的formItem数组
const props = defineProps({
  formItem: {
    //它必须是数组，如果你不给我，我就默认用 []，而且数组 / 对象必须用函数返回
    type: Array,
    default: () => []
  }
})

// 定义一个事件，用于触发搜索
const emit = defineEmits(['search'])

// 计算属性，根据formItem动态生成表单项
const formItemAttrs = computed(()=>{
  const{formItem} = props
  formItem.forEach(item=>{
    // 给每个表单项添加默认的col属性,来确定不同的屏幕宽度适应不同的组件格数
    item.col={xs:24,sm:12,md:8,lg:6,xl:6}
  })
  return formItem
})

// 定义一个函数，判断组件是否存在
const isComp = (comp) => {
  return {
    // 用组件对象映射，避免字符串动态组件解析失败
    input: ElInput,
    select: ElSelect,
  }[comp]
}

// 搜索方法
const handleSearch = () => {
  // 触发搜索事件，传递表单数据
  emit('search', formData)
}

// 重置方法
const handleReset = (formRef) => {
  if(formRef){
    formRef.resetFields()
  }
  else return
  emit('search', formData)
}
</script>
