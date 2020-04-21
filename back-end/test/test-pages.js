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
        

it('Trophies', function(done) {
    request('http://localhost:7000/trophies' , function(error, response, body) {
        expect(response).to.not.equal(null);

        done();
    });
});


it('Hashtag feed', function(done) {
    request('http://localhost:7000/hashtagFeed/Computers', function(error, response, body) {
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
//profile posts
it('Profile Posts', function(done) {
    request('http://localhost:7000/profileposts/:userID' , function(error, response, body) {
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
//hashtag//feed
it('Hashtag Feed', function(done) {
    request('http://localhost:7000/hashtagFeed/:hashtag' , function(error, response, body) {
        expect(response).to.not.equal(null);
        //console.log(response);
        done();
    });

});

})


