import http from "./httpService";

export async function getAccountTypes() {
  return http.get(`/accountTypes`);
}

export async function getAccountType(id) {
  return http.get(`/accountTypes/${id}`);
}

export async function saveAccountType(item) {
  return http.post(`/accountTypes`, item);
}

export async function updateAccountType(item) {
  return http.put(`/accountTypes/${item._id}`, item);
}

export async function deleteAccountType(id) {
  return http.delete(`/accountTypes/${id}`);
}
