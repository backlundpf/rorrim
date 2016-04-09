var things = {
	clientId: '8fc9c132-4991-4b8c-b6fc-7d00054e00ab',
	clientSecret: '6e77c163-54d5-4e86-a70b-33e90e12071f',
	endpointsUri: 'https://graph.api.smartthings.com/api/smartapps/endpoints',
	thingsList: [],
	thingsLocation: '.things',
	updateInterval: 40000,
	statusUpdateInterval: 4000,
	fadeInterval: 4000,
	intervalId: null,
	statusIntervalId: null
};

things.updateThingsStatus = function () {

	thingsInterface.authorizeClient();

	//$(this.thingsLocation).updateWithText('test string', this.fadeInterval);
	//var things = endpoints.getThings();
	//this.thingsList = [];

	// Iterate through the things and create the thingsList: thing status

}

things.updateThings = function () {

	var thing1 = {
		thing: "switch 1",
		state: "on"
	};
	var thing2 = {
		thing: "Christmas Switch",
		state: "off"
	};
	
	var testList = [ thing1, thing2];

	table = $('<table/>').addClass('xsmall').addClass('things-table');

	for (var index = 0; index < testList.length; index++) {
		var thing = testList[index];

		var row = $('<tr/>');
		row.append($('<td/>').html(thing.thing).addClass('description'));
		row.append($('<td/>').html(thing.state).addClass('things dimmed'));
		table.append(row);
	}


	$(this.thingsLocation).updateWithText(table, this.fadeInterval);
	
}

things.init = function () {

//	this.updateThings();
	this.updateThingsStatus();
//	thingsInterface.testString('test');

/*
	this.intervalId = setInterval(function () {
		this.updateThings();
	}.bind(this), this.updateInterval);

	this.statusIntervalId = setInterval(function () {
		this.updateThingsStatus();
	}.bind(this), this.statusUpdateInterval);
*/
}
