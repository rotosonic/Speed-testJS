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
     * @param string method post or get request
     * @param stirng url address for request
     * @param integer timeout timeout for request
     * @param function callback for onloaded function
     * @param function callback for onerror function
     */
    function webSocketData(url, callbackOnOpen, callbackOnMessage, callbackOnError) {
        this.url = url;
        this.callbackOnOpen = callbackOnOpen;
        this.callbackOnMessage = callbackOnMessage;
        this.callbackOnError = callbackOnError;
        this._request = null;

    }

    /**
     * Initiate the request
     */
    webSocketData.prototype._initiateRequest = function () {
        if (this._request === null ||
            typeof this._request === 'undefined') {
            this._request = new WebSocket(this.url);
            this._request.onopen = this._handleOnOpen.bind(this);
            this._request.onmessage = this._handleOnMessage.bind(this);
            this._request.onclose = this._handleOnClose.bind(this);
            this._request.onerror = this._handleOnError.bind(this);
            this._request.binaryType = 'arraybuffer';
        }
    };
    /**
     * start the request
     */
    webSocketData.prototype.start = function(id, type){
      this.id = id;
      this.type = type;
      this._initiateRequest();
    };

    /**
     * webSocket onOpen Event
     */
    webSocketData.prototype._handleOnOpen = function () {
        this.callbackOnOpen(this.id);

    };

    /**
     * send message for current webSocket
     */
    webSocketData.prototype.sendMessage = function (obj) {
        this.startTime = Date.now();
        if(this.type === 'download'){
          this._request.send(JSON.stringify(obj), {mask: true});
        } else{
          this._request.send(obj, {mask: true});
        }

    };

    /**
     * webSocket onMessage received Event
     */
    webSocketData.prototype._handleOnMessage = function (event) {
        var result={};
        result.type = this.type;
        result.id = this.id;
        if (this.type==='download') {
          result.chunckLoaded = (event.data.byteLength * 8) / 1000000;
          result.totalTime = (Date.now() - this.startTime)/1000;
          result.bandwidthMbs = result.chunckLoaded/result.totalTime;
          console.log('downloadBandwidth: ' + result.bandwidthMbs);
        }else{
          var data = JSON.parse(event.data);
          result.chunckLoaded = (data.uploadBytes * 8) / 1000000;
          result.totalTime = (Date.now() - this.startTime)/1000;
          result.bandwidthMbs = result.chunckLoaded/result.totalTime;
          console.log('uploadBandwidth: ' + result.bandwidthMbs);
        }

        this.callbackOnMessage(result);
    };

    /**
     * webSocket onMessage error Event
     */
    webSocketData.prototype._handleOnError = function (event) {
        this.callbackOnError(event);
    };

    /**
     * webSocket close Event
     */
    webSocketData.prototype._handleOnClose = function (event) {
        if ((event !== null) && (event.code === 1006)) {
            this.callbackOnError('connection error');
        }
    };

    /**
     * close webSocket
     */
    webSocketData.prototype.close = function () {
        this._request.close();
    };


    window.webSocketData = webSocketData;

})();
