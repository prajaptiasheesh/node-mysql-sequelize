require('./src/config');
require('./src/db/models')
const routes = require('./src/routes/v1');
const CONFIGS = require('./src/config');
const Mailer = require('./src/services');

const app = require('express')();
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

var Gmail = new Mailer('mailtrap');

Gmail.testMail()
const options = {
  key: fs.readFileSync( path.join(__dirname, 'src', 'certificates', 'key.pem') ),
  cert: fs.readFileSync(path.join(__dirname, 'src', 'certificates','cert.pem'))
};

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/v1', routes);

let listener = (text)=>()=>{
  console.log(text);
}

if(CONFIGS.isProduction){
  https.createServer(options, app).listen(listener('https running on port 443'));
}else{
  https.createServer(options, app).listen(listener('https running on port 443'));
  http.createServer(app).listen(8080,listener('https running on port 8080'));
}