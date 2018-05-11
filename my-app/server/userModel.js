// var db = require('./db');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'graduation'
});
 
exports.getByNamePwd = function(){
    connection.connect();
    connection.query('SELECT * from t_user', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results[0]);
      });
       
    connection.end();
}

// exports.getByNamePwd = function(callback){
//     /*db.connection.connect();
//     var sql = 'select * from t_user where username=? and password=?';
//     db.connection.query(sql, [name, pass], function(err, result, fields) {
//         if (err) throw err;
//         callback(result);
//     });
//     db.connection.end();*/
//     var sql = 'select * from t_user';
//     db.query(sql, callback);

// };
