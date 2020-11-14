import http from "./httpService";

export async function getInvoices() {
  return http.get(`/invoices`);
}

export async function getInvoice(id) {
  return http.get(`/invoices/${id}`);
}

export async function saveInvoice(item) {
  return http.post(`/invoices`, item);
}

export async function updateInvoice(item) {
  return http.put(`/invoices/${item.id}`, item.item);
}

export async function deleteInvoice(id) {
  return http.delete(`/invoices/${id}`);
}
