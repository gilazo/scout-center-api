var expect = require('chai').expect;
var service = require('../../app/authorization/authorization-service')();

describe('authorization service', () => {
    it('should return true if request is authorized', done => {
        service.authorize({ name: 'scout', pass: 'boy123' }, authorized => {
            expect(authorized).to.equal(true);
            
            done();
        });
    });
    
    it('should return false if request is unauthorized', done => {
        service.authorize(null, authorized => {
            expect(authorized).to.equal(false);
             
            done();
        });
    });
});
