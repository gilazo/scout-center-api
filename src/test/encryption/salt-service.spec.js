const expect = require('chai').expect;
const service = require('../../app/encryption/salt-service')();

describe('salt service', () => {
    it('should generate and return a random salt', () => {
        const salt = service.getSalt();
        
        expect(salt).to.be.a('string'); 
    });  
});
