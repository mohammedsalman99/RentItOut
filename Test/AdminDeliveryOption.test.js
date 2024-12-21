import supertest from 'supertest';
import { app } from '../app.js';

describe('Admin Routes - Delivery Options', () => {
  it('should create a new delivery option successfully', async () => {
    const deliveryOptionData = {
      name: 'Express Shipping',
      cost: 15
    };

    const response = await supertest(app)
      .post('/admin/delivery-options')
      .send(deliveryOptionData);

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Express Shipping');
    expect(response.body.cost).toBe(15);
  });

  it('should get all delivery options successfully', async () => {
    const response = await supertest(app)
      .get('/admin/delivery-options');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a specific delivery option by ID successfully', async () => {
    const deliveryOptionId = '1';

    const response = await supertest(app)
      .get(`/admin/delivery-options/${deliveryOptionId}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(Number(deliveryOptionId));
  });

  it('should update a delivery option successfully', async () => {
    const deliveryOptionId = '1';
    const updatedDeliveryOptionData = {
      name: 'Standard Shipping',
      cost: 5
    };

    const response = await supertest(app)
      .put(`/admin/delivery-options/${deliveryOptionId}`)
      .send(updatedDeliveryOptionData);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Delivery option was updated successfully.');
  });

  it('should delete a delivery option successfully', async () => {
    const deliveryOptionId = '1';

    const response = await supertest(app)
      .delete(`/admin/delivery-options/${deliveryOptionId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Delivery option was deleted successfully!');
  });
});
