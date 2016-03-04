var express = require('express');
var app = express();

//* ------------------------- */
/*     MIDDLEWARE & ROUTES    */
/* -------------------------- */

require('./config/middleware')(app, express);
require('./config/router')(app, express);

/* -------------- */
/*     SERVER     */
/* -------------- */

var port = process.env.PORT || 3000;
app.listen(port, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }
  console.log('Node Server + Webpack Hot Middleware is listening on', port);
});

exports = module.exports = app;
