import http from "./httpService";

export async function getSetting(id) {
  return http.get(`/settings/${id}`);
}

export async function getSettings() {
  return http.get(`/settings`);
}

export async function deleteSetting(id) {
  return http.delete(`/settings/${id}`);
}

export async function saveSetting(item) {
  return http.post(`/settings`, item);
}

export async function updateSetting(item) {
  const body = { ...item };
  delete body._id;
  return http.put(`/settings/${item._id}`, body);
}
