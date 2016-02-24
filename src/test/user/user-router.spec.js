var expect = require('chai').expect;
var request = require('supertest');
var rewire = require('rewire');
var router = rewire('../../app/user/user-router');

describe('user router', () => {        
    var mockUserRepository = {
        getUser: (username, callback) => {
            callback({ username: 'test@test.com' });
        },
        getUserRanks: (id, callback) => {
            callback([{ name: 'purple' }]);  
        },
        getUsers: (id, callback) => {
            callback([{ username: 'friend@test.com' }]);
        },
        addUser: (user, callback) => {
            callback();
        },
        updateUser: (user, callback) => {
            callback();
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
    
    it('should handle a GET /ranks request', done => {
        request
            .get('/ranks')
            .expect('Content-Type', /json/)
            .expect(302, [{ name: 'purple' }])
            .end(err => {
                if (err) return done(err);
                
                done();
            }); 
    });
    
    it('should handle a GET /friends request', done => {
        request
            .get('/friends')
            .expect('Content-Type', /json/)
            .expect(302, [ { username: 'friend@test.com'} ])
            .end(err => {
                if (err) return done(err);
                
                done();
            });
    });
    
    it('should handle a POST request', done => {
        request
            .post('/')
            .send({ username: 'john@test.com' })
            .expect(201)
            .end(err => {
                if (err) return done(err);
                
                done();
            }); 
    });
    
    it('should handle a PUT request', done => {
        request
            .put('/')
            .send({ username: 'john@test.com' })
            .expect(200)
            .end(err => {
                if (err) return done(err);
                
                done();
            });
    });
});
