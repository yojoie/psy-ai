<template>
  <div class="backend-layout">
    <el-container class="main-container">
      <Siderbar />
      <el-container>
        <el-header>
          <Navbar />
        </el-header>
        <el-main class="main-content">
          <router-view class="content-container"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script setup>
import Siderbar from './Sidebar.vue'
import Navbar from './Navbar.vue'
</script>

<style lang="scss" scoped>
.backend-layout {
  height: 100vh;
  // 导航栏高度
  .el-header {
    height: 74px !important;
  }
  //继承父元素高度
  .main-container {
    height: 100%;
    // 内容区域
    .content-container {
      padding: 20px;
      background-color: white;
      height: calc(100% - 74px);
    }
  }
}
</style>
