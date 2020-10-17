export interface TicketEntityInt {
  getTicketInfo(): TicketInfo;
}

export interface TicketInfo {
  id?: any;
  title: string;
  price: number;
}

export class TicketEntity implements TicketEntityInt {
  constructor(private ticketInfo: TicketInfo) {}

  getTicketInfo = (): TicketInfo => this.ticketInfo;
}
