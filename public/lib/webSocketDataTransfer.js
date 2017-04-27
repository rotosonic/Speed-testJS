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

(function () {
  'use strict';
  /**
   * extend webSocket
   * @param string url address for request
   * @param integer size of download
   * @param integer timeout timeout for request
   * @param function callback for onloaded function
   * @param function callback for onerror function
   */
  function webSocketDataTransfer(url, transferSize, type, callbackOnMessage, callbackOnError) {
    this.url = 'ws://96.118.56.109:5003';
    //this.url = 'ws://127.0.0.1:8081';
    this.transferSize = transferSize;
    this.type = type;
    this.callbackOnMessage = callbackOnMessage;
    this.callbackOnError = callbackOnError;
    this.concurrentRuns = 4;
    this.testLength = 10000;
    //unique id or test
    this._testIndex = 1;
    //array for packet loss;
    this.packetLossArray = [];
    //array for results
    this.resultsArray = [];
    //start data capture time
    this.startDataCapture;
    //array for results and time from test start
    this.resultsTimeArray = [];
    //monitor interval
    this.interval = null;
    //start time of test suite
    this.beginTime;
    //time for monitor to calcualte stats
    this.monitorInterval = 100;
    //results object array
    this.results =[];
    //boolean on whether test  suite is running or not
    this._running = true;
    //webSockets array
    this.webSockets = [];
    //begin time of test
    this.beginTime;
    //total bytes of the test
    this.totalBytes = 0;
  }

  /**
   * Initiate the request
   */
  webSocketDataTransfer.prototype.start = function () {
    for (var g = 0; g <= this.concurrentRuns; g++) {
      this.createSocket(g, this.type);
    }
    var self = this;
    this.beginTime = Date.now();
    this.interval = setInterval(function () {
      self._monitor();
    }, this.monitorInterval);

  };

  /**
   * Initiate the request
   */
  webSocketDataTransfer.prototype.createSocket = function (g) {
    var webSocket = new window.webSocketData(this.url,this.onTestOpen.bind(this),
       this.onMessageComplete.bind(this),this.onTestError.bind(this));
       webSocket.start(g, this.type);
    this.webSockets.push(webSocket);
  };

  /**
   * onWebSocket open method
   */
  webSocketDataTransfer.prototype.onTestOpen = function (id) {
    this.sendMessage(id);
  };

  /**
   * onError method
   * @return abort object
   */
  webSocketDataTransfer.prototype.onTestError = function (error) {
    console.log('error: ' + error);
  };

  /**
   * onMessageComplete method
   * @return message object
   */
  webSocketDataTransfer.prototype.onMessageComplete = function (result) {
    var event = {};
    event.type = result.type;
    this.totalBytes += result.chunckLoaded;
    console.log('******** Transfer Speed Total Bytes ************');
    console.log((this.totalBytes)/((Date.now() - this.beginTime)/1000));
    //totalbytes /dateNow-begintime;
    if(result.type === 'download'){

      if((result.totalTime< 50) && (this.transferSize < 800000)){
        this.transferSize = this.transferSize + this.transferSize;
      }
    }else{


    }
    this.sendMessage(result.id);


  };

  /**
   * send message for current webSocket
   */
  webSocketDataTransfer.prototype.sendMessage = function (id) {
    if(this._running){
      if(this.type === 'download'){
        var obj = {'flag': 'download', 'id':id, 'size': this.transferSize};
        this.webSockets[id].sendMessage(obj);
      }else{
        var uploadData = new Uint8Array(this.transferSize);
        for (var i = 0; i < uploadData.length; i++) {
           uploadData[i] = 32 + Math.random() * 95;
         }
        var obj = {'data': uploadData, 'flag': 'upload', 'id':id, 'size': this.transferSize};
        this.webSockets[id].sendMessage(uploadData);
      }
    }
  };

  /**
  * Monitor testSeries
  */
  webSocketDataTransfer.prototype._monitor = function () {
    var self = this;
    var intervalBandwidth = 0;
    var totalLoaded = 0;
    var totalTime = 0;
    var intervalCounter = 0;

    if (this.results.length > 0) {
        for (var i = 0; i < this.results.length; i++) {
          if (this.results[i].timeStamp > (Date.now() - this.monitorInterval)) {
              //intervalBandwidth = intervalBandwidth + parseFloat(this.results[i].bandwidthMbs);
              totalLoaded = totalLoaded + this.results[i].sizeMb;

              //totalTime = totalTime + this.results[i].totalTime;
              intervalCounter++;
          }
        }
        if (!isNaN(totalLoaded / this.monitorInterval)) {
            //console.log('BandWidth: ' + (totalLoaded / this.monitorInterval));
            //console.log(' counter: '  + intervalCounter + ' loaded: ' + totalLoaded);
        }
    }
    //console.log('timeRemaining: ' + (Date.now() - this.beginTime));
    if ((Date.now() - this.beginTime) > (this.testLength)) {
      this._running=false;
      clearInterval(this.interval);
      self.close();
      console.log('stopRequest');
    }
  };


  /**
   * webSocket onMessage error Event
   */
  webSocketDataTransfer.prototype._handleOnError = function (event) {
    this.callbackOnError(event);
  };

  /**
   * close webSocket
   */
  webSocketDataTransfer.prototype.close = function () {
    for (var i = 0; i < this.webSockets.length; i++) {
        this.webSockets[i].close();
    }
  };
  window.webSocketDataTransfer = webSocketDataTransfer;

})();
