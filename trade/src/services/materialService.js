import http from "./httpService";

export async function getMaterials() {
  return http.get(`/materials`);
}

export async function getMaterial(id) {
  return http.get(`/materials/${id}`);
}

export async function saveMaterial(item) {
  return http.post(`/materials`, item);
}

export async function updateMaterial(item) {
  return http.put(`/materials/${item._id}`, item);
}

export async function deleteMaterial(id) {
  return http.delete(`/materials/${id}`);
}
