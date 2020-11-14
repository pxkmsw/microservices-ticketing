import http from "./httpService";

export async function getSubCategories() {
  return http.get(`/subCategories`);
}

export async function getSubCategory(id) {
  return http.get(`/subCategories/${id}`);
}

export async function saveSubCategory(item) {
  return http.post(`/subCategories`, item);
}

export async function updateSubCategory(item) {
  return http.put(`/subCategories/${item._id}`, item);
}

export async function deleteSubCategory(id) {
  return http.delete(`/subCategories/${id}`);
}
