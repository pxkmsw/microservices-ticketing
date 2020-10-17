import { eOrderStatus } from '@fullstackeng/common';
import { TicketInfo } from './ticketEntity';

export interface OrderEntityInt {
  getOrderInfo(): OrderInfo;
}

export interface OrderInfo {
  userId: string;
  status: eOrderStatus;
  expiresAt: Date;
  ticket: TicketInfo;
}

export class OrderEntity implements OrderEntityInt {
  constructor(private orderInfo: OrderInfo) {}

  getOrderInfo = (): OrderInfo => this.orderInfo;
}
