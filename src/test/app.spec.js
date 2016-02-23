var expect = require('expect.js');
var request = require('supertest');
var rewire = require('rewire');
var express = require('express');
var app = rewire('../app/app');

describe('app', () => {
    var mockUserRouter = () => {                
        var mockApp = express();        
        
        mockApp.post('/', (req, res) => {
            res.status(200).send(); 
        });
        
        return mockApp;
    };
    
    var mockAuthorizationService = {
        authorize: (credentials, callback) => {
            callback(false);
        }
    };
    
    app.__set__('userRouter', mockUserRouter());
    app.__set__('authorizationService', mockAuthorizationService);
    
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
    
    it('should allow a POST /user request without authorization', done => {
        request
            .post('/user')
            .expect(200)
            .end(err => {
                if (err) return done(err);
                
                done(); 
            });
    });    
});
