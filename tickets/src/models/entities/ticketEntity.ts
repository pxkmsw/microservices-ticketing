export interface TicketEntityInt {
  getTicketInfo(): TicketInfo;
}

export interface TicketInfo {
  title: string;
  price: number;
  userId: string;
}

export class TicketEntity implements TicketEntityInt {
  constructor(private ticketInfo: TicketInfo) {}

  getTicketInfo = (): TicketInfo => this.ticketInfo;
}
