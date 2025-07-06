const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const AdoptionStatus = require('../models/status.model'); 

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe('POST /adoption/status', () => {
  it('should create a new adoption status', async () => {
    const res = await request(app)
      .post('/adoption/status')
      .send({
        petId: 'pet123',
        status: 'reserved',
        notes: 'Waiting for final approval',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('petId', 'pet123');
    expect(res.body.status).toBe('reserved');

    const createdStatus = await AdoptionStatus.findOne({ petId: 'pet123' });
    expect(createdStatus).not.toBeNull();
    expect(createdStatus.status).toBe('reserved');
  });
});
