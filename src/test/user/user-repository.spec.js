var expect = require('chai').expect;
var rewire = require('rewire');
var sinon = require('sinon');
var User = require('../../app/user/user-model');
var repository = rewire('../../app/user/user-repository');

describe('user repository', () => {   
    var spy = sinon.spy();
    
    var mockDb = () => {        
        var service = {
            connect: () => { },
            connection: {
                close: () => { }
            }
        };
        
        return service;
    };
    
    var mockUser = function MockUser() {
        this.save = (callback) => {
            spy();
            
            callback();
        };
    };
            
    repository.__set__('db', mockDb());
    repository.__set__('User', mockUser);
    
    repository = repository();
    
    it('should get the user by email', done => {
        repository.getUser('test@test.com', user => {
            expect(user).to.deep.equal({});
            
            done();
        });
    });
    
    it('should get a list of users by current user id', done => {
        repository.getUsers(123, users => {
            expect(users[0]).to.deep.equal({});
            
            done();
        });
    });
    
    it('should get a list of ranks for the current user', done => {
        repository.getUserRanks(123, ranks => {
            expect(ranks[0]).to.deep.equal({});
            
            done(); 
        });
    });
    
    it('should add a new user', done => {
        repository.addUser({ email: 'test@test.com', password: '123' }, err => {
            if (err) return done(err);                       
            
            expect(spy.called).to.equal(true);
            
            done(); 
        });
    });
    
    it('should update a user', done => {
        repository.updateUser({ email: 'test@test.com'}, err => {
            if (err) return done(err);
            
            expect(err).to.equal(undefined);
            
            done(); 
        });
    });
});
