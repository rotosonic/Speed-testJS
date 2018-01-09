/*
 * *
 *  Copyright 2014 Comcast Cable Communications Management, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 * /
 */

var express = require('express');
var path = require('path');
var stream = require('stream');
var app = express();
var bodyParser = require('body-parser');
var WebSocketServer = require('ws').Server;
var domain = require('./modules/domain');
var validateIP = require('validate-ip-node');
var os = require('os');
var apiRouter = express.Router();
//module provides download test sizes based off of probe data
var downloadData = require('./modules/downloadData');
var stream = require('stream');
//set global ipv4 and ipv6 server address
domain.setIpAddresses();

//variables
global.webPort = 80;
global.webSocketPort = 5003;

//export modules
module.exports.statisticalCalculator = require('./modules/statisticalCalculator');
module.exports.downloadData = require('./modules/downloadData');
module.exports.dynamo = require('./modules/dynamo');
module.exports.domain = require('./modules/domain');

//used to read post data
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit: '75mb'}));

//Allow cross domain requests
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-CSRF-Token, X-XSRF-TOKEN, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    next();
});

//init router
app.use('/', apiRouter);

//get controllers
var TestPlanController = require('./controllers/TestPlanController');
var LatencyController = require('./controllers/LatencyController');
var DownloadProbeController = require('./controllers/DownloadProbeController');
var DownloadController = require('./controllers/DownloadController');
var UploadProbeController = require('./controllers/UploadProbeController');
var UploadController = require('./controllers/UploadController');
var CalculatorController = require('./controllers/CalculatorController');
var TestServerController = require('./controllers/TestServerController');

var testPlanController = new TestPlanController(apiRouter, global.AddressIpv4, global.AddressIpv6);
var latencyController = new LatencyController(apiRouter);
var downloadProbeController = new DownloadProbeController(apiRouter);
var downloadController = new DownloadController(apiRouter);
var uploadProbeController = new UploadProbeController(apiRouter);
var uploadController = new UploadController(apiRouter);
var calculatorController = new CalculatorController(apiRouter);
var testServerController = new TestServerController(apiRouter);

module.exports.TestPlanController = require('./controllers/TestPlanController');
module.exports.LatencyController = require('./controllers/LatencyController');
module.exports.DownloadProbeController = require('./controllers/DownloadProbeController');
module.exports.DownloadController = require('./controllers/DownloadController');
module.exports.UploadProbeController = require('./controllers/UploadProbeController');
module.exports.UploadController = require('./controllers/UploadController');
module.exports.CalculatorController = require('./controllers/CalculatorController');
module.exports.TestServerController = require('./controllers/TestServerController');

app.use(express.static(path.join(__dirname, 'public')));
app.listen(webPort, '::');
//app.listen(5020);
//app.listen(5021);
//app.listen(5022);
//app.listen(5023);
//app.listen(5024);
//app.listen(5025);
//max download buffer size based off of download probing data
global.maxDownloadBuffer = 532421875;
var dataBuffer0 = new Buffer(10000);
for (var j = 0; j < dataBuffer0.length; j++) {
  dataBuffer0[j] = 32 + Math.random() * 95;
}
var dataBuffer1 = new Buffer(100000);
for (var j = 0; j < dataBuffer1.length; j++) {
  dataBuffer1[j] = 32 + Math.random() * 95;
}
var dataBuffer2 = new Buffer(150000);
for (var j = 0; j < dataBuffer2.length; j++) {
  dataBuffer2[j] = 32 + Math.random() * 95;
}
var dataBuffer3 = new Buffer(200000);
for (var j = 0; j < dataBuffer3.length; j++) {
  dataBuffer3[j] = 32 + Math.random() * 95;
}
var dataBuffer4 = new Buffer(250000);
for (var j = 0; j < dataBuffer4.length; j++) {
  dataBuffer4[j] = 32 + Math.random() * 95;
}
var dataBuffer5 = new Buffer(500000);
for (var j = 0; j < dataBuffer5.length; j++) {
  dataBuffer5[j] = 32 + Math.random() * 95;
}
var dataBuffer6 = new Buffer(750000);
for (var j = 0; j < dataBuffer6.length; j++) {
  dataBuffer6[j] = 32 + Math.random() * 95;
}
var dataBuffer7 = new Buffer(1000000);
for (var j = 0; j < dataBuffer7.length; j++) {
  dataBuffer7[j] = 32 + Math.random() * 95;
}
var dataBuffer8 = new Buffer(1100000);
for (var j = 0; j < dataBuffer8.length; j++) {
  dataBuffer8[j] = 32 + Math.random() * 95;
}
var dataBuffer9 = new Buffer(1200000);
for (var j = 0; j < dataBuffer9.length; j++) {
  dataBuffer9[j] = 32 + Math.random() * 95;
}
var dataBuffer10 = new Buffer(1300000);
for (var j = 0; j < dataBuffer10.length; j++) {
  dataBuffer10[j] = 32 + Math.random() * 95;
}
var dataBuffer11 = new Buffer(1400000);
for (var j = 0; j < dataBuffer11.length; j++) {
  dataBuffer11[j] = 32 + Math.random() * 95;
}
var dataBuffer12 = new Buffer(1500000);
for (var j = 0; j < dataBuffer12.length; j++) {
  dataBuffer12[j] = 32 + Math.random() * 95;
}
var dataBuffer13 = new Buffer(1600000);
for (var j = 0; j < dataBuffer13.length; j++) {
  dataBuffer13[j] = 32 + Math.random() * 95;
}
var dataBuffer14 = new Buffer(1700000);
for (var j = 0; j < dataBuffer14.length; j++) {
  dataBuffer14[j] = 32 + Math.random() * 95;
}
var dataBuffer15 = new Buffer(1800000);
for (var j = 0; j < dataBuffer15.length; j++) {
  dataBuffer15[j] = 32 + Math.random() * 95;
}
var dataBuffer16 = new Buffer(1900000);
for (var j = 0; j < dataBuffer16.length; j++) {
  dataBuffer16[j] = 32 + Math.random() * 95;
}
var dataBuffer17 = new Buffer(2000000);
for (var j = 0; j < dataBuffer17.length; j++) {
  dataBuffer17[j] = 32 + Math.random() * 95;
}
var dataBuffer18 = new Buffer(2100000);
for (var j = 0; j < dataBuffer18.length; j++) {
  dataBuffer18[j] = 32 + Math.random() * 95;
}
var dataBuffer19 = new Buffer(2200000);
for (var j = 0; j < dataBuffer19.length; j++) {
  dataBuffer19[j] = 32 + Math.random() * 95;
}
var dataBuffer20 = new Buffer(2300000);
for (var j = 0; j < dataBuffer20.length; j++) {
  dataBuffer20[j] = 32 + Math.random() * 95;
}
var dataBuffer21 = new Buffer(2400000);
for (var j = 0; j < dataBuffer21.length; j++) {
  dataBuffer21[j] = 32 + Math.random() * 95;
}
var dataBuffer22 = new Buffer(2500000);
for (var j = 0; j < dataBuffer22.length; j++) {
  dataBuffer22[j] = 32 + Math.random() * 95;
}
var dataBuffer21 = new Buffer(2600000);
for (var j = 0; j < dataBuffer21.length; j++) {
  dataBuffer21[j] = 32 + Math.random() * 95;
}
var dataBuffer22 = new Buffer(2700000);
for (var j = 0; j < dataBuffer22.length; j++) {
  dataBuffer22[j] = 32 + Math.random() * 95;
}
var dataBuffer23 = new Buffer(2800000);
for (var j = 0; j < dataBuffer23.length; j++) {
  dataBuffer23[j] = 32 + Math.random() * 95;
}
var dataBuffer24 = new Buffer(2900000);
for (var j = 0; j < dataBuffer24.length; j++) {
  dataBuffer24[j] = 32 + Math.random() * 95;
}
var dataBuffer25 = new Buffer(3000000);
for (var j = 0; j < dataBuffer25.length; j++) {
  dataBuffer25[j] = 32 + Math.random() * 95;
}

global.dataBuffers = [];
global.dataBuffers.push(dataBuffer0);
global.dataBuffers.push(dataBuffer1);
global.dataBuffers.push(dataBuffer2);
global.dataBuffers.push(dataBuffer3);
global.dataBuffers.push(dataBuffer4);
global.dataBuffers.push(dataBuffer5);
global.dataBuffers.push(dataBuffer6);
global.dataBuffers.push(dataBuffer7);
global.dataBuffers.push(dataBuffer8);
global.dataBuffers.push(dataBuffer9);
global.dataBuffers.push(dataBuffer10);
global.dataBuffers.push(dataBuffer11);
global.dataBuffers.push(dataBuffer12);
global.dataBuffers.push(dataBuffer13);
global.dataBuffers.push(dataBuffer14);
global.dataBuffers.push(dataBuffer15);
global.dataBuffers.push(dataBuffer16);
global.dataBuffers.push(dataBuffer17);
global.dataBuffers.push(dataBuffer18);
global.dataBuffers.push(dataBuffer19);
global.dataBuffers.push(dataBuffer20);
global.dataBuffers.push(dataBuffer21);
global.dataBuffers.push(dataBuffer22);
global.dataBuffers.push(dataBuffer23);
global.dataBuffers.push(dataBuffer24);
global.dataBuffers.push(dataBuffer25);
global.webSocketPort
var wss = new WebSocketServer({perMessageDeflate: false,port: 5003});

wss.on('connection', function connection(ws) {
  ws.on('open', function open() {
    console.log('connected');
    ws.send(Date.now());
  });

    ws.on('message', function incoming(messageObj) {
      //check if message is json.. if not then it is an upload test
      try {
        JSON.parse(messageObj);
        } catch (e) {
            var result = {};
            result.endTime  = Date.now();
            result.uploadBytes = messageObj.byteLength;
            ws.send(JSON.stringify(result));
            return;
        }

        var message = JSON.parse(messageObj);
        if (message.flag === 'download'){
          console.log(message.size + '' + Date.now());
          //var dataBuffer = new Buffer(message.size);
          console.log('messageSize' + message.size);
          ws.send(global.dataBuffers[message.size]);
         } else if (message.flag === 'latency') {
            console.log('received: %s', new Date().getTime());
            ws.send(message.data);
        } else if (message.flag === 'upload') {
            var uploadtime = {'data': Date.now().toString()};
            var dataBuffer = new Buffer(message.data);
              console.log(dataBuffer.byteLength);
            ws.send(JSON.stringify(uploadtime.data));
        } else {

        }

    });
});
