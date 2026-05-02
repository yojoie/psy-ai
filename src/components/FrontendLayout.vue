<template>
  <div class="frontend-layout">
    <div class="navbar-container">
      <div class="brand-section">
        <el-image :src="iconUrl" style="width: 50px; height: 50px;" class="brand-logo" />
        <h1 class="brand-name">心理健康ai助手</h1>
      </div>
      <div class="nav-section">
        <router-link class="nav-link" to="/" >首页</router-link>
        <router-link class="nav-link" to="/consultation" v-if="isLoggedIn">AI咨询</router-link>
        <router-link class="nav-link" to="/emotion-diary" v-if="isLoggedIn">情绪日记</router-link>
        <router-link class="nav-link" to="/knowledge">知识库</router-link>
        <el-button class="logout-btn" v-if="isLoggedIn" @click="handleLogout">退出登录</el-button>
        <template v-else>
          <router-link class="nav-link" to="/auth/login">登录</router-link>
          <router-link class="nav-link" to="/auth/register">
            <el-button type="primary">注册</el-button>
          </router-link>          
        </template>
      </div>
    </div>
    <div class="main-content">
      <router-view></router-view>
    </div>
    <div class="footer-container">
      <div class="footer-bottom">
        <p>&copy; 2026 心理健康ai助手 All Rights Reserved</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { logout } from '@/api/admin'
import {useRouter } from 'vue-router'

const router = useRouter()

const iconUrl = new URL('@/assets/images/机器人.png', import.meta.url).href
const isLoggedIn = ref(false)

onMounted(() => {
    isLoggedIn.value = localStorage.getItem('token') !== null
})

//用户端登出
const handleLogout = () => {
    logout().then(() => {
        //登出成功，清空localStorage中的token和userInfo
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
        //登出成功，跳转到登录页面
        router.push('/auth/login')
    })
}
 
</script>

<style lang="scss" scoped>
.frontend-layout {
        background-color: #fff;
        .navbar-container {
            max-width: 1200px;
            height: 100%;
            margin: 0 auto;
            padding: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .brand-section {
                display: flex;
                align-items: center;
                .brand-name {
                    margin-left: 10px;
                    font-size: 24px;
                    font-weight: 600;
                    color: #333;
                }
            }
            .nav-section {
                display: flex;
                align-items: center;
                gap: 40px;
                .nav-link {
                    color: #4b5563;
                    font-size: 16px;
                    font-weight: 500;
                    &:hover {
                        color: #4A90E2;
                    }
                }
            }
        }

        .footer-container {
            background: #1f2937;
            color: white;
            padding: 15px 0;
            margin-top: auto;
            .footer-bottom {
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 10px;
                text-align: center;
            }
        }
    }
</style>