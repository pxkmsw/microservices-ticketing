import http from "./httpService";

export async function getSuppliers() {
  return http.get(`/suppliers`);
}

export async function getSupplier(id) {
  return http.get(`/suppliers/${id}`);
}

export async function saveSupplier(item) {
  return http.post(`/suppliers`, item);
}

export async function updateSupplier(item) {
  return http.put(`/suppliers/${item._id}`, item);
}

export async function deleteSupplier(id) {
  return http.delete(`/suppliers/${id}`);
}
