import http from "./httpService";

export async function getPayments() {
  return http.get(`/payments`);
}

export async function getPayment(id) {
  return http.get(`/payments/${id}`);
}

export async function savePayment(item) {
  return http.post(`/payments`, item);
}

export async function updatePayment(item) {
  return http.put(`/payments/${item.id}`, item.item);
}

export async function deletePayment(id) {
  return http.delete(`/payments/${id}`);
}
