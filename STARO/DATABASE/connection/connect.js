import mysqlLikeMongo from "@mihajlomilojevic/mysql-like-mongo"

mysqlLikeMongo.Connect({
  host     : process.env.HOST,
  database : process.env.DATABASE,
  user     : process.env.USER,
  password : process.env.PASSWORD
})

export default mysqlLikeMongo.connection;