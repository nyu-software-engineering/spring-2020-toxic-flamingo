var expect  = require('chai').expect;
var request = require('request');


it('Main page content', function(done) {
    request('http://localhost:7000/Follower' , function(error, response, body) {
        expect(response).to.not.equal(null);
        //console.log(response);
        done();
    });
});


it('Trophies', function(done) {
    request('http://localhost:7000/trophies' , function(error, response, body) {
        expect(response).to.not.equal(null);
        done();
    });
});

/*
it('Mainfeed/Uesr', function(done) {
    request('http://localhost:7000/mainFeed/:userId' , function(error, response, body) {
        expect(response).to.not.equal(null);
        done();
    });
    done();
});
*/

it('Search', function(done) {
    request('http://localhost:7000/Search' , function(error, response, body) {
        expect(response).to.not.equal(null);
        done();
    });
});