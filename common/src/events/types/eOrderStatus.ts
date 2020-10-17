export enum eOrderStatus {
  // When the order has been created but the ticket that is trying to be
  // reserved has not been reserved
  Created = 'created',

  // The ticket that the order is trying to reserve has already been reserved,
  // Or when the user has cancelled the order
  // Or the order expired before the payment
  Cancelled = 'cancelled',

  // The order has successfully reserved the ticket
  AwaitingPayment = 'awaiting:payment',

  // The order has reserved the ticket and the user has provided payment successflly
  Complete = 'complete',
}
