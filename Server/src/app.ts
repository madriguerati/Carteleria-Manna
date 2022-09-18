
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
const server = express();




export {server};