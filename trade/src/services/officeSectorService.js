import http from "./httpService";

export async function getOfficeSectors() {
  return http.get(`/officeSectors`);
}

export async function getOfficeSector(id) {
  return http.get(`/officeSectors/${id}`);
}

export async function saveOfficeSector(item) {
  return http.post(`/officeSectors`, item);
}

export async function updateOfficeSector(item) {
  return http.put(`/officeSectors/${item._id}`, item);
}

export async function deleteOfficeSector(id) {
  return http.delete(`/officeSectors/${id}`);
}
