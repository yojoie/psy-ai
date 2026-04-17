<template>
  <div>
    <PageHead title="知识文章">
      <!-- 把按钮插槽 -->
      <template #buttons>
        <el-button @click="dialogVisible = true" type="primary">新增</el-button>
      </template>
    </PageHead>
    <TableSearch :form-item="formItem" @search="handleSearch" />
    <el-table :data="tableData" style="width: 100%" margin-top="25px">
      <el-table-column label="文章标题" width="450" fixed="left">
        <template #default="scope">
          <div style="display: flex; align-items: center;">
            <el-icon><timer /></el-icon>
            <span>{{scope.row.title}}</span>
          </div>
        </template>        
      </el-table-column>

      <el-table-column label="分类" width="200">
        <template #default="scope">
          <div style="display: flex; align-items: center;">
            <el-icon><timer /></el-icon>
            <span>{{categoryMap[scope.row.categoryId]}}</span>
          </div>
        </template>  
      </el-table-column>

      <el-table-column label="作者" width="150" prop="authorName"/>
      <el-table-column label="阅读量" width="150" prop="readCount"/>
      <el-table-column label="发布时间" width="150" prop="updatedAt"/>
      
       <el-table-column label="操作" width="240" fixed="right">
        <template #default="scope">
          <el-button text type="primary">编辑</el-button>
          <el-button v-if="scope.row.status === 0||scope.row.status === 2" text type="success">发布</el-button>
          <el-button v-if="scope.row.status === 1" text type="warning">下线</el-button>
          <el-button text type="danger">删除</el-button>
        </template>  
      </el-table-column>
       
    </el-table>

    <!-- 分页 -->
    <el-pagination
      style="margin-top: 25px;"
      layout="prev, pager, next"
      :total="pagination.total"
      :page-size="pagination.size"
      @change="handleChange"
    />
    <!-- 文章详情弹窗 -->
    <ArticleDialog v-model:modelValue="dialogVisible" :categories="categories" />

   </div>
</template>

<script setup>
import { getCategoryTree, articlePage } from '@/api/admin'
import { onMounted, ref, reactive, } from 'vue'
import PageHead from '@/components/PageHead.vue'
import TableSearch from '@/components/TableSearch.vue'
import ArticleDialog from '@/components/ArticleDialog.vue'

//弹窗是否显示
const dialogVisible = ref(false)
const handleSuccess = () => {
}

const tableData = ref([]) 
const formItem = [
  { comp:'input', prop:'title', label:'文章标题',placeholder:'请输入文章标题'},
  { comp:'select', prop:'categoryID', label:'分类',placeholder:'请选择分类',options:[]},
  { comp:'select', prop:'status', label:'状态',placeholder:'请选择状态',options:[
    { label:'草稿', value:0},
    { label:'已发布', value:1},
    { label:'已下线', value:2}
  ]},
  ]
//分页参数
const pagination = reactive({
  currentPage: 1,
  size: 10,
  total: 0,
})
//搜索
const handleSearch = async (formData) => {
  //从后端获取文章列表
  //合并分页参数
  const params = {
    ...formData,
    ...pagination
  }
  //从后端获取文章列表
  const {records,total} = await articlePage(params)
  tableData.value = records
  pagination.total = total
}

//拿到是对象，用reactive
const categoryMap = reactive({})
//分类映射
const categories = ref([])



onMounted(async () => {
  //从后端获取分类树 
  const data = await getCategoryTree()
  categories.value = data.map(item => {
    //映射
    categoryMap[item.id] = item.categoryName
    return {
      label: item.categoryName,
      value: item.id
    } 
  })
  formItem[1].options = categories.value

  //从后端获取文章列表
  handleSearch({})
})
//分页
const handleChange = (page) => {
  pagination.currentPage = page
  handleSearch()
}



</script>
