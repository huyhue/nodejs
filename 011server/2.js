//doc file html cach 1
var http = require('http'); 
var fs = require('fs');  
// fs: thu vien doc file

http.createServer(function(req,res){
    res.writeHead(200,{"Content-type":"text/html; charset=utf-8"});
    fs.ReadStream("./giaodien.html").pipe(res);
    // pipe: ống để đổ vào
}).listen(3000);