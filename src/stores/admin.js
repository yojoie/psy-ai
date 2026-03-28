import { defineStore } from 'pinia'
import { ref } from 'vue'


//告诉 JavaScript：这个文件对外提供 useAdminStore
//这个函数不 export，其他组件就 import 不了
export const useAdminStore = defineStore('admin', () => {
  // 创建一个响应式数据，叫 isCollapsed（是否折叠）初始值是 false（没折叠）
  const isCollapsed = ref(false)
  // 切换折叠状态
  const toggleCollapsed = () => {
    isCollapsed.value = !isCollapsed.value
  }
  //把数据和方法暴露出去 其他组件才能用
  //告诉 Pinia：这个仓库暴露哪些东西给外部用
  return {
    isCollapsed,
    toggleCollapsed
  }
})