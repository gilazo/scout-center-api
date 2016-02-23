var expect = require('expect.js');
var model = require('../../app/user/user-model');

describe('user model', () => {
    it('should export the user model', () => {
       expect(model.modelName).to.eql('User');      
    });
});
