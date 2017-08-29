//webSocket object
var socket;
//webSocket readyStatus
var CONNECTING = 0;	//The connection is not yet open.
var OPEN = 1;	//The connection is open and ready to communicate.
var CLOSING =	2;	//The connection is in the process of closing.
var CLOSED = 3;	//The connection is closed or couldn't be opened.
//start of WebSocket
var startWebSocket;
//start of WebSocket data transferSize
var startWebSocketTransfer;
//interval for webSocket status
var interval;

/**
* web worker message event listener
*/
self.addEventListener('message', function(e) {
  //callback function
  function requestComplete(data){
  			self.postMessage(data);
  		}
completeRequest(e.data,requestComplete);

});

/**
* check if webSocket is open
*/
function checkWebSocketStatus(){
  if(socket.readyStatus === OPEN){
    clearInterval(interval);
  }else{
    if((Date.now() - startWebSocket)>3000){
      try{
        clearInterval(interval);
        socket.close();
      }catch(err){
        clearInterval(interval);
        console.log('error closeing socket');
      }

    }
  }

}

/**
* complete websocket request
*/
function completeRequest(message, callback){
  //create webSocket connection if none exits
  if(!socket){
    socket = new WebSocket(message.url);
    startWebSocket = Date.now();
    //check status
    this.interval = setInterval(function () {
      checkWebSocketStatus(callback);
    }, 500);

  }

 // Handle any errors that occur.
 socket.onerror = function(error) {
   console.log('WebSocket Error: ' + error);
 };

 // Show a connected message when the WebSocket is opened.
 socket.onopen = function(event) {
   clearInterval(interval);
   if(message.type === 'download'){
     var obj = {'flag': 'download', 'id':message.id, 'size': message.transferSize};
     socket.send(JSON.stringify(obj), {mask: true});
   } else{
     var uploadData = new Uint8Array(message.transferSize);
     for (var i = 0; i < uploadData.length; i++) {
        uploadData[i] = 32 + Math.random() * 95;
      }
     var obj = {'data': uploadData, 'flag': 'upload', 'id':message.id, 'size': message.transferSize};
     socket.send(obj, {mask: true});
   }
   startWebSocketTransfer = Date.now();

 };
 // Handle messages sent by the server.
 socket.onmessage = function(event) {
   var result={};
   result.type = message.type;
     if(message.type === 'download'){
     result.id = message.id;
     result.chunckLoaded = (message.transferSize) / 1000000;
     result.endTime = Date.now();
     result.totalTime = (Date.now() - startWebSocketTransfer)/1000;
     result.bandwidthMbs = result.chunckLoaded/result.totalTime;
   } else {
     var data = JSON.parse(event.data);
     result.id = message.id;
     result.chunckLoaded = (message.transferSize) / 1000000;
     result.endTime = data.endTime;
     result.totalTime = (Date.now() - data.endTime)/1000;
     result.bandwidthMbs = result.chunckLoaded/result.totalTime;
   }
   result.message = message;
   if(result.chunckLoaded){
     callback(result);
   }
 };

 // Show a disconnected message when the WebSocket is closed.
 socket.onclose = function(event) {
   console.log('onClose');
   console.log(event);
 };
}
