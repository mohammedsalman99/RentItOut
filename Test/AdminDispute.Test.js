import supertest from 'supertest';
import { app } from '../app.js';

describe('Admin Routes - Disputes', () => {
  it('should create a new dispute successfully', async () => {
    const disputeData = {
      itemId: '1',
      reason: 'Item not as described',
      details: 'The color was different from what was shown.'
    };

    const response = await supertest(app)
      .post('/admin/disputes')
      .send(disputeData);

    expect(response.status).toBe(201);
    expect(response.body.reason).toBe('Item not as described');
  });

  it('should get all disputes successfully', async () => {
    const response = await supertest(app)
      .get('/admin/disputes');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a specific dispute by ID successfully', async () => {
    const disputeId = '1';

    const response = await supertest(app)
      .get(`/admin/disputes/${disputeId}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(Number(disputeId));
  });

  it('should update a dispute successfully', async () => {
    const disputeId = '1';
    const updatedDisputeData = {
      status: 'Resolved'
    };

    const response = await supertest(app)
      .put(`/admin/disputes/${disputeId}`)
      .send(updatedDisputeData);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Dispute was updated successfully.');
  });

  it('should delete a dispute successfully', async () => {
    const disputeId = '1';

    const response = await supertest(app)
      .delete(`/admin/disputes/${disputeId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Dispute was deleted successfully!');
  });
});
