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
     * upload testing based on httpRequests.
     * @param urls - array of url to server endpoint for upload testing.
     * @param type - post request.
     * @param concurrentRuns - number of concurrentRuns.
     * @param timeout - timeout of the request.
     * @param testLength - length of the upload test.
     * @param movingAverage - when to calculate moving average.
     * @param callbackComplete - function callback function for test suite complete event.
     * @param callbackProgress - function callback function for test suite progress event.
     * @param callbackAbort - function callback function for test suite abort event.
     * @param callbackTimeout - function callback function for test suite timeout event.
     * @param callbackError - function callback function for test suite error event.
     * @param size - initial size to start upload testing.
     * @param maxuploadSize - upload size should not exceed max upload size.
     * @param monitorInterval - monitor interval.
     */
    function uploadHttpConcurrentProgress(urls, type, concurrentRuns, timeout, testLength, movingAverage, callbackComplete, callbackProgress, callbackError, size, maxuploadSize,
                                          monitorInterval, isMicrosoftBrowser) {
        this.urls = urls;
        this.size = size;
        this.type = type;
        this.concurrentRuns = concurrentRuns;
        this.timeout = timeout;
        this.testLength = testLength;
        this.movingAverage = movingAverage;
        this.maxuploadSize = maxuploadSize;
        this.monitorInterval = monitorInterval;
        //unique id or test
        this._testIndex = 0;
        //array holding active tests
        this._activeTests = [];
        this.clientCallbackComplete = callbackComplete;
        this.clientCallbackProgress = callbackProgress;
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
        //total chunk totalBytes
        this.totalChunckBytes = 0;
        //results object array
        this.results = [];
        //results count
        this.resultsCount = 0;
        //initializing the random data used for testing upload
        this._payload = null;
        this.uploadResults = [];
        //boolean to see if the client is running the on microsoft browse
        this.isMicrosoftBrowser = isMicrosoftBrowser;
        //upload size for low bandwidth clients(microsoft browsers)
        this.lowBandwidthUploadSize = 50000;
        //upload size for high bandwidth clients(microsoft browsers)
        this.highBandwidthUploadSize = 5000000;
        //upload threshold value
        this.uploadThresholdValue = 0;
        //results object array
        this.resultsMb =[];
        // fistCheck
        this.firstCheck = false;

    }

    /**
     * onError method
     * @return error object
     */
    uploadHttpConcurrentProgress.prototype.onTestError = function (result) {
        if (this._running) {
          if ((Date.now() - this._beginTime) > this.testLength) {
            console.log('endTest called');
            this.endTest();
          }
          else{
            this._running = false;
            clearInterval(this.interval);
            this.clientCallbackError(result);
            console.log('abortAll call');
            this.abortAll();
          }
        }
    };
    /**
     * onAbort method
     * @return abort object
     */
    uploadHttpConcurrentProgress.prototype.onTestAbort = function (result) {
        this._storeResults(result);
        this.totalChunckBytes = this.totalChunckBytes + result.chunckLoaded;
        this._storeResults(result);
        var bandwidthMbs = ((this.totalChunckBytes*8)/ 1000000)/((Date.now() - this._beginTime)/1000);
        this.resultsMb.push(bandwidthMbs);
        if(this.resultsMb.length >10){
          this.clientCallbackProgress(bandwidthMbs);
        }
    };
    /**
     * onTimeout method
     * @return timeout object
     */
    uploadHttpConcurrentProgress.prototype.onTestTimeout = function () {
        if (this._running) {
            if ((Date.now() - this._beginTime) > this.testLength) {
              console.log('endTest called');
              this.endTest();
            }

        }
    };

    /**
     * onComplete method
     */
    uploadHttpConcurrentProgress.prototype.onTestComplete = function (result) {
        if (!this._running) {
            return;
        }
        this.totalChunckBytes = this.totalChunckBytes + result.chunckLoaded;
        this._storeResults(result);
        var bandwidthMbs = ((this.totalChunckBytes*8)/ 1000000)/((Date.now() - this._beginTime)/1000);
        this.resultsMb.push(bandwidthMbs);
        if(this.resultsMb.length >10){
          this.clientCallbackProgress(bandwidthMbs);
        }
        //first check
        if((parseInt(Date.now() - this._beginTime)> 1000)&&(parseInt(Date.now() - this._beginTime)<1500)){
          if(!this.firstCheck){
            this.firstCheck = true;
            if(this.resultsMb.length>18){
              //TODO logic to increase size or connections
              this.size = 10000000;
              console.log('measurements: ' + this.resultsMb.length + ' increase for higher bandwidths');
            }
          }
        }
        this.newRequests(1);
    };


    /**
     * onProgress method
     */
    uploadHttpConcurrentProgress.prototype.onTestProgress = function (result) {
        if (!this._running) {
            return;
        }
        this._storeResults(result);
        this.totalChunckBytes = this.totalChunckBytes + result.chunckLoaded;
        this._storeResults(result);
        var bandwidthMbs = ((this.totalChunckBytes*8)/ 1000000)/((Date.now() - this._beginTime)/1000);
        this.resultsMb.push(bandwidthMbs);
        if(this.resultsMb.length >10){
          this.clientCallbackProgress(bandwidthMbs);
        }
    };

    /**
     * Start the test
     */
    uploadHttpConcurrentProgress.prototype.newRequests = function (number) {
        var request;
        if (!this._running) {
            return;
        }

        if (this._payload === null) {
            this._payload = getRandomData(this.size);
        } else {

            if (this._payload.size !== this.size) {
                this._payload = getRandomData(this.size);
            }
        }

        for (var p = 1; p <= number; p++) {
            this._testIndex++;
            request = new window.xmlHttpRequest('POST', this.urls[0] + '?r='+Date.now(), this.timeout, this.onTestComplete.bind(this), this.onTestProgress.bind(this),
                this.onTestAbort.bind(this), this.onTestTimeout.bind(this), this.onTestError.bind(this));
            this._activeTests.push({
                xhr: request,
                testRun: this._testIndex
            });

            request.start(this.size, this._testIndex, this._payload);
        }


    };


    /**
     * Start the test
     */
    uploadHttpConcurrentProgress.prototype.start = function () {
        var request;
        if (!this._running) {
            return;
        }

        if (this._payload === null) {
            this._payload = getRandomData(this.size);
        } else {

            if (this._payload.size !== this.size) {
                this._payload = getRandomData(this.size);
            }
        }

        for (var p = 1; p <= this.concurrentRuns; p++) {
            this._testIndex++;
            request = new window.xmlHttpRequest('POST', this.urls[0]+ '?r='+Date.now(), this.timeout, this.onTestComplete.bind(this), this.onTestProgress.bind(this),
                this.onTestAbort.bind(this), this.onTestTimeout.bind(this), this.onTestError.bind(this));
            this._activeTests.push({
                xhr: request,
                testRun: this._testIndex
            });

            request.start(this.size, this._testIndex, this._payload);
        }


    };

    /**
     * Cancel the test
     */
    uploadHttpConcurrentProgress.prototype.abortAll = function () {
        clearInterval(this.interval);
        for (var i = 0; i < this._activeTests.length; i++) {
            if (typeof(this._activeTests[i]) !== 'undefined') {
              console.log(i);
                this._activeTests[i].xhr._request.abort();
                this._activeTests[i].xhr._request = null;
            }
        }
    };

    /**
     * store speedtest measurements
     * @param result
     * @private
     */
    uploadHttpConcurrentProgress.prototype._storeResults = function (result) {
        this.results.push(result);
    };

    /**
     * end of test
     */
    uploadHttpConcurrentProgress.prototype.endTest = function () {
      this._running = false;
      console.log('abortAll call');
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

    };
    /**
     * Monitor testSeries
     */
    uploadHttpConcurrentProgress.prototype._monitor = function () {
        //TODO check after 4 seconds to see if we have any results. If not the check if upload data was created. decide to create a smaller upload or report error
        console.log((Date.now() - this._beginTime));
        //check for end of test
        if ((Date.now() - this._beginTime) > this.testLength) {
          clearInterval(this.interval);
          console.log('endTest call');
          this.endTest();
        }
    };

    /**
     * reset test variables
     */
    uploadHttpConcurrentProgress.prototype.initiateTest = function () {
        this._testIndex = 0;
        this.finalResults.length = 0;
        this.uploadResults.length = 0;
        this._running = true;
        this.interval = null;
        this.totalBytes = 0;
        this.totalChunckBytes = 0;
        this._payload = null;
        this.resultsMb.length = 0;
        this.firstCheck = false;
        this.interval = setInterval(function () {
            self._monitor();
        }, this.monitorInterval);
        this.start();
        var self = this;

    };

    /**
     * getRandomData creates a random data used for testing the upload bandwidth.
     * @param size - creates a blob of the given size.
     * @returns {*}
     */
    function getRandomData(size) {

        function getData() {
            return Math.random().toString();
        }

        var count = size / 2;
        var result = getData();

        while (result.length <= count) {
            result += getData();
        }

        result = result + result.substring(0, size - result.length);
        var blob;
        try {
            blob = new Blob([result], {type: "application/octet-stream"});
        } catch (e) {
            var bb = new BlobBuilder; // jshint ignore:line
            bb.append(result);
            blob = bb.getBlob("application/octet-stream");
        }
        return blob;
    }

    //TODO will be moved to a seperate file
    function slicing(data, start, end) {
        return data.slice(start, end);
    }

    function meanCalculator(arr) {
        var peakValue = arr[arr.length - 1];
        var sum = arr.reduce(function (a, b) {
            return a + b;
        }, 0);
        var mean = sum / arr.length;
        return {
            mean: mean,
            peakValue: peakValue
        };
    }

    function numericComparator(a, b) {
        return (a - b);
    }

    window.uploadHttpConcurrentProgress = uploadHttpConcurrentProgress;
})();
