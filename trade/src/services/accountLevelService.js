import http from "./httpService";

export async function getAccountLevels() {
  return http.get(`/accountLevels`);
}

export async function getAccountLevel(id) {
  return http.get(`/accountLevels/${id}`);
}

export async function saveAccountLevel(item) {
  return http.post(`/accountLevels`, item);
}

export async function updateAccountLevel(item) {
  return http.put(`/accountLevels/${item._id}`, item);
}

export async function deleteAccountLevel(id) {
  return http.delete(`/accountLevels/${id}`);
}
