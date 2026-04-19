<template>
  <div>
    <PageHead title="情绪日志"/>
    <TableSearch :formItem="formItem" @search="handleSearch"/>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column prop="id" label="用户ID" width="80" />
      <el-table-column label="会话ID" width="80">
        <template #default="scope">
          <el-avatar>{{ scope.row.nickname }}</el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="diaryDate" label="记录日期" width="120" />
      <el-table-column label="情绪评分">
        <template #default="scope">
          <el-rate :model-value="scope.row.moodScore" :max="10" disabled/>
        </template>
      </el-table-column>
      <el-table-column label="生活指标" width="120">
        <template #default="scope">
          <div>
            <p>
              睡眠：{{scope.row.sleepQuality}}/5
            </p>
            <p>
              压力：{{scope.row.stressLevel}}/5
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="emotionTriggers" label="情绪触发因素" width="240" />
      <el-table-column prop="diaryContent" label="日记内容" width="240" />
      <el-table-column label="操作" width="240" fixed="right">
        <template #default="scope">
          <el-button text type="primary">详情</el-button>
          <el-button text type="danger">删除</el-button>
        </template>  
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      style="margin-top: 25px;"
      layout="prev, pager, next"
      :total="pagination.total"
      :page-size="pagination.pageSize"
      @change="handleChange"
    />
  </div>
</template>

<script setup>
import PageHead from '@/components/PageHead.vue'
import TableSearch from '@/components/TableSearch.vue'
import {onMounted, ref,reactive} from 'vue'
import {getEmotionalPage} from '@/api/admin'


const formItem =[
  {label:'用户ID',prop:'userId',comp:'input',placeholder:'请输入用户ID'},
  {label:'情绪评分',prop:'moodScoreRange',comp:'select',placeholder:'请选择评分范围',options:[{label:'低分（1-3）',value:'1-3'},{label:'中分（4-6）',value:'4-6'},{label:'高分（7-10）',value:'7-10'}]},

]


const tableData =ref([])

//分页参数
const pagination = reactive({
  currentPage: 1,
  size: 10,
  total: 0,
})
const handleChange = (val) => {
  pagination.currentPage = val
  handleSearch({})
}
//搜索函数
const handleSearch = async (formData) => {
  //从后端获取文章情绪日志列表
  //合并分页参数
  const params = {
    ...formData,
    ...pagination
  }
  //从后端获取文章列表
  const {records,total} = await getEmotionalPage(params)
  tableData.value = records
  pagination.total = total
}

onMounted(() => {
  handleSearch({})
})
</script>