// changeNestTemp

var https = require('https');

var options = {
	hostname: 'https://api.home.nest.com',
	path:'/oauth2/access_token',
	method:'PUT'
}

var req = https.request(options, (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (e) => {
  console.error(e);
});

req.end();
















// function tempChangePut(callback) {

// return https.put({

// })

// }



// // oauth2
// var oauth2URL = 'https://api.home.nest.com/oauth2/access_token'
// // type is POST
// var oauth2RequestObject = {
// 'client_id':'881bcf1c-53cf-47bf-b073-604824af0cff',
// 'client_secret': 'hWSIDkz2K3KCrYYmUW7VGNSKz',
// 'code': 'EV8PUAA4',
// 'grant_type': 'authorization_code'
// }




// // Change the temp
// var tempChangePut = function(){

// var URL = 'https://developer-api.nest.com/devices/thermostats/8dTHvJXqdWuYoEdPJpVKn0Oy8O7EOlHA'
// var requestObject = {"target_temperature_f": 66}
// }









// // Headers:
// var headers = {
// 	'Content-Type':'application/x-www-form-urlencoded',
// 	'Authorization':'Bearer c.Or6f2ynkSJ9D66IWQEavZH9D7rdCSbhYBaIdKSJpEnePQukih3oBMmyVit82vK53HizhEPgtn0ISuvRg2m8AIHFeyPzns5PweXD1mjjk7sjopgI4ZCR0tlHZVh25tFLPXuv0lj1rLtCIoqTT'
// }




// // URL
// var url = 'https://developer-api.nest.com/devices/thermostats/8dTHvJXqdWuYoEdPJpVKn0Oy8O7EOlHA'

// // request object

// var requestObject = {"target_temperature_f": 66}