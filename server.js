const express = require('express')
const next = require('next')
const mysqlLikeMongo = require("@mihajlomilojevic/mysql-like-mongo");
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
require("express-async-errors"); // ERROR WRAPPER

/********** ONLINE SECURITY **********/
// const helmet = require('helmet');
// const cors = require('cors');
// const xss = require('xss-clean');
// const rateLimiter = require('express-rate-limit');
const cookieParser = require("cookie-parser");
const auth = require('./middleware/authentication');
const errorHandler = require("./middleware/errorHandler")

app.prepare().then(() => {
  const server = express()

  mysqlLikeMongo.Connect({
    host     : process.env.HOST,
    database : process.env.DATABASE,
    user     : process.env.USER,
    password : process.env.PASSWORD
  })
  // server.set('trust proxy', 1);
  // server.use(
  //   rateLimiter({
  //     windowMs: 15 * 60 * 1000, // 15 minutes
  //     max: 500, // limit each IP to 100 requests per windowMs
  //   })
  // );
  server.use(express.json()); // CONVERTS REQUEST BODY TO JS OBJECT AND ADDS IT TO REQ OBJECT
  // server.use(helmet()); // SECURITY
  // server.use(cors()); // SECURITY
  // server.use(xss()); // SECURITY
  server.use(cookieParser());
  server.use("/api/grupe", auth);

  server.all('*', (req, res) => {
    return handle(req, res)
  })
  
  server.use(errorHandler);
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})
