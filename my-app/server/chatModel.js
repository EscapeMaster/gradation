const db = require('./db');




exports.getMsgById = function (userid, callback) {
    const sql = 'select u.username,c.* from t_user as u,t_chat as c where (c.to=u.user_id or c.from =u.user_id) and (c.from=?)';
    db.query(sql, [userid], callback);
}
