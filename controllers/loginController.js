const sequelize = require('../util/mysqlDatabase');
const User = require('../models/user');
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
    req.session.isLoggedIn = false;
    res.render("pages/loginPage/login", {
        path: '/login',
        errorMessage: req.flash('invalidUser')
    });
}

exports.postLogin = async (req, res, next) => {
    //check if user exists in database
    const email = req.body.email;
    const password = req.body.password;
    const user =  await User.findOne({where: {email: email}})
    if(!user) {
        req.flash('invalidUser', 'Error: Email or password is incorrect');
        res.redirect("/login");
    }
    //IF USER -> attach user to session & direct to list page
    else {
        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if (passwordMatch) {
            req.session.user = user;
            req.session.isLoggedIn = true;
                req.session.save(err => {
                console.log(err);
                res.redirect('/');
            });
        } else {
            req.flash('invalidUser', 'Error: Email or password is incorrect');
            res.redirect("/login");
        }
    }
}

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/login');
      });
}