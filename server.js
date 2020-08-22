const express = require('express');
const path = require('path');
const nomeApp = process.env.npm_package_name;
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.static(`${__dirname}/dist/Financeiro-web`));

app.get('/*', (req, res) => {
res.sendFile(path.join(`${__dirname}/dist/Financeiro-web/index.html`));
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.listen(process.env.PORT || 4200);