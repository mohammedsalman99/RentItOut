import supertest from 'supertest';
import { app } from '../app.js';
import db from '../models';
const { Review, Item, User } = db;

describe('Admin Routes - Reviews', () => {
  let testItem, testUser;

  beforeAll(async () => {
    
    testItem = await Item.create({ name: 'Test Item', description: 'Description' });
    testUser = await User.create({ name: 'Test User', email: 'testuser@example.com' });
  });

  afterAll(async () => {
    
    await Review.destroy({ where: { comment: 'Great item!' } });
    await testItem.destroy();
    await testUser.destroy();
  });

  it('should create a new review successfully', async () => {
    const reviewData = {
      itemId: testItem.id,
      renterId: testUser.id,
      rating: 4,
      comment: 'Great item!'
    };

    const response = await supertest(app)
      .post('/admin/reviews')
      .send(reviewData);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Review created successfully');
    expect(response.body.review.rating).toBe(4);
    expect(response.body.review.comment).toBe('Great item!');
  });

  it('should fail to create a review if item or user does not exist', async () => {
    const reviewData = {
      itemId: 9999, 
      renterId: 9999, 
      rating: 4,
      comment: 'Invalid item or user'
    };

    const response = await supertest(app)
      .post('/admin/reviews')
      .send(reviewData);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Item or user not found');
  });

  it('should get all reviews for a specific item', async () => {
    const response = await supertest(app)
      .get(`/admin/reviews/item/${testItem.id}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    
    expect(response.body[0].itemId).toBe(testItem.id);
  });

  it('should return 404 if no reviews are found for an item', async () => {
    const response = await supertest(app)
      .get('/admin/reviews/item/9999'); 

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('No reviews found for this item');
  });

  it('should get a specific review by ID', async () => {
    const review = await Review.create({
      itemId: testItem.id,
      renterId: testUser.id,
      rating: 3,
      comment: 'Sample Review'
    });

    const response = await supertest(app)
      .get(`/admin/reviews/${review.id}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(review.id);
    expect(response.body.comment).toBe('Sample Review');

    await review.destroy(); 
  });

  it('should return 404 if review by ID does not exist', async () => {
    const response = await supertest(app)
      .get('/admin/reviews/9999'); 

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Review not found');
  });

  it('should update a review successfully', async () => {
    const review = await Review.create({
      itemId: testItem.id,
      renterId: testUser.id,
      rating: 3,
      comment: 'Needs improvement'
    });

    const updatedData = {
      rating: 5,
      comment: 'Much better now'
    };

    const response = await supertest(app)
      .put(`/admin/reviews/${review.id}`)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Review updated successfully');
    expect(response.body.review.rating).toBe(5);
    expect(response.body.review.comment).toBe('Much better now');

    await review.destroy(); 
  });

  it('should return 404 if trying to update a non-existent review', async () => {
    const updatedData = {
      rating: 5,
      comment: 'Does not exist'
    };

    const response = await supertest(app)
      .put('/admin/reviews/9999') 
      .send(updatedData);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Review not found');
  });

  it('should delete a review successfully', async () => {
    const review = await Review.create({
      itemId: testItem.id,
      renterId: testUser.id,
      rating: 2,
      comment: 'Not great'
    });

    const response = await supertest(app)
      .delete(`/admin/reviews/${review.id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Review deleted successfully');

    const deletedReview = await Review.findByPk(review.id);
    expect(deletedReview).toBeNull(); 
  });

  it('should return 404 if trying to delete a non-existent review', async () => {
    const response = await supertest(app)
      .delete('/admin/reviews/9999'); 

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Review not found');
  });
});
