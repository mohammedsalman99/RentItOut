import supertest from 'supertest';
import { app } from '../app.js';

describe('Admin Routes - Users', () => {
  it('should create a new user successfully', async () => {
    const userData = {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123'
    };

    const response = await supertest(app)
      .post('/admin/users')
      .send(userData);

    expect(response.status).toBe(201);
    expect(response.body.username).toBe('testuser');
  });

  it('should get all users successfully', async () => {
    const response = await supertest(app)
      .get('/admin/users');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a specific user by ID successfully', async () => {
    const userId = '1';

    const response = await supertest(app)
      .get(`/admin/users/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(Number(userId));
  });

  it('should update a user successfully', async () => {
    const userId = '1';
    const updatedUserData = {
      username: 'updateduser',
      email: 'updateduser@example.com'
    };

    const response = await supertest(app)
      .put(`/admin/users/${userId}`)
      .send(updatedUserData);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User was updated successfully.');
  });

  it('should delete a user successfully', async () => {
    const userId = '1';

    const response = await supertest(app)
      .delete(`/admin/users/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User was deleted successfully!');
  });
});
