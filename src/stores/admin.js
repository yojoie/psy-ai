import { defineStore } from 'pinia'
import { ref } from 'vue'


//告诉 JavaScript：这个文件对外提供 useAdminStore
//这个函数不 export，其他组件就 import 不了
export const useAdminStore = defineStore('admin', () => {
  const isCollapse = ref(false)

  const toggleCollapse = () => {
    isCollapse.value = !isCollapse.value
  }

  const toggleCollapsed = toggleCollapse

  return {
    isCollapse,
    toggleCollapse,
    toggleCollapsed
  }
})
