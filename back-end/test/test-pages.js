var expect  = require('chai').expect;
var request = require('request');


it('Main page content', function(done) {
    request('http://localhost:7000/Follower' , function(error, response, body) {
        expect(response).to.not.equal(null);
        //console.log(response);
        done();
    });
});

//hashtag//feed
it('Hashtag Feed', function(done) {
    request('http://localhost:7000/Hashtag/' , function(error, response, body) {
        expect(response).to.not.equal(null);
        //console.log(response);
        done();
    });
});

//profile posts
it('Profile Posts', function(done) {
    request('http://localhost:7000/profileposts/' , function(error, response, body) {
        expect(response).to.not.equal(null);
        //console.log(response);
        done();
    });
});

//harmonies
it('Harmonies', function(done) {
    request('http://localhost:7000/Harmonies' , function(error, response, body) {
        expect(response).to.not.equal(null);
        //console.log(response);
        done();
    });
});

