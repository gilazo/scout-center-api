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
    
    it('should add a new user', done => {
        repository.addUser({ username: 'test@test.com' }, err => {
            if (err) return done(err);
            
            expect(err).to.be(undefined);
            
            done(); 
        });
    });
    
    it('should update a user', done => {
        repository.updateUser({ username: 'test@test.com'}, err => {
            if (err) return done(err);
            
            expect(err).to.be(undefined);
            
            done(); 
        });
    });
});
