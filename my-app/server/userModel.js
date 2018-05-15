const db = require('./db');



exports.findRepeat = function(user,callback){
    var sql = 'SELECT * from t_user where username=?';
    db.query(sql,[user],callback);
}
exports.saveinfo = function(user,pwd,type,callback){
    var sql = 'insert into t_user(username,pwd,type,is_delete) values(?,?,?,?)';
    db.query(sql,[user,pwd,type,0],callback);
}
exports.getByNamePwd = function(callback){
    db.query('SELECT * from t_user',[],callback);//没参数要传空数组
}
exports.checklogin = function(user,pwd,callback){
    var sql = 'SELECT * from t_user where username=? and pwd=?';
    db.query(sql,[user,pwd],callback);
}
exports.getById = function(user_id,callback){
    var sql = 'SELECT * from t_user where user_id=?';
    db.query(sql,[user_id],callback);
}
exports.updateInfo = function(desc,avator,user_id,address,school,college,callback){
    var sql = 'UPDATE t_user SET `desc`=?, `avator`=?, `address`=?, `school`=?, `college`=? WHERE user_id=?';
    db.query(sql,[desc,avator,address,school,college,user_id],callback);
}
