<template>
  <!--侧边栏-->
  <el-aside width="264px">
    <el-menu
        class="menu-style"
      >
      <!-- 侧边栏顶部logo -->
      <div class="brand">
        <el-image style="width: 50px; height: 50px;margin-right: 10px;" :src="iconUrl" alt="logo" />
        <span class="info-card">
          <h1 class="brand-title">心理健康AI助手</h1>
          <p class="brand-subtitle">管理后台</p>
        </span>
      </div>
      <!-- 侧边栏菜单 -->
        <!-- 遍历路由配置中的子路由 -->
        <el-menu-item @click="selectMenu" v-for="item in router.options.routes[0].children" :key="item.path" :index="item.path">
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
// 引入机器人图标，保障打包之后的路径没有问题
const iconUrl = new URL('@/assets/images/机器人.png',import.meta.url).href
console.log(router,'router');
// 处理点击菜单事件，key为点击的菜单路径，默认传入的是index
const selectMenu = (key) => {
  console.log(key,'key')
  const currentRoute = router.options.routes[0]
  //动态拼接二级路由路径
  console.log(`${currentRoute.path}/${key}`)//点击菜单后，拼接当前路由路径和点击的菜单路径，形成完整的路由
  router.push(`${currentRoute.path}/${key}`)//点击菜单后，跳转到对应的路由   
  }

</script>

<style lang="scss" scoped>
// 侧边栏样式
.menu-style {
  height: 100%;
  .brand {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: #fff;
  border-bottom: 1px solid #e5e7ed;
  .info-card {
    .brand-title {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 5px;
        color: #1f2937;
    }
    .brand-subtitle {
        font-size: 14px;
        color: #606266;
    }
  }
}
}


</style>
