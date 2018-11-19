require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const session      = require('express-session');
const flash        = require('connect-flash');
const MongoStore   = require('connect-mongo')(session);
const passport     = require ('passport');

// run the code inside 'passport-setup.js and google-strategy.js'
require('./config/passport/passport-setup.js');
// require('./config/passport/google-strategy');

mongoose
  .connect('mongodb://localhost/scubadives', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      
hbs.registerPartials(path.join(__dirname, "views", "partials"));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// makes our app create sessions
app.use(session({
  //resave and saveUnitialized are just here to avoid warning messages
  resave: true,
  saveUnintialized: true,
  // secret should be a string that is different for every app
  secret: "eXUW6iJ6=2h}yB2345^;MmJ+fpYiU8A[Mg2KNRAj?C",
  // use the connect-mongo npm package to store session info in MongoDB
  store: new MongoStore({mongooseConnection: mongoose.connection}),
}));
// set up Passport with our session (creates properties and methods for 'req')
app.use(passport.initialize());
app.use(passport.session());
//enables flash messages in our routes that has req.flash()
app.use(flash());
// app.use() defines MIDDLEWARE functions(They runs before ALL your routes)
app.use((req, res, next) =>{
    //send flash messages to the hbs file as messages
    res.locals.messages = req.flash();
    // send logged in user infor to the hbs file as currentUser
    res.locals.currentUser = req.user;
    //you need this or your app wont work(pages will load forever)
    next();
});


// default value for title local
app.locals.title = 'Scuba Dives';



const index = require('./routes/index');
app.use('/', index);
const authRoute = require('./routes/auth-route');
app.use('/', authRoute);


module.exports = app;
