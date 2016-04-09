things.authorize = function () {
	var request = require('request');
	var express = require('express'),
		app = express();

	var oauth2 = require('simple-oauth2')({
		clientID: this.clientId,
		clientSecret: this.clientSecret,
		site: 'https://graph.api.smartthings.com'
	});

	// Authorization uri definition
	var authorization_uri = oauth2.authCode.authorizeURL({
		redirect_uri: 'http://localhost:3000/callback',
		scope: 'app',
		state: '3(#0/!~'
	});

	// Initial page redirecting to Github
	app.get('/auth', function (req, res) {
		res.redirect(authorization_uri);
	});

	// Callback service parsing the authorization token and asking for the access token
	app.get('/callback', function (req, res) {
		var code = req.query.code;

		oauth2.authCode.getToken({
			code:code,
			redirect_uri: 'http://localhost:3000/callback',
		}, saveToken);

		function saveToken(error, result) {
			if (error) { console.log('Access Token Error', error.message); }

			// result.access_token is the token, get the endpoint
			var bearer = result.access_token;
			var sendreq = { method: "GET", uri: endpoints_rui + "?access_token=" + result.access_token };
			request(sendreq, function (err, res1, body) {
				var endpoints = JSON.parse(body);
				
				//we just show the final access URL and Bearer code
				var access_url = endpoints[0].url
				res.send('<pre>https://graph.api.smartthings.com/' + access_url + '</pre><br><pre>Bearer ' + bearer + '</pre>');
			});
		}
	});

	app.get('/', function(req, res) {
		res.send('<a href="/auth">Connect with SmartThings</a>');
	});

	app.listen(3000);

	console.log('Express server started on port 3000');
}
