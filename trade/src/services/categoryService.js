import http from "./httpService";

export async function getCategories() {
  return http.get(`/categories`);
}

export async function getCategory(id) {
  return http.get(`/categories/${id}`);
}

export async function saveCategory(item) {
  return http.post(`/categories`, item);
}

export async function updateCategory(item) {
  return http.put(`/categories/${item._id}`, item);
}

export async function deleteCategory(id) {
  return http.delete(`/categories/${id}`);
}
