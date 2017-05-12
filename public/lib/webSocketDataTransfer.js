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
  function webSocketDataTransfer(url, transferSize, type, callbackOnMessage, callbackOnError,
      callbackOnComplete, callbackOnTestProgress) {
    //this.url = 'ws://69.241.66.214:5003';
    this.url = 'ws://127.0.0.1:8081';
    this.transferSize = transferSize;
    this.type = type;
    this.clientCallbackOnMessage = callbackOnMessage;
    this.clientCallbackOnError = callbackOnError;
    this.clientCallbackOnComplete = callbackOnComplete;
    this.clientCallbackOnTestProgress = callbackOnTestProgress;
    this.concurrentRuns = 32;
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
    //total messages
    this.messages = 0;
    //firstLevelIncrease
    this.messages = 0;
    //boolean for process adding connections
    this.addInTestSockets25 = false;
    //boolean for process adding connections
    this.addInTestSockets50 = false;
    //boolean for process adding connections
    this.addInTestSockets100 = false;
    //results object array
    this.resultsMb =[];
    //number of requests per webSocket
    this.requestPerWebSocket = 1;
  }

  /**
   * Initiate the request
   */
  webSocketDataTransfer.prototype.start = function () {
    this.beginTime = Date.now();
    this.interval = setInterval(function () {
      self._monitor();
    }, this.monitorInterval);
    for (var g = 0; g <= this.concurrentRuns; g++) {
      this.createSocket(g, this.type);
    }
    var self = this;

    this.clientCallbackOnTestProgress(1);
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
      this.sendMessage(id,1);
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
    this.messages++;

    if(result.messages === 0){
      this.sendMessage(result.id,numberOfRequests);
      return;
    }
    else{
      var event = {};
      event.type = result.type;
      this.totalBytes += result.chunckLoaded;
      var bandwidthMbs = (this.totalBytes)/((Date.now() - this.beginTime)/1000);
      this.clientCallbackOnMessage(bandwidthMbs);
      this.resultsMb.push(bandwidthMbs);
      this.results.push(result);
      //console.log(bandwidthMbs);
      var maxConnections = 32;
      if(result.id<10){
        this.transferSize = 125000;
      }else if(result.id > 10 && result.id< 20){
        this.transferSize = 150000;
      }else{
        this.transferSize = 300000;
      }
      //console.log('totalTime: ' + result.totalTime);
      /*
      if(bandwidthMbs > 10 && bandwidthMbs< 50){
        this.transferSize = 125000;
        if(this.webSockets.length<= maxConnections){
          this.createSocket(this.webSockets.length, this.type);
          this.numberOfRequests = 1;
        }
      }else if(bandwidthMbs > 50 && bandwidthMbs< 100){
        this.transferSize = 150000;
        if(this.webSockets.length<= maxConnections){
          this.createSocket(this.webSockets.length, this.type);
          this.numberOfRequests = 2;
        }
      }else if(bandwidthMbs > 100 && bandwidthMbs< 200){
        this.transferSize = 175000;
        if(this.webSockets.length<= maxConnections){
          this.createSocket(this.webSockets.length, this.type);
          this.numberOfRequests = 3;
        }
      }else if(bandwidthMbs > 200){
        this.transferSize = 200000;
        if(this.webSockets.length<= maxConnections){
          this.createSocket(this.webSockets.length, this.type);
          this.numberOfRequests = 4;
        }

      }
  */

    }

    this.sendMessage(result.id,1);


  };

  /**
   * send message for current webSocket
   */
  webSocketDataTransfer.prototype.sendMessage = function (id,numberOfRequests) {
    if(this._running){
      if(this.type === 'download'){
        var obj = {'flag': 'download', 'id':id, 'size': this.transferSize};
        for(var d=0; d<numberOfRequests;d++){
          this.webSockets[id].sendMessage(obj);
        }
      }else{
        var uploadData = new Uint8Array(this.transferSize);
        for (var i = 0; i < uploadData.length; i++) {
           uploadData[i] = 32 + Math.random() * 95;
         }
        var obj = {'data': uploadData, 'flag': 'upload', 'id':id, 'size': this.transferSize};
        for(var u=0; u<numberOfRequests;u++){
          this.webSockets[id].sendMessage(uploadData);
        }
      }
    }
  };

  /**
  * Monitor testSeries
  */
  webSocketDataTransfer.prototype._monitor = function () {
    var self = this;
    var percentComplete = Math.round(((Date.now() - this.beginTime)/this.testLength)*100);
    if(percentComplete<100){
      this.clientCallbackOnTestProgress(percentComplete);
    }
    if ((Date.now() - this.beginTime) > (this.testLength)) {
      this._running=false;
      clearInterval(this.interval);
      self.close();
      var finalArray = this.resultsMb.slice(this.resultsMb.length/90);
      var sum = finalArray.reduce(function(a, b) { return a + b; });
      var avg = sum / finalArray.length;
      this.clientCallbackOnComplete(avg);
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
    clearInterval(this.interval);
    for (var i = 0; i < this.webSockets.length; i++) {
        this.webSockets[i].close();
    }
  };
  window.webSocketDataTransfer = webSocketDataTransfer;

})();
