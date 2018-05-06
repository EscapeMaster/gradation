const mysql = require('mysql');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: "graduation" 
});
exports.query = (sql, param, callback) => {
    pool.getConnection((err, connection)=>{
        if(err) throw err;
        connection.query(sql,param, (err, result)=>{
            if(err) throw err;
            callback(result);
            connection.release();
        });
    });
}