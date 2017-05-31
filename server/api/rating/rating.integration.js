'use strict';

var app = require('../..');
import request from 'supertest';

var newRating;

describe('Rating API:', function() {
  describe('GET /api/ratings', function() {
    var ratings;

    beforeEach(function(done) {
      request(app)
        .get('/api/ratings')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          ratings = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(ratings).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/ratings', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/ratings')
        .send({
          name: 'New Rating',
          info: 'This is the brand new rating!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newRating = res.body;
          done();
        });
    });

    it('should respond with the newly created rating', function() {
      expect(newRating.name).to.equal('New Rating');
      expect(newRating.info).to.equal('This is the brand new rating!!!');
    });
  });

  describe('GET /api/ratings/:id', function() {
    var rating;

    beforeEach(function(done) {
      request(app)
        .get(`/api/ratings/${newRating._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          rating = res.body;
          done();
        });
    });

    afterEach(function() {
      rating = {};
    });

    it('should respond with the requested rating', function() {
      expect(rating.name).to.equal('New Rating');
      expect(rating.info).to.equal('This is the brand new rating!!!');
    });
  });

  describe('PUT /api/ratings/:id', function() {
    var updatedRating;

    beforeEach(function(done) {
      request(app)
        .put(`/api/ratings/${newRating._id}`)
        .send({
          name: 'Updated Rating',
          info: 'This is the updated rating!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedRating = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedRating = {};
    });

    it('should respond with the original rating', function() {
      expect(updatedRating.name).to.equal('New Rating');
      expect(updatedRating.info).to.equal('This is the brand new rating!!!');
    });

    it('should respond with the updated rating on a subsequent GET', function(done) {
      request(app)
        .get(`/api/ratings/${newRating._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let rating = res.body;

          expect(rating.name).to.equal('Updated Rating');
          expect(rating.info).to.equal('This is the updated rating!!!');

          done();
        });
    });
  });

  describe('PATCH /api/ratings/:id', function() {
    var patchedRating;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/ratings/${newRating._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Rating' },
          { op: 'replace', path: '/info', value: 'This is the patched rating!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedRating = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedRating = {};
    });

    it('should respond with the patched rating', function() {
      expect(patchedRating.name).to.equal('Patched Rating');
      expect(patchedRating.info).to.equal('This is the patched rating!!!');
    });
  });

  describe('DELETE /api/ratings/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/ratings/${newRating._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when rating does not exist', function(done) {
      request(app)
        .delete(`/api/ratings/${newRating._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
