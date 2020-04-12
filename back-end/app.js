// import and instantiate express
const express = require("express"); // CommonJS import style!
const app = express(); // instantiate an Express object
// we will put some server logic here later...
// export the express app we created to make it available to other modules


app.get('/callback', function(req, res){
    res.send('Hello i have the token');
})

app.get('/login', function(req, res) {
    var scopes = 'user-read-private user-read-email';
    let my_client_id = '691936c2acfc4bad82db2fe642f023ec';
    let redirect_uri = 'http://localhost:3000/callback'
    res.redirect('https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' + my_client_id +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' + encodeURIComponent(redirect_uri));
    });


module.exports = app;
