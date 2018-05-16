const db = require('./db');



exports.getAllVideos = function (callback) {
    db.query('SELECT v.*,u.username,u.avator,c.cate_name from t_video as v, t_cate as c,t_user as u where v.cate_id=c.cate_id and u.user_id=v.user_id', [], callback);//没参数要传空数组
}
exports.getVideoById = function (video_id, callback) {
    const sql = 'select v.*,u.username,u.avator,c.cate_name from t_video as v,t_user as u,t_cate as c where c.cate_id=v.cate_id and u.user_id=v.user_id and video_id =?';
    db.query(sql, [video_id], callback);
}
exports.saveComment = function (v_id, u_id, time, content, callback) {
    var sql = 'insert into t_comment(content,time,video_id,user_id) values(?,?,?,?)';
    db.query(sql, [content, time, v_id, u_id], callback);
}
exports.getCommentsById = function (video_id, callback) {
    const sql = 'select u.username,c.* from t_video as v,t_user as u,t_comment as c where v.video_id=c.video_id and u.user_id=c.user_id and v.video_id=?';
    db.query(sql, [video_id], callback);
}
exports.searchVideos = function (value, callback) {
    const sql = 'select v.*,u.username,u.avator,c.cate_name from t_video as v, t_cate as c,t_user as u where u.user_id=v.user_id and v.cate_id=c.cate_id  and  (u.username LIKE ? or c.cate_name LIKE ? or v.title LIKE ? or v.desc like ? or u.college like ?)';
    db.query(sql, [value, value, value, value, value], callback);//没参数要传空数组
}
