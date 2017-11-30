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
    //this.url = 'ws://96.118.56.108:5003';
    this.url = 'ws://192.168.200.1:5003';
    console.log(this.url);
    this.transferSize = transferSize;
    this.type = type;
    this.clientCallbackOnMessage = callbackOnMessage;
    this.clientCallbackOnError = callbackOnError;
    this.clientCallbackOnComplete = callbackOnComplete;
    this.clientCallbackOnTestProgress = callbackOnTestProgress;
    if(type==='upload'){
    this.concurrentRuns = 10;
  }
  else{
    this.concurrentRuns = 20;
  }
    this.testLength = 12000;
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
    var numberOfRequests = 1;
    if(result.messages === 0){
      this.sendMessage(result.id,numberOfRequests);
      return;
    }
    else{
      var event = {};
      event.type = result.type;
      this.totalBytes += result.chunckLoaded;
      var bandwidthMbs = (this.totalBytes)/((Date.now() - this.beginTime)/1000);
      if(event.type==='download'){
        webSocketTotalDownload = webSocketTotalDownload + (Date.now() - this.beginTime)+','+ this.totalBytes+','+ parseFloat(bandwidthMbs).toFixed(2) +  '\n ';
      }else{
        webSocketTotalUpload = webSocketTotalUpload + (Date.now() - this.beginTime)+','+ this.totalBytes+','+ parseFloat(bandwidthMbs).toFixed(2) +  '\n ';

      }
      this.clientCallbackOnMessage(bandwidthMbs);
      this.resultsMb.push(bandwidthMbs);
      this.results.push(result);
    }
if(result.messages>25){
  //this.numberOfRequests=4;
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

      var finalArray = this.resultsMb.slice(Math.round(this.resultsMb.length * .75),this.resultsMb.length-1);
      var sum = finalArray.reduce(function(a, b) { return a + b; });
      var avg = sum / finalArray.length;
      this.clientCallbackOnComplete(avg);
        if(this.type === 'download'){

            document.getElementById('webSocketDetailDownload').value = webSocketDetailDownload;
            document.getElementById('webSocketTotalDownload').value = webSocketTotalDownload;
            //console.log('downloadTotal');
            //console.log(webSocketTotalDownload);

        }else{
          document.getElementById('webSocketDetailUpload').value = webSocketDetailUpload;
          document.getElementById('webSocketTotalUpload').value = webSocketTotalUpload;

        }
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
