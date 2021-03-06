// {"target_temperature_f": 73}

// https://developer-api.nest.com/devices/thermostats/$THERMOSTAT_ID?auth=$AUTH

// You can set heat-cool temperatures in one call, but you will need to be in heat-cool mode:

// {"target_temperature_low_f": 69, "target_temperature_high_f": 73}


var https = require('https');
var queryString = require('querystring');
var url = require('url');
var util = require('util');

var userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1309.0 Safari/537.17';
var username;
var password;
var session = {};

var init = function(user, pass) {
    username = user;
    password = pass;
    return this;
}

var login = function(callback) {
    post(
        {
        hostname : 'home.nest.com',
        port : 443,
        path : '/user/login',
        body :
            {
            'username' : username,
            'password' : password
            }
        }, function(data) {
        if (data.error) {
            console.log('Error authenticating: ' + data.error + ' (' + data.error_description + ')');
            return;
        }

        session = data;
        session.urls.transport_url = url.parse(session.urls.transport_url);

        if (callback) {
            callback(data);
        }
    });
};

var getInfo = function(serialNumber, callback) {
    login(function() {
        get(function(data) {
            if (!data.device[serialNumber] || !data.shared[serialNumber]) {
                return;
            }

            callback(merge(data.device[serialNumber], data.shared[serialNumber]));
        });
    });
};

var get = function(callback) {
    var path = '/v2/mobile/' + session.user;
    var allData = [];

    var options =
        {
        host : session.urls.transport_url.hostname,
        port : session.urls.transport_url.port,
        path : path,
        method : 'GET',
        headers :
            {
            'User-Agent' : userAgent,
            'X-nl-user-id' : session.userid,
            'X-nl-protocol-version' : '1',
            'Accept-Language' : 'en-us',
            'Authorization' : 'Basic ' + session.access_token
            }
        };
    var request = https.request(options, function(response) {

        response.setEncoding('utf8');
        response.on('data', function(data) {
            allData.push(data);
        });
        response.on('end', function() {
            allData = allData.join('');

            if (allData && typeof allData === 'string' && allData.length > 0) {
                allData = JSON.parse(allData);
            } else {
                allData = null;
            }
            if (callback) {
                callback(allData);
            }

        });
    });
    request.end();
};

var post = function(settings, callback) {
    var allData = [];
    var post_data;
    var contentType;
    var hostname, port, path, body, headers;

    if (typeof settings === 'function') {
        settings = settings();
    }

    if (settings && typeof settings === 'object') {
        hostname = settings.hostname || session.urls.transport_url.hostname;
        port = settings.port || session.urls.transport_url.port;
        path = settings.path;
        body = settings.body || null;
    } else {
        throw new Error("Invalid settings");
    }

    if (typeof body !== 'string') {
        post_data = queryString.stringify(body);
        contentType = 'application/x-www-form-urlencoded; charset=utf-8';
    } else {
        post_data = body;
        contentType = 'application/json';
    }
    var options =
        {
        host : hostname,
        port : port,
        path : path,
        method : 'POST',
        headers :
            {
            'Content-Type' : contentType,
            'User-Agent' : userAgent,
            'Content-Length' : post_data.length
            }
        };

    if (session && session.access_token) {
        options.headers = merge(options.headers,
            {
            'X-nl-user-id' : session.userid,
            'X-nl-protocol-version' : '1',
            'Accept-Language' : 'en-us',
            'Authorization' : 'Basic ' + session.access_token
            });
    }

    var request = https.request(options, function(response) {
        response.setEncoding('utf8');
        response.on('data', function(data) {
            allData.push(data);
        });
        response.on('error', function() {
            if (callback) {
                callback(null, response.headers || {});
            }
        });
        response.on('end', function() {
            allData = allData.join('');
            if (allData && typeof allData === 'string') {
                allData = JSON.parse(allData);
            }
            if (callback) {
                callback(allData, response.headers || {});
            }
        });
    });

    request.write(post_data);
    request.end();
};

function merge(o1, o2) {
    o1 = o1 || {};
    if (!o2) {
        return o1;
    }
    for (var p in o2) {
        o1[p] = o2[p];
    }
    return o1;
}

exports.init = init;
exports.getInfo = getInfo;
