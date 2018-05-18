const db = require('./db');




exports.getMsgById = function (chatid, callback) {
    const sql = 'select * from t_chat as c where c.only_id=?';
    db.query(sql, [chatid], callback);
}
exports.saveMsg = function (from, to, msg, chatid, time, callback) {
    var sql = 'insert into t_chat(`from`,`to`,content,create_time,only_id,`read`) values(?,?,?,?,?,?)';
    db.query(sql, [from, to, msg, time, chatid, 0], callback);
}
exports.getMsgByInsertId = function (id, callback) {
    const sql = 'select * from t_chat where chat_id=?';
    db.query(sql, [id], callback);
}