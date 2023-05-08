const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 8000 // So we can run on heroku || (OR) localhost:8000
const app = express();
const flash = require('connect-flash');
require('dotenv').config()
const sequelize = require('./util/mysqlDatabase');

const listRoutes = require('./routes/list');
const homeRoutes = require('./routes/home');
const signupRoutes = require('./routes/signup');
const loginRoutes = require('./routes/login');

const csrf = require('csurf');
const session = require('express-session');

const List = require('./models/list');
const Task = require('./models/task');
const User = require('./models/user');

User.hasMany(List);
List.belongsTo(User);
List.hasMany(Task);
Task.belongsTo(List);

var SequelizeStore = require("connect-session-sequelize")(session.Store);
const csrfProtection = csrf();

app.use(express.static(path.join(__dirname, 'public')))
.set('views', path.join(__dirname, 'views'))

app.use(session({
   secret: 'mySecret', 
   resave: false, 
   saveUninitialized: false,
   store: new SequelizeStore({
      db: sequelize,
    })
}))

.set('view engine', 'ejs')
.use(express.urlencoded({ extended: false })) // For parsing the body of a POST
.use(express.json())
.use(express.text());

//Assign session user to request body
app.use((req, res, next) => {
   if (!req.session.user) {
     return next();
   }
   User.findOne({where: {id: req.session.user.id}})
   .then(user => {
      req.user = user;
      next();
     })
     .catch(err => console.log(err));
 });

 app.use(csrfProtection);
 app.use(flash());

 //adds listed variable to every get request
 app.use((req, res, next) => {
   res.locals.isAuthenticated = req.session.isLoggedIn;
   res.locals.csrfToken = req.csrfToken();
   next();
})

//Initialize/use routes
app.use(loginRoutes);
app.use(listRoutes);
app.use(homeRoutes);
app.use(signupRoutes);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

sequelize
   .sync()
   //.sync({force: true})
   .then(result => {
   })
   .catch(err => console.log(err))