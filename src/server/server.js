import express from 'express';
import path from 'path';
import compression from 'compression';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import logger from 'morgan';
import mongodbConfig from './config/config';
import route from './route/index';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

mongodbConfig();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('dist'));

app.get('/api', (req, res) => {
  res.json({
    status: 'Success',
    message: 'Welcome to the app API'
  });
});

app.use('/api', route);

app.all('/api*', (req, res) => {
  res.json({
    status: 'Failed',
    message: 'Route does not exist'
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './index.html'));
});

app.listen(port, () => console.log(`server is up and running on port ${port}`));
