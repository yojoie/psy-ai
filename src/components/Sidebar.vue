<template>
  <!--侧边栏-->
  <el-aside :width="isCollapse ? '64px' : '264px'">
    <el-menu
        class="menu-style"
        :collapse="isCollapse"
        :default-active="activeMenu"
        :collapse-transition="false"
        @select="selectMenu"
      >
      <!-- 侧边栏顶部logo -->
      <div class="brand">
        <el-image :style="{ width: '50px', height: '50px', marginRight: isCollapse ? '0' : '10px' }" :src="iconUrl" alt="logo" />
        <span v-show="!isCollapse" class="info-card">
          <h1 class="brand-title">心理健康AI助手</h1>
          <p class="brand-subtitle">管理后台</p>
        </span>
      </div>
      <!-- 侧边栏菜单 -->
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
import { useRoute, useRouter } from 'vue-router';
import { useAdminStore } from '@/stores/admin';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

const adminStore = useAdminStore()
const { isCollapse } = storeToRefs(adminStore)

const router = useRouter();
const route = useRoute();
const activeMenu = computed(() => route.path.split('/').pop())

const iconUrl = new URL('@/assets/images/机器人.png',import.meta.url).href

const selectMenu = (key) => {
  const currentRoute = router.options.routes[0]
  router.push(`${currentRoute.path}/${key}`)
}

</script>

<style lang="scss" scoped>
.el-aside {
  transition: width 0.2s ease;
  overflow: hidden;
}

.menu-style {
  height: 100%;
  border-right: none;
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
