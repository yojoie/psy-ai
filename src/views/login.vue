<template>
  <div  class="container">
    <div class="title">
      <div class="back-home">
        <el-icon><Back/></el-icon>
        <span>返回首页</span>
      </div>
      <div class="title-text">
        <h2>登录您的账户</h2>
        <p>输入您的登录信息</p>
      </div>
      <div class="form-container">
        <el-form
          ref="ruleFormRef"
          :model="formData"
          :rules="rules"
          label-position="top"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="formData.username" size="large" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="formData.password" size="large" placeholder="请输入密码" type="password" show-password></el-input>
          </el-form-item>
          <el-button class="btn" type="primary" size="large" @click="submitForm">登录账户</el-button>
        </el-form>
        <div class="footer">
          <p>还没有账户？<router-link to="/register">去注册</router-link></p>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { ref ,reactive} from 'vue'

const ruleFormRef = ref()
const formData = reactive({
  // 按照接口文档的字段名定义
  username: '',
  password: ''
})

const rules = reactive({
  username: [
    { required: true, message: '请输入用户名或邮箱', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
})

//登录
const submitForm = async (formEl) => {
  //如果表单为空，直接返回
  if(!formEl) return
  await formEl.validate((valid,fields) => {
    if(valid){
      //登录成功，调用接口登录，登录成功后，跳转到首页，登录失败，提示用户
      console.log('登录成功', fields)
    }
  })
}
 
</script>

<style scoped lang="scss">
.container {
  width: 384px;
  .title{
    .back-home{
      margin-bottom: 60px;
    }
    .title-text{
      text-align: center;
      h2{
        font-size: 36px;
        margin-bottom: 10px;
      }
      p{
        font-size: 18px;
        color: #6b7280;
      }
    }
    .form-container{
        margin-top: 30px;
      .btn{
        margin-top: 40px;
        width: 100%;
      }
      .footer{
        padding: 30px;
        text-align: center;
       
    }
  }
}
}
</style>