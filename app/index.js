/**
 * Application entry point
 */

// Load application styles
import 'bootstrap/scss/bootstrap.scss';
import 'styles/index.scss';
import {getRetweets} from './service';

// ================================
// START YOUR APP HERE
// ================================
//here code
let searchForm = document.getElementById('searchForm');
let searchQ = document.getElementById('phraseInp');

searchForm.onsubmit = function(ev) {
  ev.preventDefault();
  getRetweets(searchQ.value, 'retweets', (res) => {
        console.log(res);
      },
      (err) => {
        console.error(err);
      });
};

// import * as qs from 'qs';
//
// const url = 'https://api.twitter.com/oauth/request_token';
//
// let oauth = {};
//
// oauth['consumer_key'] = process.env.TWITTER_CONSUMER_KEY;
// oauth['consumer_secret'] = process.env.TWITTER_CONSUMER_SECRET;
// request.post({url: url, oauth: oauth}, function(e, r, body) {
//   let req_data = qs.parse(body);
//   let uri = 'https://api.twitter.com/oauth/authenticate'
//       + '?' + qs.stringify({oauth_token: req_data.oauth_token});
//   // redirect the user to the authorize uri
//
//   let auth_data = qs.parse(body);
//
//   let oauth = {
//         consumer_key: process.env.TWITTER_CONSUMER_KEY,
//         consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
//         token: auth_data.oauth_token,
//         token_secret: req_data.oauth_token_secret,
//         verifier: auth_data.oauth_verifier,
//       },
//       url = 'https://api.twitter.com/oauth/access_token';
//
//   request.post({url: url, oauth: oauth}, function(e, r, body) {
//     // ready to make signed requests on behalf of the user
//     let perm_data = qs.parse(body),
//         oauth = {
//           consumer_key: process.env.TWITTER_CONSUMER_KEY,
//           consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
//           token: perm_data.oauth_token,
//           token_secret: perm_data.oauth_token_secret,
//         },
//         url = 'https://api.twitter.com/1.1/users/show.json',
//         qs = {
//           screen_name: perm_data.screen_name
//           , user_id: perm_data.user_id,
//         };
//     request.get({url: url, oauth: oauth, qs: qs, json: true},
//         function(e, r, user) {
//           console.log(user);
//         });
//   });
// });
//


