var expect = require('chai').expect;
var service = require('../../app/encryption/salt-service')();

describe('salt service', () => {
    it('should generate and return a random salt', () => {
        var salt = service.getSalt();
        
        expect(salt).to.be.a('string'); 
    });  
});
