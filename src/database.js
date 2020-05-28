const mysql =require('mysql');
const {promisify} = require('util');
const{database}= require('./keys');

 const pool = mysql.createPool(database)

  pool.getConnection((err,connection) =>{
       if(err){
            if (err.code ==='PROTOCOL_CONECCTION_LOST'){
                 console.log('database conection was closed');
            }
               if(err.code==='ER_CONT_COUNT_ERROR'){
                    console.error('DATABASE HAS TO MANY CONECCTIONS');
                    }
                    if(err.code === 'ECONNREFUSED'){
                         console.error('DATABASE CONNECTION WAS REFUSED');
                    }
          }
          if(connection)connection.release();
          console.log('DB IS CONNECTED');
          return;
     });

     pool.query=promisify(pool.query)
     module.exports=pool;
