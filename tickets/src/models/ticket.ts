import mongoose from 'mongoose';
import { TicketInfo } from './entities/ticketEntity';

interface TicketDoc extends mongoose.Document, TicketInfo {}

interface TicketModel extends mongoose.Model<TicketDoc> {
  build(ticketInfo: TicketInfo): TicketDoc;
}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret.__v;
      },
    },
  }
);

ticketSchema.statics.build = (attrs: TicketInfo) => {
  return new Ticket(attrs);
};

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export { Ticket };
