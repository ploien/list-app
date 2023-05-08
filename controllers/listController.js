const Task = require('../models/task');
const List = require('../models/list');
//const sequelize = require('../util/mysqlDatabase');



/*************************************************************
 * Route: GETLIST (Page Load)
 * RENDERS /list page
 * The main page for the users task list. 
 * Default behavior is to show tasks added in the last month
 *************************************************************/
exports.getList =  async (req, res, next) => {

    //Assign listId to session variable
    const listId = req.params.listId;
    req.session.listId = listId;

    //Get the title of the list to send to page
    let listTitle = await List.findByPk(listId);
    listTitle = listTitle.title;

    //Get all tasks assigned to given listId    
    let list = await Task.findAll({
        raw: true,
        where: {listId: listId}
    });

    //Load list or redirect to login page is no user's logged in
    if (req.session.isLoggedIn) {
        res.render('pages/listPage/list', {
            list: list,
            listId: listId,
            listTitle: listTitle,
            path: '/list'
        });
    } else {
        res.redirect('/login')
    }
}

/**********************************************************
 * Route: ADDTASK
 * Adds a task to the  database and reloads the task lists
 **********************************************************/
exports.addTask = (req, res, next ) => {
    
    const taskBody = req.body.new_task;
    const listId = req.body.listId;
    Task.create({ taskBody: taskBody, creationDate: Date.now(), ListId: listId, complete: false });
    res.redirect('/list/' + listId);
    // .then(newTask => {
    //     const jsonNewTask = JSON.stringify(newTask);
    //     res.json(jsonNewTask)
    // })    
    // .catch(err => { console.log(err) })
};

/****************************************************
 * Route: DELETETASK (AJAX)
 * Descrption: Deletes the selected task from
 * the database and removes it from the users list
 ***************************************************/
exports.deleteTask = (req, res, next) => {
    
    const id = req.body.taskId;
    const listId = req.body.listId;
    
    Task.destroy({where: {id: id}});
    res.redirect('/list/' + listId);
}

//Marks task for given Id as complete
exports.completeTask = (req, res, next) => {
    const id = req.body.id;
    const update = Task.update({ complete: true, completionDate: Date.now() }, { where: { id: id } });
    res.send();

}

//Marks task for given Id as incomplete
exports.incompleteTask = (req, res, next) => {
    const id = req.body.id;
    const update = Task.update({ complete: false, completionDate: null }, { where: { id: id } });
    res.send();
}
