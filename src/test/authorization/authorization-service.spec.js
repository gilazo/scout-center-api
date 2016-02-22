var expect = require('expect.js');
var service = require('../../app/authorization/authorization-service');

describe('authorization service', () => {
    it('should return true if request is authorized', done => {
        service.authorize({ name: 'scout', pass: 'boy123' }, authorized => {
            expect(authorized).to.eql(true);
            
            done();
        });
    });
    
    it('should return false if request is unauthorized', done => {
        service.authorize(null, authorized => {
            expect(authorized).to.eql(false);
             
            done();
        });
    });
});
