var express = require('express');
var multer  = require('multer') ;
var mongoose = require('mongoose');
var uploadspModel = require('../model/uploadsp');
var router = express.Router();

mongoose.connect('mongodb://localhost/sanpham1', { useMongoClient: true });
var anhs = []; //Mảng trung gian ở giữa.

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './anhsanpham')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname) ;
  }
})

var upload = multer({ storage: storage })

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST upload file. */
router.post('/uploadfile',upload.any(), function(req, res, next) {
  var tentamthoi = req.files[0].path;  
  console.log(req.files[0]);
  anhs.push(tentamthoi); // dựa tên ảnh vào mảng dữ liệu đã khai báo ở trên 
  // console.log(anhs);
  res.status(200).send(req.files);  
});

/* POST up sản phẩm */
router.post('/upsanpham', function(req, res, next) {
  var ten = req.body.ten, gia = req.body.gia ; 
  // Định nghĩa một đối tượng để insert 
  var motdoituong = {
    "ten": ten,
    "gia": gia,
    "anh": anhs 
  }
  var dulieu = new uploadspModel(motdoituong); 
  dulieu.save() ; 
  res.render('thanhcong');
});

/* GET xemsp page. */
router.get('/xemsp', function(req, res, next) {
  // Sử dụng mongoose lấy dữ liệu và đổ dữ liệu ra xemsp.ejs
  uploadspModel.find({},function(error,dulieu){
    console.log(dulieu);
    res.render('xemsp', { data: dulieu });
  })
});

module.exports = router;
