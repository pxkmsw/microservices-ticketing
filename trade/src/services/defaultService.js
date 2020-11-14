import http from "./httpService";

export async function setDefault() {
  return http.post(`/importData`);
}
