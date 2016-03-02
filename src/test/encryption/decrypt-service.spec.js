var expect = require('chai').expect;
var decryptService = require('../../app/encryption/decrypt-service');

describe('decrypt service', () => {
    var service = decryptService({ 
            auth: request => {
                if (request.name !== 'scout') {
                    return null;
                } else {
                    return { name: 'scout', pass: 'boy123' };
                }
            }       
        });
        
    it('should decrypt the authorization header', done => {
        service.decryptAuthorizationHeader({ name: 'scout' }, credentials => {
            expect(credentials).to.deep.equal({ name: 'scout', pass: 'boy123' });
            
            done();
        });
    });
});
