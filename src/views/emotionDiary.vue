<template>
  <div class="emotionDiary-container">
    <div class="header-section">
      <div class="header-content">
        <el-image :src="iconUrl" alt="like" class="like-icon"  style="width: 60px; height: 60px;"/>
        <h1>情绪日记</h1>
      </div>
    </div>
    <div class="content">
      <!-- 情绪评分 -->
      <div class="diary-card">
        <div class="title">今日情绪评分</div>
        <div class="section">
          <p>今天感觉怎么样？（1-10分）</p>
          <div class="rate">
            <el-rate v-model="diaryForm.moodScore" :texts="emotionStatus" :show-text="true" :max="10" size="large" />
          </div>
        </div>
      </div>
      <!-- 主要情绪 -->
      <div class="diary-card">
        
      </div>
      <!-- 情绪记录 -->
      <div class="diary-card">
        
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { dayjs } from 'element-plus';

const emotionStatus = ['绝望崩溃','消沉抑郁','焦虑烦躁','低落不悦','平静淡然','轻松惬意','愉悦舒服','欢欣满足','兴奋欣喜','极致幸福']
const diaryForm=reactive({
    diaryDate: dayjs().format('YYYY-MM-DD'),
    moodScore:null,
    diaryContent: '',
    dominantEmotion: '',
    emotionTriggers: '',
    sleepQuality: null,
    stressLevel: null
})

const iconUrl=new URL('@/assets/images/like.png',import.meta.url).href
</script>

<style lang='scss' scoped>
.emotionDiary-container {
    background: linear-gradient(135deg, #fafbfc 0%, #f7f9fc 50%, #f2f6fa 100%);
    .header-section {
        background: linear-gradient(135deg, #7ED321 0%, #F5A623 100%);
        color: white;
        padding: 48px;
        .header-content {
            display: flex;
            align-items: center;
            gap: 12px;
        }
    }
    .content {
        margin: 0 auto;
        width: 980px;
        padding: 20px;
        .diary-card {
            margin-bottom: 20px;
            background: white;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            .title {
                margin-bottom: 20px;
                font-size: 25px;
                font-weight: 600;
                color: #374151;
            }
            .section {
                margin-bottom: 20px;
                p {
                    font-size: 15px;
                    color: #6B7280;
                    margin-bottom: 15px;
                }
            }
            .emotion-grid {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                .emotion-card {
                    padding: 15px;
                    border: 2px solid #E5E7EB;
                    border-radius: 15px;
                    text-align: center;
                    cursor: pointer;
                    background: #F9FAFB;
                    .emotion-name {
                        margin-top: 10px;
                        padding: 0 75px;
                        color: #374151;
                    }
                    &.selected {
                        border-color: #7ED321;
                        background: #F0FDF4;
                        transform: translateY(-3px);
                    }
                }
            }
            .detail-form {
                .form-label {
                    margin: 10px 0;
                    color: #374151;
                }
                .life-indicators {
                    display: flex;
                    gap: 20px;
                    .indicator-group {
                        flex: 1;
                    }
                }
                .action-buttons {
                    margin-top: 40px
                }
            }
        }
    }
}
</style>