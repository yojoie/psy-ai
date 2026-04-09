<template>
  <div>
    <PageHead title="知识文章">
      <!-- 把按钮插槽 -->
      <template #buttons>
        <el-button type="primary">新增</el-button>
        <el-button type="primary">编辑</el-button>
      </template>
    </PageHead>
    <TableSearch :form-item="formItem" @search="handleSearch" />
  </div>
</template>

<script setup>
import { getCategoryTree, articlePage } from '@/api/admin'
import { onMounted, ref, reactive, } from 'vue'
import PageHead from '@/components/PageHead.vue'
import TableSearch from '@/components/TableSearch.vue'

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
  const data = await articlePage(params)
  console.log(data)
 
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



</script>
