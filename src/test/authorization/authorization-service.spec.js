var expect = require('chai').expect;
var rewire = require('rewire');
var authorizationService = rewire('../../app/authorization/authorization-service');

describe('authorization service', () => {
    const container = { 
        config: {
            db: {
                url: ''
            }
        },
        db: {
            connect: () => { },
            connection: {
                close: () => { }
            }
        },
        hashService: {
            hashValue: (value) => { 
                if (value === 'boy123') return value;
                
                return '';    
            }
        }
    };
    var MockUser = {
        findOne: (params, callback) => {
            if (params.username === 'scout') return callback(null, { password: 'boy123', salt: '' });
            
            callback(null, { password: '123', salt: '' });
        }
    };
    authorizationService.__set__('User', MockUser);
    const service = authorizationService(container);    
    
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
