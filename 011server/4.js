//Sử dụng router va module trong node js
var http = require('http');
var app = require('./app.js');
//Tách nhỏ thành các module để dễ bảo trì khi phát triển dự án

http.createServer(app.load_router).listen(1000);