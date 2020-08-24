const express = require('express');
const path = require('path');
var cors = require('cors');
const app = express();

var corsOptions = {
    origin: 'https://polar-river-52878.herokuapp.com',
    optionsSuccessStatus: 200
}

app.use(express.static(`${__dirname}/dist/Financeiro-web`));

app.get('/*', cors(corsOptions), (req, res) => {
    res.json({msg: 'This is CORS-enabled for only https://polar-river-52878.herokuapp.com.'})
    res.sendFile(path.join(`${__dirname}/dist/Financeiro-web/index.html`))
});

app.listen(process.env.PORT || 4200);