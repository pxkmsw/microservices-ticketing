import { Ticket } from '../../src/models/ticket';

describe('handles some optimistic concurrency control', () => {
  it('implements optimistic concurrency control', async () => {
    const ticket = Ticket.build({
      title: 'new year event',
      price: 35,
      userId: 'abcdf',
    });

    await ticket.save();

    const firstInstance = await Ticket.findById(ticket.id);
    const secondInstance = await Ticket.findById(ticket.id);

    firstInstance!.set({ price: 10 });
    secondInstance!.set({ price: 15 });

    await firstInstance!.save();

    try {
      await secondInstance!.save();
    } catch (e) {
      expect(e).toBeDefined();
      return;
    }

    throw new Error('Should not reach this point');
  });

  it('increments the version number in db on multiple saves', async () => {
    const ticket = Ticket.build({
      title: 'new year event',
      price: 35,
      userId: 'abcdf',
    });

    await ticket.save();
    expect(ticket.version).toEqual(0);

    await ticket.save();
    expect(ticket.version).toEqual(1);

    await ticket.save();
    expect(ticket.version).toEqual(2);
  });
});
