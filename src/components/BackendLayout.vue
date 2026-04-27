<template>
  <div class="backend-layout">
    <el-container class="main-container">
      <Siderbar />

      <el-container class="right-container">
        <el-header>
          <Navbar />
        </el-header>

        <el-main class="main-content">
          <div class="content-container">
            <router-view />
          </div>
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
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .main-container {
    width: 100%;
    height: 100%;
  }

  .right-container {
    height: 100%;
    min-width: 0;
  }

  .el-header {
    height: 74px !important;
    padding: 0;
  }

  .main-content {
    height: calc(100vh - 74px);
    padding: 20px;
    box-sizing: border-box;
    background-color: #f5f7fa;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .content-container {
    min-height: 100%;
    background-color: #fff;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 8px;
  }
}
</style>
