const { port } = require('./config');
const express = require('express');

const app = express();

require('./src/server')(app);

app.listen(port, () => {
    console.log('server has benn running at prot:', port);
})