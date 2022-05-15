const mysql = require('serverless-mysql')

const connection = mysql({
  config: {
    host     : process.env.HOST,
    database : process.env.DATABASE,
    user     : process.env.USER,
    password : process.env.PASSWORD
  }
})


console.log(typeof mysql, mysql);

export default connection;