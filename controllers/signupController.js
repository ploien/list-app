const sequelize = require('../util/mysqlDatabase');
const User = require('../models/user');
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.user,
      pass: process.env.pass
    }
  });

exports.getSignup = (req, res, next) => {
    res.render('pages/signupPage/signup', {
        path: '/signup', 
        errorMessage: req.flash('userExists')
    })
}

exports.postSignup = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;


    const user = await User.findOne({where: {email: email}});
    if (!user) {
        hashedPassword = await bcrypt.hash(password, 12);
        User.create({email: email, password: hashedPassword})
        req.session.destroy(err => {
            console.log(err);
            res.redirect('/login');
          });
    } else {
        req.flash('userExists', 'Error: User email exists');
        res.redirect('/signup')
    }
}

