var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET detail. */
router.get('/*.:idsanpham', function (req, res, next) {
  var idsp = req.params.idsanpham;
  //nếu không tồn tại sản phẩm thì tạo mảng mới
  if (!req.session.sanphamdaxem) {
    req.session.sanphamdaxem = [];
  }
  //nếu không có mới đẩy dữ liệu vào (giúp cho trong ds không có có những sản phẩm trùng lặp)
  if (req.session.sanphamdaxem.indexOf(idsp) == -1) {
    req.session.sanphamdaxem.push(idsp);
  }

  res.render('chi-tiet-san-pham', { idsanpham: req.params.idsanpham, danhsach: req.session.sanphamdaxem });
});


/* GET home page. */
router.get('/ds', function (req, res, next) {
  res.render('ds', { danhsach: req.session.sanphamdaxem });
});

module.exports = router;
