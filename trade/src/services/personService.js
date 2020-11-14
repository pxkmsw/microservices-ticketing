import http from "./httpService";

export async function getPerson(id) {
  return http.get(`/persons/${id}`);
}

export async function getPersons() {
  return http.get(`/persons`);
}

export async function deletePerson(id) {
  return http.delete(`/persons/${id}`);
}

export async function savePerson(item) {
  return http.post(`/persons`, item);
}

export async function updatePerson(item) {
  const body = { ...item };
  delete body._id;
  return http.put(`/persons/${item._id}`, body);
}
