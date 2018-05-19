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
    const sql = 'select c.*,u.user_id,u.username,u.avator from t_chat as c,t_user as u where c.from=u.user_id and c.chat_id=?';
    db.query(sql, [id], callback);
}
exports.getmyMsg = function (userid, callback) {
    const sql = 'select * from t_chat as c,t_user as u where (u.user_id=c.to or u.user_id=c.from) and user_id=?';
    db.query(sql, [userid], callback);
}
exports.getNameAvator = function (callback) {
    const sql = 'select u.user_id,u.username,u.avator from t_user as u';
    db.query(sql, [], callback);
}

exports.updateRead = function (userid, from, callback) {
    const sql = 'UPDATE t_chat SET `read`=? WHERE `from`=? and `to`=?';
    db.query(sql, [1, from, userid], callback);
}