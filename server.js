const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.static(`${__dirname}/dist/Financeiro-web`));

app.get('/*', (req, res) => {
res.sendFile(path.join(`${__dirname}/dist/Financeiro-web/index.html`));
});

app.listen(process.env.PORT || 4200);