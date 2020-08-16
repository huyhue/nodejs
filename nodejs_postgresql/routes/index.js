var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg')

// Kết nối dữ liệu (node-postgres.com/features/connecting)
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'nodepostgre',
  password: 'abc123',
  port: 5432,
})

/* GET home page. */
router.get('/', function(req, res, next) {
    pool.query('SELECT * FROM CONTACT', (err, res) => {
      console.log(err, res) 
    })
   res.render('index', { title: 'Express' });
});

// Thêm dữ liệu - GET 
router.get('/them', function(req, res, next) {  
 res.render('them', { title: 'Thêm dữ liệu vào PostgreSQL' });
});

// Thêm dữ liệu - POST 
router.post('/them', function(req, res, next) {  
  //Lấy dữ liệu từ form
  var ten = req.body.ten, tuoi = req.body.tuoi;
  //Chèn vào cơ sở dữ liệu 
  pool.query('INSERT INTO contact (ten,tuoi) VALUES ($1,$2)',[ten,tuoi], (err, res) => { pool.end()})
  res.render('them', { title: 'Thêm dữ liệu vào PostgreSQL' });
});

//Xem dữ liệu - GET 
router.get('/xem', function(req, res, next) {  
  pool.query('SELECT * FROM contact  ORDER BY id ASC ', (err, dulieu) => {
      res.render('xem', { title: 'Xem dữ liệu trong PostgreSQL', data: dulieu.rows });
    }) 
 });
 
// Xóa dữ liệu - GET 
router.get('/xoa/:id', function(req, res, next) {  
  var idcanxoa  = req.params.id; //lấy id cần xóa khi kích vào biểu tượng xóa
  pool.query('DELETE FROM contact WHERE id = $1 ',[idcanxoa], (err, dulieu) => {
     res.redirect("/xem")
    }) 
 });

// Sửa dữ liệu - GET 
router.get('/sua/:id', function(req, res, next) {  
  var idcanxoa  = req.params.id; 
  pool.query('SELECT * FROM contact WHERE id = $1 ',[idcanxoa], (err, dulieu) => {
    res.render('sua', { title: 'Sửa dữ liệu trong PostgreSQL', data: dulieu.rows });
  }) 
 });

// Sửa dữ liệu - PƠST 
router.post('/sua/:id', function(req, res, next) {  
  var idcanxoa  = req.params.id ;
  var ten = req.body.ten , tuoi = req.body.tuoi ; 
  pool.query('UPDATE contact SET ten = $1, tuoi = $2 WHERE id = $3 ',[ten,tuoi,idcanxoa], (err, res) => {  })
  res.redirect('/xem');
 });
 
module.exports = router;
