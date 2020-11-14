import http from "./httpService";

export async function getColors() {
  return http.get(`/colors`);
}

export async function getColor(id) {
  return http.get(`/colors/${id}`);
}

export async function saveColor(item) {
  return http.post(`/colors`, item);
}

export async function updateColor(item) {
  return http.put(`/colors/${item._id}`, item);
}

export async function deleteColor(id) {
  return http.delete(`/colors/${id}`);
}
