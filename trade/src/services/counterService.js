import http from "./httpService";

export async function getCount() {
  return http.post(`/counters`);
}
