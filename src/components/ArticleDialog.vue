<template>
  <el-dialog
    :title="isEdit?'编辑文章':'新增文章'"
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
            <el-button type="danger" size="small" @click="handleRemove">移除封面</el-button>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <RichTextEditor
            v-model="formData.content"
            placeholder="请输入文章内容,支持富文本格式,可以使用加粗、斜体、列表、标题等格式来丰富文章内容"
            :maxCharCount="5000"
            min-height="400px"
            @change="handleContentChange"
            @created="handleEditorCreate"
             />
      </el-form-item>
    </el-form>
    <div v-if="btnPreview">
      <h3>预览效果</h3>
      <div v-html="formData.content">
      </div>
    </div>
    <template #footer>
      <el-button @click="btnPreview=!btnPreview">{{btnPreview?'关闭预览':'预览效果'}}</el-button>
      <el-button type="danger" @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleSubmit" :loading="loading">{{isEdit?'更新':'创建'}}文章</el-button>
    </template>
  </el-dialog>

</template>

<script setup>
import { ref, computed, reactive ,nextTick,watch} from 'vue'
import { ElMessage } from 'element-plus'
import { uploadFile } from '@/api/admin'
import { fileBaseUrl } from '@/config/index.js'
import RichTextEditor from './RichTextEditor.vue'
import { createdArticle,updateArticle } from '@/api/admin'
import { NULL } from 'sass'

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
  },
  article: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['update:modelValue','success'])

const dialogVisible = computed({
  get(){
    return props.modelValue
  },
  set(val){
    emit('update:modelValue', val)
  }
})

const isEdit = computed(()=>!!props.article?.id)

//监听编辑数据变化
watch(()=>props.article,(newVal,oldVal)=>{
  if(newVal){
    nextTick(()=>{
      //将编辑数据重新赋值给formData
      Object.assign(formData,newVal)
      //使用id
      businessId.value = newVal.id
      //封面url
      imgUrl.value = `${fileBaseUrl}${newVal.coverImage}`
    })
  }
})

//关闭弹窗
const handleClose = () => {
  //重置表单
  formRef.value.resetFields()
  //重置封面url和数据
  handleRemove()
  //重置bsid
  businessId.value = null
  //重置tags
  formData.tagArray = []
  emit('update:modelValue',false)
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
  categoryId: [
    { required: true, message: '请选择分类', trigger: 'change' }
  ],
  content: [
    { required: true, message: '请输入文章内容', trigger: 'blur' }
    ,
    { max: 5000, message: '文章内容长度不能超过5000个字符', trigger: 'blur' }
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

const businessId = ref(null)
const handleUploadRequest = async ({ file }) => {
  //uuid生成
  businessId.value = crypto.randomUUID()
  //上传文件
  const fileRes = await uploadFile(file,{
    businessId:businessId.value
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
//处理文章内容变化
const handleContentChange = (data) => {
  formData.content = data.html
}

const editorInstance= ref(null)
//处理富文本编辑器创建
const handleEditorCreate = (editor) => {
  editorInstance.value = editor
  //编辑
  if(formData.content&&editor){
    nextTick(()=>{
      editor.setHtml(formData.content)
    })
  }
}

const btnPreview = ref(false)

//提交文章
const formRef = ref(null)
const loading = ref(false)

const handleSubmit = () => {
  formRef.value.validate((valid, fields) => {
    if (!valid) return

    loading.value = true

    const submitData = {
      ...formData,
      tags: formData.tagArray.join(',')
    }
    delete submitData.tagArray

    if (!isEdit.value) {
      // 新增
      submitData.id = businessId.value
      createdArticle(submitData).then(res => {
        loading.value = false
        emit('success')
      })
    } else {
      // 编辑
      updateArticle(props.article.id, submitData).then(res => {
        loading.value = false
        emit('success')
      })
    }
  })
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
