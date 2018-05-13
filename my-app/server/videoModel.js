const db = require('./db');



exports.getAllVideos = function(callback){
    db.query('SELECT v.*,u.username,u.avator,c.cate_name from t_video as v, t_cate as c,t_user as u where v.cate_id=c.cate_id and u.user_id=v.user_id',[],callback);//没参数要传空数组
}