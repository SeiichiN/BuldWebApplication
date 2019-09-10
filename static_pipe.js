// static.js
// p97
// 静的ファイルサーバー

var http = require('http');
var parse = require('url').parse;
var join = require('path').join;
var fs = require('fs');

var root = __dirname;

var server = http.createServer( function (req, res) {
	var url = parse( req.url );
	var path = join( root, url.pathname );
	fs.stat( path, function ( err, stat ) {
		if (err) {
			if ('ENOENT' === err.code) {  // ファイルが存在しない
				res.statusCode = 404;
				res.end('Not Found\n');
			} else {
				res.statusCode = 500;
				res.end( 'Internal Server Error\n' );
			}
		} else {
			res.setHeader( 'Content-Length', stat.size );

			var stream = fs.createReadStream( path );
			stream.pipe(res);
			// p102
			stream.on('error', function (err) {
				res.statusCode = 500;
				res.end( 'Internal Server Error\n');
			});
		}
	});
});

server.listen(3000);

console.log('Server listening in port 3000');

