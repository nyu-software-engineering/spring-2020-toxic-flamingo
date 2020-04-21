var expect  = require('chai').expect;
var request = require('request');


it('Main page content', function(done) {
    request('http://localhost:7000/Follower' , function(error, response, body) {
        expect(response).to.not.equal(null);
        done();
    });
});


it('Load comments on a post', function(done) {
    request('http://localhost:7000/loadComments/1', function(error, response, body) {
        expect(response).to.have.property('artist_name');
        
        done();
    });
});

it('Hashtag feed', function(done) {
    request('http://localhost:7000/hashtagFeed/Computers', function(error, response, body) {
        expect(response).to.not.equal(null);      
        done();
    });
});

