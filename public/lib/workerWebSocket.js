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
   var obj = {'flag': 'download', 'id':message.id, 'size': message.transferSize};
   startWebSocketTransfer = Date.now();
   socket.send(JSON.stringify(obj), {mask: true});
 };
 // Handle messages sent by the server.
 socket.onmessage = function(event) {
   var result={};
   result.id = message.id;
   result.chunckLoaded = (event.data.size * 8) / 1000000;
   result.endTime = Date.now();
   result.totalTime = (Date.now() - startWebSocketTransfer)/1000;
   result.bandwidthMbs = result.chunckLoaded/result.totalTime;
   callback(result);
 };

 // Show a disconnected message when the WebSocket is closed.
 socket.onclose = function(event) {
   console.log('onClose');
   console.log(event);
 };
}
