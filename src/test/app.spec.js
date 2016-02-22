var expect = require('expect.js');
var request = require('supertest');
var rewire = require('rewire');
var app = rewire('../app/app');

describe('app', () => {
    request = request(app());
    
    it('should return a 401 for unauthorized requests', done => {
        request
            .get('/ranks')
            .expect(401)
            .end(err => {
                if (err) return done(err);
                
                done();
            });
    });
});
