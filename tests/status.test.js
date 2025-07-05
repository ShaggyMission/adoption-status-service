const request = require('supertest');
const app = require('../app');

describe('POST /adoption/status', () => {
  it('should create a new adoption status', async () => {
    const res = await request(app)
      .post('/adoption/status')
      .send({
        petId: 'pet123',
        status: 'reserved',
        notes: 'Waiting for final approval'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('petId', 'pet123');
    expect(res.body.status).toBe('reserved');
  });
});
