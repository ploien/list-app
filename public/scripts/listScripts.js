/***********************************************************************
 * This function is fired by the "Add New Task" button, adds a new task
 * to the database, and realods the list of incomplete items.
 ***********************************************************************/
async function addNewTask() {

    const taskBody = JSON.stringify({ taskBody: document.getElementById("new_task").value, listId: document.getElementById("listId").value});
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: taskBody
    }

    let responsePromise = await fetch('/addTask', options);
    let response = await responsePromise.json();

    addNewTaskToList(response);
}

function addNewTaskToList(newTask) {
    let taskInfo = JSON.parse(newTask);
    let taskList = document.getElementById("to_do_list");
    

    let newItem = document.createElement("li")
    newItem.classList.add("task-row__wrapper");
    const listItem = "<ul class='task-row'>" +
                        "<li class='task-row__item task-body'>" + 
                            "<p  id='task-body" + taskInfo.id + "'>" + taskInfo.taskBody +"</p>" +
                        "</li>" +
                        "<li class='task-row__item'>" +
                            "<input type='checkbox'  name='complete-checkbox' onchange='markComplete(this)'>Complete</input>" +
                            "<input class='hidden' value='" + taskInfo.id + "'>" + 
                        "</li>" +
                        "<li class='task-row__item'>" + 
                            "<button class='button' name='delete' onclick='deleteTask(this)'>Delete</button>" +
                            "<input class='hidden' value='" +  taskInfo.id + "'>" + 
                        "</li>" + 
                    "</ul>"

    newItem.innerHTML = listItem;
    taskList.appendChild(newItem);
}

/***********************************************************************
 * This function is fired by the "delete" button attached to each line. 
 * It adds a new task to the database, and realods the list of incomplete items.
 ***********************************************************************/
async function deleteTask(btn) {

    let taskId = btn.nextElementSibling.value;
    const id = JSON.stringify({id: taskId});

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: id
    }
    let response = await fetch('/deleteTask', options);

    let wrapperElement = btn.closest(".task-row");
    wrapperElement.remove();
}

//Determines what is done when checkbox is checked and unchecked
async function markComplete(btn) {
    let id = btn.nextElementSibling.value;
    let stringifiedId = JSON.stringify({id: id});
    var token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'CSRF-Token': token
        },
        body: stringifiedId
    }

    if(btn.checked) {
        let response = await fetch('/completeTask', options);
    } else { 
        let response = await fetch('/incompleteTask', options);
    }

    setTaskBodyTextStyle(btn.checked, id);
}

//Set's the style for taskBody depending on if it's marked complete or not
function setTaskBodyTextStyle(completeBool, id) {

    let textNode = document.getElementById("task-body" + id);

   if(completeBool) {
        textNode.style="text-decoration:line-through";
   } else {
        textNode.style="text-decoration:none";
   }
}


