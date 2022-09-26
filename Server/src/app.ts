
import express from'express';
//import passport from 'passport'
import routes from './Routes/index';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import passportmiddleware from './middlewares/passport/passport'
import '../build/src/config/mongodb/db.js'
import cors from 'cors';
import http from 'http'
import {createRoles} from './Lib/initialSetUp'

const server = express();
createRoles();


server.use(express.json());

//cors config
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});



//passport
server.use(passport.initialize());
passport.use(passportmiddleware);

//routes
server.use('/api', routes);
//cors
server.use(cors());

server.use((err:any, _req:any, res:any, _next:any) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send({message});
  });
  


export {server};