var expect = require('chai').expect;
var repository = require('../../app/rank/rank-repository')();

describe('rank repository', () => {
    it('should get a list of ranks', done => {
        repository
            .getRanks(ranks => {
                 expect(ranks[0]).to.deep.equal({});
                 
                 done();
            });
    });
});