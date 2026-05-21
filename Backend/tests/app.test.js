const request = require('supertest');
const { app } = require('../server');
const { prisma } = require('../config/db');

describe('Basic server endpoints', () => {
  test('GET / should respond with backend running message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toMatch(/ByteNexus Backend Running/);
  });

  test('GET /api/questions returns 404 or JSON', async () => {
    const res = await request(app).get('/api/questions');
    // depending on data it might 200 or 404; just assert it's not a 500
    expect(res.statusCode).not.toBe(500);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
