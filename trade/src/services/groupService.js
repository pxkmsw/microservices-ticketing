import http from "./httpService";

export async function getGroups() {
  return http.get(`/groups`);
}

export async function getGroup(id) {
  return http.get(`/groups/${id}`);
}

export async function saveGroup(item) {
  return http.post(`/groups`, item);
}

export async function updateGroup(item) {
  return http.put(`/groups/${item._id}`, item);
}

export async function deleteGroup(id) {
  return http.delete(`/groups/${id}`);
}
