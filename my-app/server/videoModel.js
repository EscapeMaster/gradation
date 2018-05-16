const db = require('./db');



exports.getAllVideos = function (callback) {
    db.query('SELECT v.*,u.username,u.avator,c.cate_name from t_video as v, t_cate as c,t_user as u where v.cate_id=c.cate_id and u.user_id=v.user_id', [], callback);//没参数要传空数组
}
exports.getVideoById = function (video_id, user_id, cate_id, callback) {
    const sql = 'select v.*,u.username,c.cate_name,m.* from t_video as v,t_user as u,t_cate as c,t_comment m where v.video_id=? and u.user_id=? and c.cate_id=? and m.video_id=?';
    db.query(sql, [video_id, user_id, cate_id, video_id], callback);//没参数要传空数组
}