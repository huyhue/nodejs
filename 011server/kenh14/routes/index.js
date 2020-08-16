var express = require('express');
var router = express.Router();

/* GET home page. { title: 'Tin tức' }: truyen cac tham so vao */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET home page. */
router.get('/tin-tuc', function(req, res, next) {
  res.render('tin', { title: 'Tin tức' });
});

/* GET home page. */
router.get('/san-pham', function(req, res, next) {
  res.render('san-pham', { title: 'Trang Sản phẩm', noidung:"day la noi dung" });
});

/* GET home page. */
router.get('/fedu', function(req, res, next) {
  var dulieu = { danhsachsv : ["viet","nga","my","an do"]};

  res.render('fedu', { danhsach: dulieu });
});


/* Trang about. */
router.get('/about.html', function(req, res, next) {
  res.render('about', { title: 'Trang about' });
});



/* Trang chi tiet. */
router.get('/post.html', function(req, res, next) {
  res.render('post', { title: 'Trang Post' });
});


/* Trang fashion mot . */
router.get('/fashion/mot-1432.chn', function(req, res, next) {
  res.send('Day la trang Fashion > Mot bon ba hai')
});

/* Trang chi tiet. */
router.get('/sp/:chisosanpham/:gia', function(req, res, next) {
  res.send(' mã sản phẩm là ' + req.params.chisosanpham + " Giá sản phẩm là : " + req.params.gia );
});




/* Trang chi tiet. ?: có nghĩa là nhập thiếu chữ u vẫn được */
router.get('/fedu?vn', function(req, res, next) {
  res.send(' test' );
});

 

/* Trang chi tiet. ?: có nghĩa là nhập thiếu chữ du vẫn được */
router.get('/fe(du)?vn', function(req, res, next) {
  res.send(' test' );
});

 
 

/* Trang chi tiet.?: có nghĩa là nhập bao nhiêu kí tự vẫn được */
router.get('/zing*vn', function(req, res, next) {
  res.send('Zing vn' );
});

/* Trang chi tiet. */
router.get('/*.:mabaiviet', function(req, res, next) {
  res.send('Link kieu tinh te vn ' + req.params.mabaiviet);
});

 





module.exports = router;
