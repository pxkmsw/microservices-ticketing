import http from "./httpService";

export async function getProduct(id) {
  return http.get(`/products/${id}`);
}

export async function getProducts() {
  return http.get(`/products`);
}

export async function deleteProduct(id) {
  return http.delete(`/products/${id}`);
}

export async function saveProduct(item) {
  return http.post(`/products`, item);
}

export async function addDiversity(item) {
  return http.post(`/products/diversity`, item);
}

export async function updateProduct(item) {
  return http.put(`/products/${item.id}`, item.item);
}
