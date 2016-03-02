var expect = require('chai').expect;
var request = require('supertest');
var rewire = require('rewire');
var express = require('express');
var bodyParser = require('body-parser');
var auth = require('basic-auth');
var decryptService = require('../../app/encryption/decrypt-service')({ auth: auth });
var handler = rewire('../../app/user/user-handler');

describe('user handler', () => {
    var container = { 
        config: {
            db: {
                url: ''
            }
        },
        db: {
            connect: () => { },
            connection: {
                close: () => { }
            }
        },
        hashService: {
            hashValue: value => { return value; }
        },
        saltService: {
            getSalt: () => { return '123'; }
        },
        express: express,
        bodyParser: bodyParser,
        decryptService: decryptService
    }; 
    var MockUser = function User() {
        this.save = callback => {
            callback();
        };
    };
    MockUser.findOne = (params, callback) => { 
        if (params.username === 'test@test.com') {
            var user = { username: 'test', salt: '123', password: '456' };
            user.toObject = () => { return user; };
            
            return callback(null, user);  
        }
    };
    
    handler.__set__('User', MockUser);
           
    request = request(handler(container));
     
    it('should handle a GET / request', done => {
        request
            .get('/')
            .set('Authorization', 'Basic dGVzdEB0ZXN0LmNvbTpwdXJwbGU=')
            .expect('Content-Type', /json/)
            .expect(302, { username: 'test' })
            .end(err => {
                if (err) return done(err);
                
                done(); 
            });
    });
    
    it('should not return the user object with the salt and password keys', done => {
        request
            .get('/')
            .set('Authorization', 'Basic dGVzdEB0ZXN0LmNvbTpwdXJwbGU=')
            .end((err, res) => {
                if (err) return done(err);                
                
                expect(res.body.hasOwnProperty('salt')).to.equal(false);
                expect(res.body.hasOwnProperty('password')).to.equal(false);
                
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
