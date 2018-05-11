const db = require('./db');

// var mysql = require('mysql');
// var pool  = mysql.createPool({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'graduation'
// });




exports.getByNamePwd = function(callback){

    // pool.getConnection(function(err, connection) {
    //     if(err) throw err;
    //     connection.query('SELECT * from t_user', function (error, results, fields) {
    //       if (error) throw error;
    //       console.log('The solution is: ', results[0]);
    //       callback(results)
    //       connection.release();
       
    //     });
    //   });
    db.query('SELECT * from t_user',[],callback);//没参数要传空数组
}