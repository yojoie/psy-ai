import axios from 'axios'
import { ElMessage } from 'element-plus'


//创建axios实例
const service = axios.create({
  baseURL: '/api',//请求前缀
  timeout: 5000//请求超时时间
})

//请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    //获取token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['token'] = token
    }
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

//响应拦截器，请求完成后的处理
service.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    const { data, config } = response
    //处理业务状态码
    if (data.code === '200') {
      return data.data
    } else {
      if (data.code === '-1') {//用户超时，登录过期
        if (!config.url?.includes('/login')) {
          ElMessage.error(data.msg || '登录过期，请重新登录')
          //清除token和用户信息
          localStorage.removeItem('token')
          localStorage.removeItem('userInfo')
          //跳转到登录页
          window.location.href = '/auth/login'
        } else {
          //其他错误
          ElMessage.error(data.msg || '登录失败')
          return Promise.reject('网络请求失败')
        }
      }
    }
    return response
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default service
