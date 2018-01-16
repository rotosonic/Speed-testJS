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
    this.url = url;
    //this.url = 'ws://127.0.0.1:5020';
    //this.urls = urls;
    this.transferSize = transferSize;
    this.type = type;
    this.clientCallbackOnMessage = callbackOnMessage;
    this.clientCallbackOnError = callbackOnError;
    this.clientCallbackOnComplete = callbackOnComplete;
    this.clientCallbackOnTestProgress = callbackOnTestProgress;
    if(type==='upload'){
      this.concurrentRuns = 3;
    }
    else{
      this.concurrentRuns = 17;
    }
    this.testLength = 12000;
    //unique id or test
    this._testIndex = 0;
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
    this.monitorInterval = 1000;
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
    //total time of transferSize
    this.totalTime = 0;
    //total messages
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
    //upload object
    this.uploadData =null;
    // fistCheck
    this.firstCheck = false;
  }

  /**
   * Initiate the request
   */
  webSocketDataTransfer.prototype.start = function () {
    this.beginTime = performance.now();
    this.interval = setInterval(function () {
      self._monitor();
    }, this.monitorInterval);
    for (var g = 0; g <= this.concurrentRuns; g++) {
      this.createSocket(this._testIndex, this.type);
      this._testIndex++;
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

    var numberOfRequests = 1;
    if(result.messages === 0){
      this.sendMessage(result.id,numberOfRequests);
      return;
    }
    else{
      var percentComplete = Math.round(((performance.now() - this.beginTime)/this.testLength)*100);
      if(percentComplete<100){
        this.clientCallbackOnTestProgress(percentComplete);
      }
      this.messages++;
      var event = {};
      event.type = result.type;
      this.totalBytes += result.chunckLoaded;
      var bandwidthMbs = (this.totalBytes)/((performance.now() - this.beginTime)/1000);
      if(event.type==='download'){
        //first check
        if((parseInt(performance.now() - this.beginTime)> 1000)&&(parseInt(performance.now() - this.beginTime)<1500)){
          if(!this.firstCheck){
            this.firstCheck = true;
            console.log(this.messages);
            if(this.messages<100){
              console.log('increase transfer size to 1');
              this.transferSize = 1;
            }else{
              console.log('increase transfer size to 5');
              this.transferSize = 4;
              numberOfRequests = 2;
              //for (var g = 0; g < 10; g++) {
              //    this.createSocket(this._testIndex, this.type);
              //    this._testIndex++;
              //}
            }
          }
        }
      }else{
        if((parseInt((performance.now() - this.beginTime))> 1000)&&(parseFloat(bandwidthMbs).toFixed(2)>50)){
          if(this.webSockets.length <24){
          for (var i = 1; i < 20; i++) {
            this.createSocket(this._testIndex, this.type);
            this._testIndex++;
          }
        }else{

        }
        }

      }
      this.clientCallbackOnMessage(bandwidthMbs);
      this.resultsMb.push(bandwidthMbs);
      this.results.push(result);
    }
    this.sendMessage(result.id,numberOfRequests);
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

        if(this.uploadData === null){
        this.uploadData = new Uint8Array(this.transferSize);
        for (var i = 0; i < this.uploadData.length; i++) {
           this.uploadData[i] = 32 + Math.random() * 95;
         }
       }
        var obj = {'data': this.uploadData, 'flag': 'upload', 'id':id, 'size': this.transferSize};
        for(var u=0; u<numberOfRequests;u++){
          this.webSockets[id].sendMessage(this.uploadData);
        }
      }
    }
  };

  /**
  * Monitor testSeries
  */
  webSocketDataTransfer.prototype._monitor = function () {
    var self = this;
    var percentComplete = Math.round(((performance.now() - this.beginTime)/this.testLength)*100);
    if(percentComplete<100){
      this.clientCallbackOnTestProgress(percentComplete);
    }
/*
    if((parseInt((Date.now() - this.beginTime))> 2000)&&(this.messages===0)){
      this.transferSize = 0;
      for (var i = 1; i < this.webSockets.length; i++) {
        console.log('remove request ' + this.webSockets[i] + ' ' + this.messages);
        this.webSockets[i].close();
      }
    }
*/
    if ((performance.now() - this.beginTime) > (this.testLength)) {
      this._running=false;
      clearInterval(this.interval);
      self.close();
      var finalArray;
      if(this.resultsMb.length>10){
        finalArray = this.resultsMb.slice(Math.round(this.resultsMb.length * .75),this.resultsMb.length-1);
      }else{
        finalArray = this.resultsMb
      }
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

  /**
   * reset test variables star test
   */
  webSocketDataTransfer.prototype.initiateTest = function(){
    this.packetLossArray.length=0;
    this.resultsArray.length=0;
    this.resultsTimeArray.length=0;
    this.results.length=0;
    this.webSockets.length=0;
    this.messages = 0;
    this.resultsMb.length=0;
    this.requestPerWebSocket = 1;
    this.start();
  };
  window.webSocketDataTransfer = webSocketDataTransfer;

})();
