var expect = require('expect.js');
var repository = require('../../app/user/user-repository.js');

describe('user repository', () => {
    it('should get the user by username', done => {
        repository.getUser('test@test.com', user => {
            expect(user).to.eql({});
            done();
        });
    });
    
    it('should get a list of users by current user id', done => {
        repository.getUsers(123, users => {
            expect(users[0]).to.eql({});
            done();
        });
    });
});