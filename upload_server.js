// upload_server.js
// p108

var http = require('http');
var formidable = require('formidable');
var utf8 = require('utf8');

var server = http.createServer( function (req, res) {
  switch (req.method) {
    case 'GET':
      show (req, res);
      break;
    case 'POST':
      upload (req, res);
      break;
  }
});

server.listen(3000);
console.log('Server listening on port 3000');

function show( req, res ) {
  var html = ''
           + '<form method="post" action="/" enctype="multipart/form-data">'
           + '<p><input type="text" name="name"></p>'
           + '<p><input type="file" name="file"></p>'
           + '<p><input type="submit" value="Upload"></p>'
           + '</form>'
	       + '<div id="progress"></div>'
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', Buffer.byteLength(html));
  res.end(html);
}

function show_progress (res, moji) {
	res.write(moji, 'utf8');
}

var zoukabun = 0;
function upload( req, res ) {
  if ( ! isFormData( req )) {
    res.statusCode = 400;
    res.end('Bad Request: expectiong multipart/form-data');
    return;
  }

  var form = new formidable.IncomingForm();

  form.on( 'progress', function (bytesReceived, bytesExpected) {
	var percent = Math.floor(bytesReceived / bytesExpected * 100);
	  var wariai = Math.floor( percent / 10 );
	  zoukabun = wariai - zoukabun;
	  console.log(wariai);
	var shikaku = Array(zoukabun + 1).join('->');
	show_progress( res, shikaku );
  });
  
  form.parse( req, function (err, fields, files) {
	console.log('fields:');
	console.log(fields);
	console.log('files:');
	console.log(files);
	res.end( '\nupload complete!');
  });

  /*
  form.on( 'field', function (field, value) {
    console.log('field:');
    console.log(field);
    console.log('value:');
    console.log(value);
  });

  form.on( 'file', function (name, file) {
    console.log('name:');
    console.log(name);
    console.log('file:');
    console.log(file);
  });

  form.on( 'end', function () {
    res.end( 'upload complate!' );
  });
  
  form.parse( req );
  */
}

function isFormData( req ) {
  var type = req.headers['content-type'] || '';
  return 0 == type.indexOf('multipart/form-data');  // 先頭にあるかどうか
}
