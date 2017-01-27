

 //  'bradleynielsen@gmail.com' '*9Ph^VRrYU!1zZ6'

"option strict";

var username        = 'bradleynielsen@gmail.com';
var password        = '*9Ph^VRrYU!1zZ6';
var serial_number   = '02AA01AC061508AP';
var targetTemp      = process.argv[2];
var mode            = 'heat';
// var mode            = 'cool';

var nestApi = require('unofficial-nest-api');
var util = require('util'),
    nest = require('node_moduels/unofficial-nest-api/unindex.js');  // normally would be 'unofficial-nest-api'

function trimQuotes(s) {
    if (!s || s.length === 0) {
        return '';
    }
    var c = s.charAt(0);
    var start = (c === '\'' || c === '"') ? 1 : 0;
    var end = s.length;
    c = s.charAt(end - 1);
    end -= (c === '\'' || c === '"') ? 1 : 0;
    return s.substring(start, end);
}

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




if (username && password) {
    username = trimQuotes(username);
    password = trimQuotes(password);
    nest.login(username, password, function (err, data) {
        if (err) {
            console.log(err.message);
            process.exit(1);
            return;
        }
        console.log('Logged in.');
        nest.fetchStatus(function (data) {
            for (var deviceId in data.device) {
                if (data.device.hasOwnProperty(deviceId)) {
                    var device = data.shared[deviceId];
                    console.log(util.format("%s [%s], Current temperature = %d F target=%d",
                        device.name, deviceId,
                        nest.ctof(device.current_temperature),
                        nest.ctof(device.target_temperature)));
                }
            }
            var ids = nest.getDeviceIds();
            nest.setTemperature(ids[0], targetTemp);
        console.log("Hey!!! The targetTemp= "+targetTemp)
        console.log("Hey!!! The mode= "+mode)
            nest.setTemperature(targetTemp);
            //nest.setFanModeAuto();
            //subscribe();
            //nest.setAway();
            //nest.setHome();
            nest.setTargetTemperatureType(ids[0], mode);
        });

    });
}

function subscribe() {
    nest.subscribe(subscribeDone, ['shared', 'energy_latest']);
}

function subscribeDone(deviceId, data, type) {
    // data if set, is also stored here: nest.lastStatus.shared[thermostatID]
    if (deviceId) {
        console.log('Device: ' + deviceId + " type: " + type);
        console.log(JSON.stringify(data));
    } else {
        console.log('No data');

    }
    setTimeout(subscribe, 2000);
}
