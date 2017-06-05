var request = require('request'); // "Request" library

var client_id = '0804cecb10854f549849fe6c0e14775d'; // Your client id
var client_secret = 'fae93c4d207f433aa0f62aaa590a0a60'; // Your secret


// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + 'MDgwNGNlY2IxMDg1NGY1NDk4NDlmZTZjMGUxNDc3NWQ6ZmFlOTNjNGQyMDdmNDMzYWEwZjYyYWFhNTkwYTBhNjA='
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {

    // use the access token to access the Spotify Web API
    var token = body.access_token;
    console.log(token);
    var options = {
      url: 'https://api.spotify.com/v1/users/jmperezperez',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    };
    request.get(options, function(error, response, body) {
      // console.log(body);
    });
  }
});
