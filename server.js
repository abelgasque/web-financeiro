const express = require('express')
const path = require('path')
var cors = require('cors')
const app = express()

var corsOptions = {
    origin: 'https://polar-river-52878.herokuapp.com',
    optionsSuccessStatus: 200
}

app.use(express.static(`${__dirname}/dist/Financeiro-web`))

app.get('/*', cors(corsOptions),(req, res) => {
    res.json({msg: 'This is CORS-enabled for all origins!'})
    res.sendFile(path.join(`${__dirname}/dist/Financeiro-web/index.html`))
});

app.listen(process.env.PORT || 4200, function(){
    console.log(`CORS-enabled web server listening on port ${process.env.PORT || 4200}`)
});