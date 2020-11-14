import http from "./httpService";

const apiEndPoint = `/users`;

export function register(user) {
  return http.post(apiEndPoint, user);
}

export async function getUser(id) {
  return http.get(`${apiEndPoint}/${id}`);
}

export async function getUsers() {
  return http.get(apiEndPoint);
}

export async function deleteUser(id) {
  return http.delete(`${apiEndPoint}/${id}`);
}

export async function saveUser(item) {
  return http.post(apiEndPoint, item);
}

export async function updateUser(item) {
  const body = { ...item };
  delete body._id;
  return http.put(`${apiEndPoint}/${item._id}`, body);
}
