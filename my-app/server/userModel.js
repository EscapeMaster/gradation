const db = require('./db');
exports.getByNamePwd = function(name,pass,callback) {
    let sql = 'select * from t_user where username=? and password=?';
    db.query(sql,[name,pass],callback);
}