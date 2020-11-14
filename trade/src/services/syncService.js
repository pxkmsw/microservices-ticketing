import http from "./httpService";

export async function syncProducts() {
  return http.post(`/syncProducts`);
}
