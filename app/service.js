import request from 'axios';

const getRetweets = function(q, filter) {
  // Optionally the request above could also be done as
  return request.get(`${TWITTER_API_URL}/1.1/search/tweets.json?q=“${q}”&filter=${filter}`);
};

export {getRetweets};
