const sequelize = require('../util/mysqlDatabase');
const List = require('../models/list');
const User = require('../models/user');

/*************************************************************
 * Route: GETLIST (Page Load)
 * RENDERS /list page
 * The main page for the users task list. 
 * Default behavior is to show tasks added in the last month
 *************************************************************/
 exports.getHome = async (req, res, next) => {

        if(req.session.isLoggedIn) {

                const user = req.user;
                var lists =  await List.findAll( {
                        raw: true,
                        attributes: ['id', 'title'], 
                        where: {userId: user.id}
                        }
                )

                res.render('pages/homePage/home', {
                        lists: lists,
                        path: '/',
                }) 
        } else {
                res.redirect('/login');
        }
}

exports.postCreateList = (req, res, next) => {
        const title = req.body.listTitle;
        const userId = req.user.id;

        const list = List.create({title: title, UserId: userId})
        .then (list => {
                console.log("Created new list");
                res.redirect("/");
        })
        .catch(err => console.log(err))
}

exports.postDeleteList = (req, res, next) => {

        const listId = req.body.listId;        
        List.destroy({where: {id: listId}})
        res.redirect('/');
}