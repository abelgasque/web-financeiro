const express = require('express');
const path = require('path');
const nomeApp = process.env.npm_package_name;
const app = express();
app.use(express.static(`${__dirname}/dist/Financeiro-web`));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/*', (req, res) => {
res.sendFile(path.join(`${__dirname}/dist/Financeiro-web/index.html`));
});

app.listen(process.env.PORT || 4200);