import supertest from 'supertest';
import { expect } from 'chai';
import app from '../server';
import GroceryModel from '../models/GroceryModel';

const req = supertest(app);

describe('test for api endpoints', () => {
  beforeAll((done) => {
    GroceryModel.deleteMany({}).then(() => {
      done();
    });
  });

  it('should return Failed status when no  matching api route is found', (done) => {
    req.get('/api/invalidEndPoint')
      .end((error, res) => {
        expect(res.body.status).to.equal('Failed');
        expect(res.body.message).to.equal('Route does not exist');
        if (error) done(error);
        done();
      });
  });

  it('should return `200` when the home api is called', (done) => {
    req.get('/api/')
      .end((error, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal('Success');
        expect(res.body.message).to.equal('Welcome to the app API');

        if (error) done(error);
        done();
      });
  });

  it('should return an empty array collection of groceries', (done) => {
    req.get('/api/items')
      .end((error, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Sorry! No items in the store');
        if (error) done(error);
        done();
      });
  });

  it('should add a grocery item to the grocery collection', (done) => {
    req.post('/api/items')
      .send({ name: 'milk' })
      .end((error, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal('Grocery successfully added');
        expect(res.body.payload).to.have.property('name').to.equal('milk');
        expect(res.body.payload).to.have.property('purchaseStatus').to.equal(false);

        expect(res.body.payload);
        if (error) done(error);
        done();
      });
  });

  it('should get an array of groceries available', (done) => {
    req.get('/api/items')
      .end((error, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('All items are successfully retrieved');
        expect(res.body.payload).to.be.an('array').to.have.length(1);
        if (error) done(error);
        done();
      });
  });

  it('should return a `422` error for invalid id when updating', (done) => {
    req.put('/api/item/invalidId')
      .end((error, res) => {
        expect(res.status).to.equal(422);
        expect(res.body.message).to.equal('Sorry!, inavlid grocery id');

        if (error) done(error);
        done();
      });
  });

  it('should return a `422` error for invalid id when deleting', (done) => {
    req.delete('/api/item/invalidId')
      .end((error, res) => {
        expect(res.status).to.equal(422);
        expect(res.body.message).to.equal('Sorry!, inavlid grocery id');

        if (error) done(error);
        done();
      });
  });

  it('should return a `404` error for an item that does not exist or has been deleted', (done) => {
    const nonExistingId = '5c176971462e555eeb8c3b52';
    req.put(`/api/item/${nonExistingId}`)
      .end((error, response) => {
        expect(response.status).to.equal(404);
        expect(response.body.message).to.equal('Item not currently available');

        if (error) done(error);
        done();
      });
  });

  it('should return a `404` error for an item that does not exist or has been deleted', (done) => {
    const nonExistingId = '5c176971462e555eeb8c3b52';
    req.delete(`/api/item/${nonExistingId}`)
      .end((error, response) => {
        expect(response.status).to.equal(404);
        expect(response.body.message).to.equal('Item not currently available');

        if (error) done(error);
        done();
      });
  });
});