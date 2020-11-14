import http from './httpService';

const apiEndPoint = `/api/tickets`;
let tickets = [
  { id: 1, title: 'Yanni Concert', price: 128 },
  { id: 2, title: 'Ebi Concert', price: 98 },
  { id: 3, title: 'Supre Bowl', price: 52 },
  { id: 4, title: 'New Years Event', price: 31 },
  { id: 5, title: 'Christmas Party', price: 18 },
  { id: 6, title: 'Music Festival', price: 62 },
  { id: 7, title: 'Spring Festival', price: 19 },
  { id: 8, title: 'Nowruz Event', price: 128 },
  { id: 9, title: 'Octoberfest', price: 21 },
  { id: 10, title: 'Holloween Night', price: 36 },
  { id: 11, title: 'Thanksgiving Dinner', price: 79 },
  { id: 12, title: 'Easter Party', price: 89 },
  { id: 13, title: 'Union Day Concert', price: 49 },
];
//getTicke
export async function getTickets() {
  return http.get(apiEndPoint);
  // return { data: tickets };
}

export async function createTicket(ticket) {
  return http.post(apiEndPoint, ticket);
  // tickets.push(ticket);
}

export async function deleteTicket(id) {
  return http.delete(`${apiEndPoint}/${id}`);
  // tickets = tickets.filter(ticket => ticket.id == id);
}
