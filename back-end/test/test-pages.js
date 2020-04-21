var expect  = require('chai').expect;
var request = require('request');


it('Main page content', function(done) {
    request('http://localhost:7000/Follower' , function(error, response, body) {
        expect(response).to.not.equal(null);
        //console.log(response);
        done();
    });
});