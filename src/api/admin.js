import service from "@/utils/request";

export function login(data) {
  return service.post('/user/login', data)
}

export function getCategoryTree() {
  return service.get('/knowledge/category/tree')
}

export function articlePage(params) {
  return service.get('/knowledge/article/page', { params })
}

export function uploadFile(file, businessTypeInfo) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('businessType', 'ARTICLE')
  formData.append('businessId', businessTypeInfo.id)
  formData.append('businessField', 'cover')
  return service.post('/file/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
}

export function createdArticle(data) {
  return service.post('/knowledge/article', data)
}