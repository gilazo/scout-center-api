var expect = require('chai').expect;
var request = require('supertest');
var rewire = require('rewire');
var handler = rewire('../../app/user/user-handler');

describe('user handler', () => {    
    var mockUser = function User() {
        this.save = callback => {
            callback();
        };
    };
    var mockDb = {
        connect: () => { },
        connection: {
            close: () => { }
        }
    };
    var mockHashService = {
        hashValue: value => {
            return value;
        }
    };
    var mockSaltService = {
        getSalt: () => {
            return '123';
        }
    };
    
    handler.__set__('User', mockUser);
    handler.__set__('db', mockDb);
    handler.__set__('hashService', mockHashService);
    handler.__set__('saltService', mockSaltService);
           
    request = request(handler());
     
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
            .expect(302, [{ username: 'friend@test.com'}])
            .end(err => {
                if (err) return done(err);
                
                done();
            });
    });
    
    it('should handle a POST request', done => {
        request
            .post('/')
            .send({ username: 'john@test.com', password: '123' })
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
