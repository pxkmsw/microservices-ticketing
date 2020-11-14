import http from "./httpService";

export async function getIdentities() {
  return http.get(`/identities`);
}

export async function getIdentity(id) {
  return http.get(`/identities/${id}`);
}

export async function saveIdentity(item) {
  return http.post(`/identities`, item);
}

export async function deleteIdentity(id) {
  return http.delete(`/identities/${id}`);
}
