import supertest from 'supertest';
import { app } from '../app.js';

describe('Admin Routes - Items', () => {
  it('should create a new item successfully', async () => {
    const itemData = {
      name: 'Laptop',
      categoryId: '1',
      price: 1000,
      description: 'A high-quality laptop.'
    };

    const response = await supertest(app)
      .post('/admin/items')
      .send(itemData);

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Laptop');
  });

  it('should get all items successfully', async () => {
    const response = await supertest(app)
      .get('/admin/items');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a specific item by ID successfully', async () => {
    const itemId = '1';

    const response = await supertest(app)
      .get(`/admin/items/${itemId}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(Number(itemId));
  });

  it('should update an item successfully', async () => {
    const itemId = '1';
    const updatedItemData = {
      name: 'Updated Laptop',
      price: 1200
    };

    const response = await supertest(app)
      .put(`/admin/items/${itemId}`)
      .send(updatedItemData);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Item was updated successfully.');
  });

  it('should delete an item successfully', async () => {
    const itemId = '1';

    const response = await supertest(app)
      .delete(`/admin/items/${itemId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Item was deleted successfully!');
  });
});
