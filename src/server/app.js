const path = require('path');
const fs = require('fs');
const express = require('express');
const Router = express.Router;
const app = express();

// we serve the built front-end which is located in
// the docs directory at the root of our project
const frontendDirectoryPath = path.resolve(__dirname, './../../docs');
// with the express static middleware
app.use(express.static(frontendDirectoryPath));

// the router can help you organize the routes of your application
const apiRouter = new Router();
app.use('/api', apiRouter);

// the "route" here is "/" but as we will
// use the router in our app the route will be
// accessible at "/api/"
apiRouter.get('/', (req, res) => {
  // passing an object to the res.send() method
  // will automatically set the right "Content-Type"
  // header to the response
  res.send({ 'shop-api': '1.0' });
});

apiRouter.get('/products', (req, res, next) => {
  // for the example, we read the file located in the src/static directory
  // but we should have a database request instead here
  fs.readFile(`${frontendDirectoryPath}/static/products.json`, (err, content) => {
    if (err) return next(err);
    // because the type of the content argument is actually
    // "Buffer" and not "Object" we need to set the
    // "Content-Type" header of the response to "application/json"
    // the res.type() function does it
    res.type('json');
    res.send(content);
  });
});

// of course it would be much better not to repeat ourselves
// and it is possible fairly easly (give it a try 😉)
apiRouter.get('/categories', (req, res, next) => {
  fs.readFile(`${frontendDirectoryPath}/static/categories.json`, (err, content) => {
    if (err) return next(err);
    res.type('json');
    res.send(content);
  });
});

// we start listening to request on port 9090
app.listen(9090, (err) => {
  if (err) throw err;
  console.info('Server started on port 9090');
});
