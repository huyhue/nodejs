var fs = require('fs');

//Xây dựng 1 hàm đọc file html khi client nhập vào router
function docFileHtml(tenfile, res) {
    res.writeHead(200, { "Content-type": "text/html; charset=utf-8" });
    fs.ReadStream(tenfile).pipe(res);
}

var load_router = function (req, res) {
    var path = req.url;
    // console.log(path);
    //req.url: lấy router khi client nhập vào trên http://localhost:3000/... (...: path)
    switch (path) {
        case "/":
            docFileHtml('giaodien1.html', res);
            break;
        case "/tin-tuc":
            docFileHtml('giaodien2.html', res);
            break;
        default:
            docFileHtml('404.html', res);
            break;

    }
}

module.exports.load_router = load_router; 