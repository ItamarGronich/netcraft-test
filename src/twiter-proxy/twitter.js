var Twitter = require('twitter-node-client')
  .Twitter;

// make a directory in the root folder of your project called data
// copy the node_modules/twitter-node-client/twitter_config file over into data/twitter_config`
// Open `data/twitter_config` and supply your applications `consumerKey`, 'consumerSecret', 'accessToken', 'accessTokenSecret', 'callBackUrl' to the appropriate fields in your data/twitter_config file

var twitter = new Twitter({
  "consumerKey": "z8cz2KnHramMDVijCwEGC9LvJ",
  "consumerSecret": "2TMtV5yWIOVnjcDhe0lcqMSiFI2aQNlwlXsYrY8xXMPAEzqyUB",
  "accessToken": "113762989-BI4GTPp3zp7AMcnv7MIJBcF86BFY9YzRK3DgxsJ2",
  "accessTokenSecret": "pIlRXJPIHyCkXTl95WZPHWIdO8Bt9sFxBZI44rtLh5ddL",
  "callBackUrl": null
});

// twitter.getCustomApiCall('/users/search.json', {q: 'itamar'}, error => console.log(error), success => console.log(success));
//Example calls
module.exports = (path, query) =>
   new Promise((resolve, reject) => twitter.getCustomApiCall(path, query, error => reject(error), success => resolve(success)));
