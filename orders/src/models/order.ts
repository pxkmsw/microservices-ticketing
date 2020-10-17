import { eOrderStatus } from '@fullstackeng/common';
import mongoose from 'mongoose';
import { OrderInfo } from './entities/orderEntity';

interface OrderDoc extends mongoose.Document, OrderInfo {}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(orderInfo: OrderInfo): OrderDoc;
}

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(eOrderStatus),
      default: eOrderStatus.Created,
    },
    expiresAt: {
      type: mongoose.Schema.Types.Date,
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ticket',
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

orderSchema.statics.build = (attrs: OrderInfo) => {
  return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export { Order };
export { eOrderStatus };
