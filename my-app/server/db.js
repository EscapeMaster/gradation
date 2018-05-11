
const mysql = require('mysql');
const pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'graduation'
});

exports.query = function(sql, param, callback){
    pool.getConnection(function(err, connection) {
        if(err) throw err;
        connection.query(sql, param, function(err, results) {
            if(err) throw err;
            callback(results);
            connection.release();
        });
    });
};