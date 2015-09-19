// basic test of logging.
var util = require('util');
var logger = require('../index.js')();

//console.dir(logger);

var N = 0;

var Console = require('console').Console;

var newstdout = logger.getNewWritableConsole(logger.LEVELS.log);
var newstderr = logger.getNewWritableConsole(logger.LEVELS.error);

var console = new Console(newstdout,newstderr);
	
console.log("Hello. Log.");


var testCallback = function(str,id) {
	var entries = str.split("ϐ");      // use special char to separate entries...
	for(var n=0;n<entries.length;n++)
		util.log("CB (" + id + ")>" + entries[n] + "<"); // DO NOTE: you need to use util.log here, otherwise it will be recursive test ;)
}


logger.addTarget({
	    callback: testCallback,

	    delim: 'ϐ' // separate each entry with a special char
	},function(targetid,err){
		if(err) {
			console.log("error: "+ util.inspect(err));
		} else {

			var ret = logger.addFilter({ 
				target: targetid,
				mask: logger.LEVELS.log,
				pre: "LOG>   "
			});
			var ret = logger.addFilter({ 
				target: targetid,
				mask: logger.LEVELS.error,
				pre: "ERROR> "
			});
			var ret = logger.addFilter({ 
				target: targetid,
				mask: logger.LEVELS.warn,
				pre: "WARN>  "            // unfortunately, Console does not differentiate these.
			});

			setTimeout(function(){
				for(var n=0;n<100;n++) {
					console.log("Hello. Log.");				
					console.error("Hello. Error.");				
					console.warn("Hello. Warn.");				
					console.dir({hello:"there"});
				}
			},1000);
		}
	}
);

// var big = "123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890";
// for(var n=0;n<10000;n++) {`
// 	logger.log("test log " + n);
// 	setTimeout(function(q){
// 		logger.error("AAAAAAAAAAAAAAAAAAAAAAAAAAAAA--"+q+"--");
// 		N++;
// 		if(N == 9999) {
// 			setTimeout(function(p) {
// 				console.log("------------END--------------");
// 				logger.debug("LAST ONELAST ONELAST ONELAST ONELAST ONELAST ONELAST ONELAST ONELAST ONELAST ONELAST ONE");				
// 			}, 10+n*10, n);
// 		}
// 	}, 50+n*10,n);
// 	if(n % 11 == 0) {
// 		setTimeout(function(q){
// 			logger.log(big +"#################" + q + "*");
// 		}, 100+n*10,n);
// 	}		

// }

setTimeout(function(){
	console.log("DONE.");
},3000);



//console.log("done");