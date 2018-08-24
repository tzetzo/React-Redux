const env = process.env.NODE_ENV || 'development';  //heroku sets it to 'production'; package.json sets it to 'test' if the test script is executed
// console.log('env *****', env); //used to test if it is development when run on localhost

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const port = process.env.PORT || 8080; //process.env.PORT is provided by heroku
const app = express();
app.use(bodyParser.json());

app.use(express.static(__dirname)); //provides a static website with bundle.js containing all JS code build by webpack


app.get('/node', (req, res) => {  //used to test if the NODE_ENV is set to 'production' when on heroku
  res.send({node: env});
});

app.get('*', (req, res) => { //sends the user index.html by default
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
