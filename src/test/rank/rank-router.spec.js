var expect = require('chai').expect;
var request = require('supertest');
var rewire = require('rewire');
var router = rewire('../../app/rank/rank-router');

describe('rank router', () => {
    var mockRankRepository = {
        getRanks: callback => {
            callback([{ name: 'purple' }]);        
        }
    };
    
    router.__set__('repository', mockRankRepository);
    
    request = request(router());
    
    it('should handle a GET / request', done => {
        request
            .get('/')
            .expect('Content-Type', /json/)
            .expect(302, [{ name: 'purple' }])
            .end(err => {
                if (err) return done(err);
                
                done();
            });
    });
});
