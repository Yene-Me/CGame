var express = require('express');
var app = express();

app.use(express.static('public'));

//uncomment to run Unit test using Qunit.js
//app.use('/test',express.static('test'));

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});
