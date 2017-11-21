var Chrome = require('chrome-remote-interface');
var program = require('commander');

program.option('-H, --host <host>', 'Remote debugging protocol host', 'localhost')
       .option('-p, --port <port>', 'Remote debugging protocool port', '9876')
       .option('-s, --showcategories', 'Show categories')
       .option('-c, --categories <categories>', 'Set categories', "")
       .parse(process.argv);

var options = {
    'host': program.host,
    'port': program.port,
};

Chrome(options, function (chrome) {
    with (chrome) {

	if (program.showcategories) {
	    Tracing.getCategories(function (message, result) {
		console.log(result);
		close();
	    });
	} else {
            a = { "traceEvents" : [] };
            on('Tracing.dataCollected', function (message) {
		a.traceEvents = a.traceEvents.concat(message.value);
            });
            on('Tracing.tracingComplete', function () {
		console.log(JSON.stringify(a));
		close();
            });
            process.on('SIGINT', function() {
		Tracing.end();
            });
	    console.error("Connecting to: "+program.host+":"+program.port);
	    console.error("Categories: "+program.categories);
            Tracing.start({"categories":program.categories});
	}
    }
}).on('error', function () {
    console.error('Cannot connect to Chrome');
});

