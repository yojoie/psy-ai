<template>
  <el-dialog
    title="文章详情"
    v-model="dialogVisible"
    width="50%"
    @close="handleClose"
  >
    <el-form :model="formData" :rules="rules" ref="formRef" label-width="120px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formData.title" placeholder="请输入文章标题" maxlength="200" show-word-limit clearable/>
      </el-form-item>
      <el-form-item label="分类" prop="categoryId">
        <el-select v-model="formData.categoryId" placeholder="请选择分类">
          <el-option v-for="item in props.categories" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="文章摘要" prop="summary">
        <el-input v-model="formData.summary" type="textarea" :rows="4" placeholder="请输入文章摘要（可选）" maxlength="1000" show-word-limit/>
      </el-form-item>
      <el-form-item label="标签" prop="tags">
        <el-select v-model="formData.tagArray"  placeholder="请输入文章标签（可选）" multiple filterable allow-create style="width:100%">
          <el-option v-for="tag in commonTags" :key="tag" :label="tag" :value="tag" />
        </el-select>
      </el-form-item>
      <el-form-item label="封面图片">
        <div class="cover-upload">
          <el-upload
            class="avatar-uploader"
            action="#"
            :before-upload="beforeUpload"
            :http-request="handleUploadRequest"
            accept="image/*"
            :show-file-list="false"
          >
            <div v-if="!imgUrl" class="cover-placeholder">
              <p>点击上传封面</p>
            </div>
            <div v-else class="cover-image">
              <img :src="imgUrl" alt="封面图片" />
            </div>
          </el-upload>
          <div v-if="imgUrl" class="cover-remove">
            <el-button type="danger" size="mini" @click="handleRemove">移除封面</el-button>
          </div>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>

</template>

<script setup>
import { id } from 'element-plus/es/locale/index.mjs'
import { ref, computed, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { uploadFile } from '@/api/admin'
import { fileBaseUrl } from '@/config/index.js'

//上传图片
const imgUrl = ref('')
const props= defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  categories: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])

const dialogVisible = computed({
  get(){
    return props.modelValue
  },
  set(val){
    emit('update:modelValue', val)
  }
})
  
//关闭弹窗
const handleClose = () => {
  dialogVisible.value = false
}

const formData = reactive({
  "title":"",
  "content":"",
  "coverImage":"",
  "categoryId":1,
  "summary":"",
  "tags":"",
  "id":""
})
  
const rules = reactive({
  title: [
    { required: true, message: '请输入文章标题', trigger: 'blur' }
  ],
  categoryID: [
    { required: true, message: '请选择分类', trigger: 'change' }
  ],
})

const commonTags = [ '情绪管理','焦虑','抑郁','压力','睡眠','冥想','正念','放松','心理健康','自我成长','人际关系','工作压力','学习方法','生活技巧' ]

const beforeUpload = (file) => {
  // 校验文件类型是否为图片
  const isImage = file.type.startsWith('image/')
  // 校验文件大小是否超过5MB
  const isSize = file.size / 1024 / 1024 < 5
  if (!isSize) {
    ElMessage.error('上传图片大小不能超过5MB!')
    return false
  }
  if (!isImage) {
    ElMessage.error('上传图片只能是JPG格式!')
    return false
  }
  return true
  // 上传前的校验
}
  
const handleUploadRequest = async ({ file }) => {
  //uuid生成
  const businessId = crypto.randomUUID()
  //上传文件
  const fileRes = await uploadFile(file,{
    businessId:businessId
  })
  //拼接图片URL
  imgUrl.value = `${fileBaseUrl}${fileRes.filePath}`
  //将图片URL赋值给formData.coverImage
  formData.coverImage = fileRes.filePath
}  
//删除图片
const handleRemove = () => {
  imgUrl.value = ''
  formData.coverImage = ''
}  
  
</script>

<style lang="scss" scoped>
.cover-placeholder{
  width: 200px;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #8b949e;
  background-color: #f6f8fa;
}
.cover-image img {
  width: 200px;
  height: 120px;
  object-fit: cover;
  display: block;
}
</style>
