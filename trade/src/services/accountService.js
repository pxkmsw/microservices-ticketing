import http from "./httpService";

export async function getAccounts() {
  return http.get(`/accounts`);
}

export async function getAccount(id) {
  return http.get(`/accounts/${id}`);
}

export async function saveAccount(item) {
  return http.post(`/accounts`, item);
}

export async function updateAccount(item) {
  return http.put(`/accounts/${item.id}`, item.item);
}

export async function deleteAccount(id) {
  return http.delete(`/accounts/${id}`);
}
