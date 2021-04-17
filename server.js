const express = require('express');
const routes = require('./network/routes');
let app = express();

app.use(express.json(), express.urlencoded({ extended: false }));
app.use('/app', express.static('public'));

routes(app);

app.listen(3000);
console.log('Server is ready');
