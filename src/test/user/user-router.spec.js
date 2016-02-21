var expect = require('expect.js');
var request = require('supertest');
var rewire = require('rewire');
var router = rewire('../../app/user/user-router');

describe('user router', () => {        
    var mockUserRepository = {
        getUser: (username, callback) => {
            callback({ username: 'test@test.com' });
        },
        getUsers: (id, callback) => {
            callback([{ username: 'friend@test.com' }]);
        }
    };
    
    router.__set__('repository', mockUserRepository); 
    
    request = request(router());
     
    it('should handle a GET / request', done => {
        request
            .get('/')
            .expect('Content-Type', /json/)
            .expect(302, { username: 'test@test.com' })
            .end(err => {
                if (err) return done(err);
                
                done(); 
            });
    });
    
    it('should hand a GET /friends request', done => {
        request
            .get('/friends')
            .expect('Content-Type', /json/)
            .expect(302, [ { username: 'friend@test.com'} ])
            .end(err => {
                if (err) return done(err);
                
                done();
            });
    });
});
