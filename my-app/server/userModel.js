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