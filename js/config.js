var config = {
    lang: 'eng',
    time: {
        timeFormat: 12
    },
    weather: {
        //change weather params here:
        //units: metric or imperial
        params: {
            q: 'washington,us',
            units: 'imperial',
            // if you want a different lang for the weather that what is set above, change it here
            lang: 'eng',
            APPID: 'be4f965092b5078a3ff1b871574ea860'
        }
    },
    compliments: {
        interval: 30000,
        fadeInterval: 4000,
        morning: [
            'Good morning, gorgeous!',
            'Enjoy your day!',
            'How was your sleep?',
            'The world is yours!'
        ],
        afternoon: [
			'balls',
			'failure'
		],
        evening: [
            'Wow, you look great!',
            'You look nice!',
            'Great job today!'
        ]
    },
    calendar: {
        maximumEntries: 10,
        url: "http://outlook.office365.com/owa/calendar/7257eb42e35f4407b602ed6df6717c17@cto-v.com/968c98a48df14cbdb7819189cfc365e01460000859812051806/calendar.ics"
    },
    news: {
        feed: 'http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml'
    },
    smartthings: {
	test: 'test string'
    }
}

function afternoonCompliments() {
	return ;
}

config.getCompliments = function() {
	// Call to PHP read database.
	// Parse the returned string, create an array.
	return {
		'morning': [
            'Good morning, gorgeous!',
            'Enjoy your day!',
            'How did you sleep?',
            'The world is yours!'
		],
		'afternoon': [
            'Hello, beautiful!',
            'Simply amazing!',
            'Looking good today!'
		],
		'evening': [
            'Wow, you look great!',
            'You look nice!',
            'Great job today!'
        ],
	};
}


config.init = function () {
	/* Here's where we'll load the data from the database. */
	this.compliments.afternoon = [
            'success!',
            'amazing!',
        ];
	this.time.timeFormat = 24;
}
