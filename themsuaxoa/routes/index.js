var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;  
//kiểu dũ liệu id trên mông là vd: "_id" : ObjectId("5f356d8402649d16408a5d75") nên cần chuyển 
var chuyenthanhObjectId = require('mongodb').ObjectID;

const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name --> thay đôi lại 
const dbName = 'contact';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET thêm dữ liệu. */
router.get('/them', function(req, res, next) {
  res.render('them', { title: 'Thêm mới dữ liệu' });
});


/* POST thêm dữ liệu.. */
router.post('/them', function(req, res, next) {
   var duLieu01 = { //lấy dữ liệu từ form
    "ten" : req.body.ten,
    "dienthoai": req.body.dt
  }
  //nhập thông tin rồi post lên cơ sở dữ liệu
  const insertDocuments = function(db, callback) {
    // Get the documents collection, những hàm này điều có trên github 
    const collection = db.collection('nguoidung');
    // Insert some documents
    collection.insert(duLieu01, function(err, result) {
      assert.equal(err, null);
      console.log("Thêm dữ liệu thành công");
      callback(result);
    });
  }

  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    insertDocuments(db, function() {
      client.close();
    });
  });
//xong rồi quay về trang /them
  res.redirect('/them');
  
  });

  /* GET Xem . */
router.get('/xem', function(req, res, next) {
    //tìm tất cả dữ liệu trong csdl mongo 
    const findDocuments = function(db, callback) {
      const collection = db.collection('nguoidung');
      collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        callback(docs);
      });
    }
    MongoClient.connect(url, function(err, client) {
      assert.equal(null, err);     
      const db = client.db(dbName);      
        findDocuments(db, function(dulieu) {
          //truyền dữ liệu (trong biến data) lên trang xem
          res.render('xem', { title: 'Xem dữ liệu ',data: dulieu });
           client.close();
        });
    });

  /* Xóa dữ liệu . */
  router.get('/xoa/:idcanxoa', function(req, res, next) {
    //lấy id từ router
    var idcanxoa = chuyenthanhObjectId(req.params.idcanxoa); 
    //Hàm xóa trên mongodb
    const xoacontact = function(db, callback) {
      const collection = db.collection('nguoidung');
      //xóa dựa vào id
      collection.deleteOne({ _id : idcanxoa }, function(err, result) {
        assert.equal(err, null);
        console.log("Xóa thành công");
        callback(result);
      });    
    }
      // Use connect method to connect to the server
      MongoClient.connect(url, function(err, client) {
        assert.equal(null, err); 
        const db = client.db(dbName); 
        xoacontact(db, function() {
              client.close();
              res.redirect('/xem');
        });   
      });
  });  // end xoa du lieu 

}); //vẫn trong trong trang /xem

/* Sửa dữ liệu . */
//1. Dựa vào id lấy được id của các phần tử cần sửa, tạo view sửa.
router.get('/sua/:idcansua', function(req, res, next) {
  var idcansua = chuyenthanhObjectId(req.params.idcansua);
  const findDocuments = function(db, callback) {
     const collection = db.collection('nguoidung');
     collection.find({_id: idcansua}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Tìm thấy !");      
      callback(docs);
    });
  }
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);     
    const db = client.db(dbName);      
      findDocuments(db, function(dulieu) {
       res.render('sua', {title: 'Sửa dữ liệu ', data: dulieu });
      console.log(dulieu);
         client.close();
      });
  });
   
 }); // end get dư lieu 
 
/* POST dữ liệu trong view sửa. */
//2.Lưu dữ liệu vào mongodb sau khi sửa xong
router.post('/sua/:idcansua', function(req, res, next) {
  //chuẩn bị dữ liệu khi ấn submit
  var idcansua = chuyenthanhObjectId(req.params.idcansua);
  var duLieu01 = {
    "ten" : req.body.ten ,
    "dienthoai": req.body.dt
  }
  //lấy câu lệnh update dữ liệu trong github
  const updateDocument = function(db, callback) {
     const collection = db.collection('nguoidung');
     collection.updateOne({ _id : idcansua }, { $set: duLieu01  }, function(err, result) {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      console.log("Sửa thành công");
      callback(result);
    });  
  }

   // Use connect method to connect to the server
   MongoClient.connect(url, function(err, client) {
    assert.equal(null, err); 
    const db = client.db(dbName); 
    updateDocument(db, function() {
          client.close();
          res.redirect('/xem');
        });   
  });

}); // end post sửa 


module.exports = router;
