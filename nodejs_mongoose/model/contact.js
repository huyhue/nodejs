//định nghĩa schema
var mongoose = require('mongoose');
//nếu sử dụng moogoose thì phải có thêm model/contact.js giúp cho theo mô hình MVC.
//create a model
var contact = new mongoose.Schema({ ten: 'string', tuoi: 'number' },{collection:'contact'});
//khai báo kiểu dữ liệu, rồi xuất ra
module.exports = mongoose.model('contact', contact);
 