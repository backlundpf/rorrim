/**
 * thingsInterface
 * Method of reading smartthings endpoints with javascript.
 *
 * author: Peter Backlund
 * date: 2015.01.18
 */

var thingsInterface = {
	raw_data: null,	//store unprocessed data.
	endpoints: [],	//store processed data.
	clientId: '8fc9c132-4991-4b8c-b6fc-7d00054e00ab',
	clientSecret: '6e77c163-54d5-4e86-a70b-33e90e12071f',
	endpointsUri: 'https://graph.api.smartthings.com/api/smartapps/endpoints',
	redirectUri: 'https://localhost' //this is the URI that will be called with our access code once we authenticate our smart things account.
};

/**
* getAuthCode
* Request the authorization code.
*/
thingsInterface.getAuthCode = function (authUrl, callback) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
		if (xmlHttp.readyState == 4 ) {
			//$('.things').html(authUrl);
			//$('.things').html(xmlHttp.status);
			//$('.things').html(xmlHttp.responseText);
			callback(xmlHttp.responseText);
		}
	}
	//$('.things').html('test string');
	xmlHttp.open("GET", authUrl, true); // true for asynchronous
	xmlHttp.send(null);
}

/**
 * authorizeClient
 * Complete all the steps to authorize the client
 */
thingsInterface.authorizeClient = function () {
	//$('.things').html(this.clientId);
	//$('.things').updateWithText('test string', 4000);
	//First we need the access token
	var authUrl = "https://graph.api.smartthings.com/oauth/authorize?response_type=code&client_id=" + this.clientId + "scope=app&redirect_uri=" + this.redirectUri;
	//$('.things').html(authUrl);
	
	//this.getAuthCode( authUrl
	
	this.getAuthCode("controllers/things.php" + "?url=" + encodeURIComponent(authUrl), function(rawData) {
		//TODO: Do something with the response data
		//this.rawData = rawData;
		//$('.things').html('callback');
	});
	
	
	//$('.things').html('test string');
	
}

thingsInterface.testString = function (test_string) {
	//$('.things').html(test_string);
}

/**
* loadThings
* Using AJAX to load the requested things, passing it to the callback when completed
*/

/**
* getThings
* return a list of connected smartthings.
*/


