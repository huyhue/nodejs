var http = require('http');
//http: dung webserver

http.createServer(function(req,res){
    res.writeHead(200,{"content-type":"text/html; charset=utf-8"});
    // 200: ket noi binh thuong (404: khong tim thay), text/plain: write khong co html; charset=utf-8: cho phep su dung tieng viet
    res.write("<h1>Server da ket noi thanh cong, day la ket qua tra ve tu server</h1>");
    res.write("<h2>Nội dung trang web </h2>");
    res.write("<div class='header'>Nội dung trang header</div>");
    res.write("Thank you for listening");
    res.end();
    // end: ket thuc dong ket noi

}).listen(1234);
// 1234: la cong ket noi
