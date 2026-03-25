<template>
  <el-aside width="264px">
    <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
      <!-- 遍历路由配置中的子路由 -->
        <el-menu-item v-for="item in router.options.routes[0].children" :key="item.path" :index="item.path">
          <!--动态渲染图标-->
          <el-icon><component :is="item.meta.icon" /></el-icon>
          <span>{{item.meta.title}}</span>
        </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script setup>
// 引入路由模块
import { useRouter } from 'vue-router';
const router = useRouter();
console.log(router,'router');
// 处理打开侧边栏事件
const handleOpen = () => {
  
}
const handleClose = () => {
  
}
</script>