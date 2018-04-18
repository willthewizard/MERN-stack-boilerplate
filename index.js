const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
var cookieParser = require('cookie-parser');
const passport = require('passport');
const bodyParser = require('body-parser');

// 
// 
const app = express();
mongoose.connect('mongodb://admin:gaga2017@ds151662.mlab.com:51662/gagacrm'); 
app.set("trust proxy",1);

app.use(bodyParser.json());  
app.use(bodyParser.urlencoded()); 

app.use(cookieParser());


app.use(
  cookieSession({
    path:"/",
    secret:'gaga\crm',
  })
); 

// ************************* Set Up New Amin*********************
  var passwordHash = require('password-hash'); 

require('./routes/userRoutes')(app);



if (process.env.NODE_ENV === 'production') { 
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
