/**
 * Created by Dell on 28-08-2016.
 */
var http = require('http');

http.createServer(onRequest).listen(8888);
console.log("Server is now running");