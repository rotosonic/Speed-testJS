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
     * download testing based on httpRequests
     * @param string server endpoint for upload testing
     * @param string post or get request
     * @param integer number of concurrentRuns
     * @param integer timeout of the request
     * @param integer length of the testLength
     * @param integer when to calculate moving average
     * @param function callback function for test suite complete event
     * @param function callback function for test suite progress event
     * @param function callback function for test suite abort event
     * @param function callback function for test suite timeout event
     * @param function callback function for test suite error event
     **/
    function downloadHttpConcurrentProgress(urls,  type, concurrentRuns, timeout, testLength, movingAverage, callbackComplete, callbackProgress, callbackAbort,
                                            callbackTimeout, callbackError, size, progressIntervalDownload, monitorInterval) {
        this.urls = urls;
        this.size = size;
        this.type = type;
        this.concurrentRuns = concurrentRuns;
        this.timeout = timeout;
        this.testLength = testLength;
        this.movingAverage = movingAverage;
        //time to capture onProgressEvent
        this.progressIntervalDownload = progressIntervalDownload;
        //time for monitor to calcualte stats
        this.monitorInterval = monitorInterval;
        //unique id or test
        this._testIndex = 0;
        //array holding active tests
        this._activeTests = [];
        this.clientCallbackComplete = callbackComplete;
        this.clientCallbackProgress = callbackProgress;
        this.clientCallbackAbort = callbackAbort;
        this.clientCallbackTimeout = callbackTimeout;
        this.clientCallbackError = callbackError;
        //start time of test suite
        this._beginTime = Date.now();
        //boolean on whether test  suite is running or not
        this._running = true;
        //array holding  results
        this.finalResults = [];
        //monitor interval
        this.interval = null;
        //total probe bytes
        this.totalBytes = 0;
        //results object array
        this.results =[];
        //results count
        this.resultsCount = 0;
        //results to send to client
        this.downloadResults = [];
        //results object array
        this.resultsMb =[];
        // fistCheck
        this.firstCheck = false;
        //total chunk totalBytes
        this.totalChunckBytes = 0;
    }

    /**
     * onError method
     * @return error object
     */
    downloadHttpConcurrentProgress.prototype.onTestError = function (result) {
      if (this._running) {
         if ((Date.now() - this._beginTime) > this.testLength) {
           this.endTest();
          }
          else{
            this._running = false;
            clearInterval(this.interval);
            this.clientCallbackError(result);
            this.abortAll();
          }
      }
    };
    /**
     * onAbort method
     * @return abort object
     */
    downloadHttpConcurrentProgress.prototype.onTestAbort = function (result) {
      //this._storeResults(result);
      //this.totalBytes = this.totalBytes + result.loaded;
      this.totalChunckBytes = this.totalChunckBytes + result.chunckLoaded;
      var bandwidthMbs = ((this.totalChunckBytes*8)/ 1000000)/((Date.now() - this._beginTime)/1000);
      this.resultsMb.push(bandwidthMbs);
      this.clientCallbackProgress(bandwidthMbs);
    };
    /**
     * onTimeout method
     * @return timeout object
     */
    downloadHttpConcurrentProgress.prototype.onTestTimeout = function () {
        if(this._running) {
            if ((Date.now() - this._beginTime) > this.testLength) {
                this.endTest();
            }

        }
    };

    /**
     * onComplete method
     */
    downloadHttpConcurrentProgress.prototype.onTestComplete = function (result) {

        if (!this._running) {
            return;
        }

        this.totalChunckBytes = this.totalChunckBytes + result.chunckLoaded;
        var bandwidthMbs = ((this.totalChunckBytes*8)/ 1000000)/((Date.now() - this._beginTime)/1000);
        this.resultsMb.push(bandwidthMbs);
        this.clientCallbackProgress(bandwidthMbs);
        //check below might want to just start another connection
        this.start();
        };



    /**
     * onProgress method
     */
    downloadHttpConcurrentProgress.prototype.onTestProgress = function (result) {
        if (!this._running) {
            return;
        }
        //check for end of test
        if ((Date.now() - this._beginTime) > this.testLength) {
            this.endTest();
        }
        this.totalChunckBytes = this.totalChunckBytes + result.chunckLoaded;
        var bandwidthMbs = ((this.totalChunckBytes*8)/ 1000000)/((Date.now() - this._beginTime)/1000);
console.log(bandwidthMbs);
        this.resultsMb.push(bandwidthMbs);
          this.clientCallbackProgress(bandwidthMbs);
    };

    /**
     * Start the test
     */
    downloadHttpConcurrentProgress.prototype.start = function () {
      if (!this._running) {
            return;
      }

            for (var g = 1; g <= this.concurrentRuns; g++) {
                this._testIndex++;
                var request = new window.xmlHttpRequest('GET', this.urls[g]+ this.size +  '&r=' + Math.random(), this.timeout, this.onTestComplete.bind(this), this.onTestProgress.bind(this),
                    this.onTestAbort.bind(this), this.onTestTimeout.bind(this), this.onTestError.bind(this),this.progressIntervalDownload);
                this._activeTests.push({
                    xhr: request,
                    testRun: this._testIndex
                });
                request.start(0, this._testIndex);
            }

    };

    /**
     * Cancel the test
     */
    downloadHttpConcurrentProgress.prototype.abortAll = function () {
        clearInterval(this.interval);
        for (var i = 0; i < this._activeTests.length; i++) {
            if (typeof(this._activeTests[i]) !== 'undefined') {
                this._activeTests[i].xhr._request.abort();
            }
        }
    };

    /**
     * store speedtest measurements
     * @param result
     * @private
     */
    downloadHttpConcurrentProgress.prototype._storeResults = function (result) {
      this.results.push(result);
    };


    /**
     * Monitor testSeries
     */
    downloadHttpConcurrentProgress.prototype._monitor = function () {

        //check for end of test
        if ((Date.now() - this._beginTime) > this.testLength) {
          this.endTest();
        }

    };
    /**
     * end test method
     */
     downloadHttpConcurrentProgress.prototype.endTest = function(){
       this._running = false;
       this.abortAll();
       var finalArray;
       if(this.resultsMb.length>10){
         finalArray = this.resultsMb.slice(Math.round(this.resultsMb.length * .75),this.resultsMb.length-1);
       }else{
         this.clientCallbackError('no measurements obtained');
         return;
       }
       var sum = finalArray.reduce(function(a, b) { return a + b; });
       var avg = sum / finalArray.length;
       this.clientCallbackComplete(avg);
       clearInterval(this.interval);
       this.abortAll();
     };

    /**
     * reset test variables
     */
    downloadHttpConcurrentProgress.prototype.initiateTest = function(){
        this._testIndex = 0;
        this.finalResults.length=0;
        this._running = true;
        this.interval = null;
        this.downloadResults.length = 0;
        this.totalBytes = 0;
        this.totalChunckBytes = 0;
        this.start();
        var self = this;
        this.interval = setInterval(function () {
          self._monitor();
        }, this.monitorInterval);
    };

    window.downloadHttpConcurrentProgress = downloadHttpConcurrentProgress;
})();
