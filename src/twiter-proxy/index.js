const
  express = require('express'),
  cors    = require('cors'),
  app     = express(),
  twitter = require('./twitter.js');;

app.use(cors());

app.get('/*', (req, res, next) => {
  const
    path  = req.params[0],
    query = req.query;

  // Search twitter if query exists
  twitter('/' + path, query).then( resData => res.json(resData) );
});

app.listen(3001, function () {
  console.log('CORS-enabled web server listening on port 3001')
})
