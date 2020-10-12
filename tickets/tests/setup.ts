import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
jest.mock('../src/natsWrapper');

declare global {
  namespace NodeJS {
    interface Global {
      signup(): string[];
    }
  }
}

let mongo: any;
beforeAll(async done => {
  jest.clearAllMocks();
  process.env.NODE_ENV = 'test';
  process.env.JWT_KEY = 'asdf';

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
  done();
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) await collection.deleteMany({});
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

//returns a cookie
global.signup = () => {
  //Build a jwt payload
  const payload = { id: new mongoose.Types.ObjectId().toHexString(), email: 'ts@ts.com' };

  //Create a json web token
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  //Build session object
  const session = { jwt: token };

  //Turn session object into JSON
  const sessionJSON = JSON.stringify(session);

  //Take json and encode it as base64
  const base64Cookie = Buffer.from(sessionJSON).toString('base64');

  //Return the string that's a cookie with the encoded data
  return [`express:sess=${base64Cookie}`];
};
