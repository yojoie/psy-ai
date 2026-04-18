<template>
  <div>
    <PageHead title="咨询记录" />
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="会话ID" width="100">
        <template #default="scope">
          <el-avatar>{{ scope.row.userNickname }}</el-avatar>
        </template>
      </el-table-column>
            <el-table-column label="情绪标签">
        <template #default="scope">
          <div class="session-title">{{ scope.row.sessionTitle }}</div>
          <div class="session-preview">{{ scope.row.lastMessageContent }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="messageCount" label="消息数" width="100" />
      <el-table-column prop="lastMessageTime" label="时间" width="200" />
      <el-table-column label="操作" width="100">
        <template #default="scope">
          <el-button text type="primary" size="small" @click="viewSessionDetail">详情</el-button>
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
import { onMounted, ref, reactive, watch } from 'vue'
import PageHead from '@/components/PageHead.vue'
import TableSearch from '@/components/TableSearch.vue'
import ArticleDialog from '@/components/ArticleDialog.vue'
import { getConsultationsList } from '@/api/admin'
import { ElMessageBox, ElMessage } from 'element-plus'

const tableData = ref([]) 
const pagination = reactive({
  total: 0,
  pageSize: 10,
  currentPage: 1
})

// 查看会话详情
const viewSessionDetail = (row) => {
  console.log(row)
}

// 分页改变时，刷新列表
const handleChange = (val) => {
  pagination.currentPage = val
  handleSearch({})
}
// 初始化时，获取咨询记录列表
const handleSearch=()=>{
  getConsultationsList(pagination).then(res => {
    const { records, total } = res
    pagination.total = total
    tableData.value = records
  })
}

onMounted(() => {
  // 调用接口获取咨询记录列表
  handleSearch({})
})
</script>
