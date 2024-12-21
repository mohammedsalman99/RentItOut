import supertest from 'supertest';
import { app } from '../app.js';

describe('Admin Routes - Categories', () => {
  it('should create a new category successfully', async () => {
    const categoryData = {
      name: 'Electronics'
    };

    const response = await supertest(app)
      .post('/admin/categories')
      .send(categoryData);

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Electronics');
  });

  it('should get all categories successfully', async () => {
    const response = await supertest(app)
      .get('/admin/categories');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a specific category by ID successfully', async () => {
    const categoryId = '1';

    const response = await supertest(app)
      .get(`/admin/categories/${categoryId}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(Number(categoryId));
  });

  it('should update a category successfully', async () => {
    const categoryId = '1';
    const updatedCategoryData = {
      name: 'Home Appliances'
    };

    const response = await supertest(app)
      .put(`/admin/categories/${categoryId}`)
      .send(updatedCategoryData);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Category was updated successfully.');
  });

  it('should delete a category successfully', async () => {
    const categoryId = '1';

    const response = await supertest(app)
      .delete(`/admin/categories/${categoryId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Category was deleted successfully!');
  });
});
