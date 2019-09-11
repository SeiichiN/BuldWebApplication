// secure_server.js
// p113

var https = require('https');
var fs = require('fs');

var options = {
  key: fs.readFileSync( '/home/se-ichi/.ssh/key.pem' ),
  cert: fs.readFileSync( '/home/se-ichi/.ssh/key-cert.pem' )
};

var server = https.createServer( options, function (req, res) {
  res.writeHead( 200 );
  res.end( "hello world!\n" );
});

server.listen(8000);
console.log('Server listening on 8000 port...');
