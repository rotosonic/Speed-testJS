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
  function webSocketDownload(url, transferSize, callbackOnMessage, callbackOnError) {
    this.url = url;
    this.transferSize = transferSize;
    this.callbackOnMessage = callbackOnMessage;
    this.callbackOnError = callbackOnError;
    //unique id or test
    this._testIndex = 0;
    //array for packet loss;
    this.packetLossArray = [];
    //array for results
    this.resultsArray = [];
    //start time data capture

  }

  /**
   * Initiate the request
   */
  webSocketDownload.prototype.start = function () {
    if (this._request === null ||
      typeof this._request === 'undefined') {
      this._request = new WebSocket(this.url);
      this._request.onopen = this._handleOnOpen.bind(this);
      this._request.onmessage = this._handleOnMessage.bind(this);
      this._request.onclose = this._handleOnClose.bind(this);
      this._request.onerror = this._handleOnError.bind(this);
    }
  };

  /**
   * webSocket onOpen Event
   */
  webSocketDownload.prototype._handleOnOpen = function () {
    this._testIndex++;
    var obj = {'data': this.transferSize, 'flag': 'download', id:this._testIndex,size: this.transferSize};

    this.sendMessage(obj);
  };

  /**
   * send message for current webSocket
   */
  webSocketDownload.prototype.sendMessage = function (message) {
    //var obj = {'data': this.transferSize, 'flag': 'download'};
    this._request.send(JSON.stringify(message), {mask: true});
  };

  /**
   * webSocket onMessage received Event
   */
  webSocketDownload.prototype._handleOnMessage = function (event) {
    this.controller(event);
  };


  /**
   * webSocket onMessage error Event
   */
  webSocketDownload.prototype.controller = function (event) {
    var data = JSON.parse(event.data);
    var id = data.id;
    var packetLoss = (parseFloat(data.binary.data.length) - parseFloat(data.dataLength));
    console.log(packetLoss);
    if(packetLoss>0){
      this.packetLossArray.push(packetLoss);
    }
    var dataInMb  =(data.binary.data.length* 8) / 1000000;
    var timeInSeconds = (Date.now() -data.startTime) /1000;
    var bandwidthMbs = dataInMb/timeInSeconds;
    this.resultsArray.push(bandwidthMbs);
    if(this._testIndex< 10){
      this._testIndex++;
      this.transferSize = this.transferSize*2
      var obj = {'data': this.transferSize, 'flag': 'download', id:this._testIndex,size: this.transferSize};
      this.sendMessage(obj);
    }
    else{
      this.close();
      console.log(this.resultsArray);
      console.log(this.packetLossArray);
    }

  };


  /**
   * webSocket onMessage error Event
   */
  webSocketDownload.prototype._handleOnError = function (event) {
    this.callbackOnError(event);
  };

  /**
   * webSocket close Event
   */
  webSocketDownload.prototype._handleOnClose = function (event) {
    if ((event !== null) && (event.code === 1006)) {
      this.callbackOnError('connection error');
    }
  };

  /**
   * close webSocket
   */
  webSocketDownload.prototype.close = function () {
    this._request.close();
  };


  window.webSocketDownload = webSocketDownload;

})();