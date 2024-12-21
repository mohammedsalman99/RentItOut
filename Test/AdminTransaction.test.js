import supertest from 'supertest';
import { app } from '../app.js';

describe('Admin Routes - Transactions', () => {
  it('should create a new transaction successfully', async () => {
    const transactionData = {
      userId: '1',
      itemId: '1',
      amount: 1000,
      status: 'pending'
    };

    const response = await supertest(app)
      .post('/admin/transactions')
      .send(transactionData);

    expect(response.status).toBe(201);
    expect(response.body.amount).toBe(1000);
  });

  it('should get all transactions successfully', async () => {
    const response = await supertest(app)
      .get('/admin/transactions');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a specific transaction by ID successfully', async () => {
    const transactionId = '1';

    const response = await supertest(app)
      .get(`/admin/transactions/${transactionId}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(Number(transactionId));
  });

  it('should update a transaction successfully', async () => {
    const transactionId = '1';
    const updatedTransactionData = {
      status: 'completed'
    };

    const response = await supertest(app)
      .put(`/admin/transactions/${transactionId}`)
      .send(updatedTransactionData);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Transaction was updated successfully.');
  });

  it('should delete a transaction successfully', async () => {
    const transactionId = '1';

    const response = await supertest(app)
      .delete(`/admin/transactions/${transactionId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Transaction was deleted successfully!');
  });
});
import supertest from 'supertest';
import { app } from '../app.js';

describe('Admin Routes - Transactions', () => {
  it('should create a new transaction successfully', async () => {
    const transactionData = {
      userId: '1',
      itemId: '1',
      amount: 1000,
      status: 'pending'
    };

    const response = await supertest(app)
      .post('/admin/transactions')
      .send(transactionData);

    expect(response.status).toBe(201);
    expect(response.body.amount).toBe(1000);
  });

  it('should get all transactions successfully', async () => {
    const response = await supertest(app)
      .get('/admin/transactions');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a specific transaction by ID successfully', async () => {
    const transactionId = '1';

    const response = await supertest(app)
      .get(`/admin/transactions/${transactionId}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(Number(transactionId));
  });

  it('should update a transaction successfully', async () => {
    const transactionId = '1';
    const updatedTransactionData = {
      status: 'completed'
    };

    const response = await supertest(app)
      .put(`/admin/transactions/${transactionId}`)
      .send(updatedTransactionData);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Transaction was updated successfully.');
  });

  it('should delete a transaction successfully', async () => {
    const transactionId = '1';

    const response = await supertest(app)
      .delete(`/admin/transactions/${transactionId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Transaction was deleted successfully!');
  });
});
