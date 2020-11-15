import EditTicket from './components/EditTicket';
import NewTicket from './components/NewTicket';

const routes = [
  {
    path: '/new-ticket',
    name: 'New Ticket',
    component: NewTicket,
  },
  {
    path: '/edit-ticket/:id',
    name: 'Edit Ticket',
    component: EditTicket,
  },
];

export default routes;
