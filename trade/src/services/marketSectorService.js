import http from "./httpService";

export async function getMarketSectors() {
  return http.get(`/marketSectors`);
}

export async function getMarketSector(id) {
  return http.get(`/marketSectors/${id}`);
}

export async function saveMarketSector(item) {
  return http.post(`/marketSectors`, item);
}

export async function updateMarketSector(item) {
  return http.put(`/marketSectors/${item._id}`, item);
}

export async function deleteMarketSector(id) {
  return http.delete(`/marketSectors/${id}`);
}
