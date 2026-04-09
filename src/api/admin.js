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