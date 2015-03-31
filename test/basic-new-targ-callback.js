// basic test of logging.

var logger = require('../index.js');
var util = require('util');


console.dir(logger);

var N = 0;


// logger.addTarget({
// 	    file: "testlog.log"
// 	},function(targetid,err){
// 		if(err) {
// 			console.log("error: "+ util.inspect(err));
// 		} else {
// 			console.log("added target: " + targetid);
// 			var ret = logger.addFilter({ 
// 				target: targetid,
// 				mask: logger.LEVELS.error
// 			});
// 			console.log("added filter: " + ret);
// 			var ret = logger.addFilter({ 
// 				target: targetid,
// 				mask: logger.LEVELS.debug,
// 				tag: 'Eds'
// 			});
// 			console.log("added filter: " + ret);
// 			var ret = logger.addFilter({ 
// 				target: targetid,
// 				mask: logger.LEVELS.debug,
// 				tag: 'Eds',
// 				origin: 'special.js'
// 			});
// 			console.log("added filter: " + ret);
// 		}

// 		logger.error("************ FIRST **********");
// 		for(var n=0;n<1000;n++) {
// 			logger.debug("....DEBUG....");
// 			logger.debug('Eds', "....DEBUG....");			
// 			logger.error("....ERROR....");
// 			logger.log(" log log log");
// 		}
// 		logger.error("************ LAST **********");
// 	});

var testCallback = function(str,id) {
	console.log("CB (" + id + ")>" + str + "<");
}

logger.addTarget({
	    file: "rotateThis.log",
	    callback: testCallback,
	    delim: '\n', // separate each entry with a hard return
	    rotate: {
	    	max_files: 5,
	    	max_file_size:  10000,
	    	max_total_size: 100000
//	    	,rotate_on_start: true
	    }
	},function(targetid,err){
		if(err) {
			console.log("error: "+ util.inspect(err));
		} else {
			console.log("added rotate target: " + targetid);
			var ret = logger.addFilter({ 
				target: targetid,
				tag: 'rotate'
				// ,
				// mask: logger.LEVELS.ALL
			});
		}		
		var N = 1000;
		logger.debug('rotate',"************ FIRST **********");
		var I = setInterval(function(){
			for(var n=0;n<10;n++) {
				logger.debug('rotate',"....rotate me ["+N+"]....");
				N--;
			}
			if(N == 0) {
				clearInterval(I);
				logger.debug('rotate',"************ LAST **********");	
			}
		},10);


	});



// var big = "123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890";
// for(var n=0;n<10000;n++) {
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





//console.log("done");