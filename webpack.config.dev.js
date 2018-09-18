const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');
const bodyParser = require('body-parser');
const oauth = require('oauth');
const session = require('express-session');
const inspect = require('util-inspect');
const logger = require('express-logger');
const cookieParser = require('cookie-parser');
// const proxyMiddleware = require('http-proxy-middleware');

const consumer = new oauth.OAuth(
    'https://twitter.com/oauth/request_token',
    'https://twitter.com/oauth/access_token',
    process.env.TWITTER_CONSUMER_KEY, process.env.TWITTER_CONSUMER_SECRET,
    '1.0A',
    'http://0.0.0.0:8080/sessions/callback',
    'HMAC-SHA1',
);

// const proxy_headers = {
//   'Access-Control-Allow-Origin': '*',
//   'Access-Control-Allow-Credentials': 'true',
//   'oauth_consumer_key': process.env.TWITTER_CONSUMER_KEY,
//   'oauth_consumer_secret': process.env.TWITTER_CONSUMER_SECRET,
//   'oauth_token': process.env.TWITTER_API_TOKEN,
//   'oauth_secret': process.env.TWITTER_API_SECRET,
//   'cache-control': 'no-cache',
// };

module.exports = merge(webpackConfig, {

  devtool: 'eval',
  cache: false,
  output: {
    pathinfo: true,
    publicPath: '/',
    filename: '[name].js',
  },

  devServer: {
    open: true,
    host: '0.0.0.0',
    publicPath: '/',
    before: (app) => {
      app.use(bodyParser.urlencoded({extended: true}));
      app.use(bodyParser.json());
      app.use(logger({path: 'log/express.log'}));
      app.use(cookieParser());
      app.use(session(
          {secret: 'very secret', resave: false, saveUninitialized: true}));

      app.use(function(req, res, next) {
        res.locals.session = req.session;
        next();
      });
      app.get('/', function(req, res) {
        consumer.get(
            'https://api.twitter.com/1.1/account/verify_credentials.json',
            req.session.oauthAccessToken,
            req.session.oauthAccessTokenSecret,
            function(error, data, response) {
              if (error) {
                //console.log(error)
                res.redirect('/sessions/connect');
              } else {
                var parsedData = JSON.parse(data);
                res.send(
                    'You are signed in: ' + inspect(parsedData.screen_name));
              }
            });
      });
    },
  },
});
