var expect = require('expect.js');
var repository = require('../../app/rank/rank-repository');

describe('rank repository', () => {
    it('should get a list of ranks', done => {
        repository
            .getRanks(ranks => {
                 expect(ranks[0]).to.eql({});
                 
                 done();
            });
    });
});