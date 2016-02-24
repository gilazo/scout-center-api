var expect = require('chai').expect;
var service = require('../../app/encryption/hash-service')();

describe('hash service', () => {
     it('should return a hashed string', () => {
         var hash = service.hashValue('123');
         
         expect(hash).to.equal('202cb962ac59075b964b07152d234b70');
     });
});
