var express = require('express');
var router = express.Router();
var multer  = require('multer');

//buoc 2: chi ra duong dan upload va ten file
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

var upload = multer({ storage: storage })
//check chi cho upload file anh
function checkFileUpload (req, file, cb) {
  if(!file.originalname.match(/\.(jpg|png|gif|jpeg)$/)){
    cb(new Error('Ban chi duoc upload file anh !'))
  }else{
    cb(null,true)
  }
}
var upload = multer({ storage: storage,fileFilter:checkFileUpload})
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Lay du lieu tu form trang chu */
router.post('/', upload.single('anhsp'), function(req, res, next) {
  var tieude = req.body.tdsp;
  res.send("Da nhan duoc du lieu nhe, tieu de la " + tieude);
});



 

module.exports = router;
