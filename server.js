const express = require('express');
const app = express();

app.use(express.static('public'));

require('http').createServer(app).listen(8888, () => {
    console.log('listening');
});