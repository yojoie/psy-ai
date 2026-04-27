<template>
  <!-- 左右两部分，flex布局-->
  <div class="navbar">
    <!-- 左侧 -->
    <div class="flexbox">
      <!-- 按钮，建立一个点击方法-->
      <el-button @click="handleCollapse">
        <el-icon><component :is="isCollapse ? Expand : Fold" /></el-icon>
      </el-button>
      <p class="page-title">{{ route.meta.title }}</p>
    </div>
    <!-- 右侧 -->
    <div class="flexbox">
      <el-dropdown @command="handleCommand">
        <!-- 触发 -->
         <div class="flexbox">
          <!-- 头像 -->
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
          <!-- 用户名 -->
          <p class="user-name">admin</p>
          <el-icon><ArrowDown /></el-icon>
         </div>
        <!-- 下拉部分显示  -->
        <template #dropdown>
          <!--组件工作原理： 点击被el-dropdown包裹的内容，就会弹出下拉菜单。 -->
          <el-dropdown-menu>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAdminStore } from '@/stores/admin';
import { Expand, ArrowDown, Fold } from '@element-plus/icons-vue';
import { useRouter,useRoute } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { logout } from '@/api/admin';

const route= useRoute()
const router= useRouter()

const adminStore = useAdminStore()
const isCollapse = computed(() => adminStore.isCollapse)

const handleCommand = (command) => {
  if(command === 'logout'){
    //登出提示
    ElMessageBox.confirm('确定退出登录吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      //登出
      logout().then(() => {
        //清除缓存
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
        router.push('/auth/login')
      })
    })
}
}

const handleCollapse = () => {
  const toggle = adminStore.toggleCollapse || adminStore.toggleCollapsed
  if (typeof toggle === 'function') {
    toggle()
  }
}

</script>

<style lang="scss" scoped>
.navbar{
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  border-bottom: 1px solid #e5e7ed;
  .flexbox {
  display: flex;
  align-items: center;
  justify-content: center;
  }
  .page-title {
    font-size: 26px;
    margin-left: 20px;
    font-weight: bold;
    color: #1f2937;
  }
}
</style>
