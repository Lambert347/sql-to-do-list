console.log('JAVAJAVAJAVA');
$(document).ready(readyOn);

function readyOn(){
    console.log('JQ');
    getTasks();
    $('#addTask').on('click', addTask);
    $('#tasksDisplay').on('click', '.isComplete', completeHandler);
    $('#tasksDisplay').on('click', '.deleteTask', deleteHandler);
    
    //clickhandlers
}

//get tasks
function getTasks(){
    $.ajax({
        type: 'GET',
        url: '/tasks',
    })
    .then(function(response) {
        console.log(response);
        renderTasks(response);
    })
    .catch(function(error){
        console.log('Error with getting tasks', error);
        alert('Error with getting tasks from server, try again later.');
    })
}

function addTask(){
    console.log('Adding task');
    let newTask = {
        name: $('#nameIn').val(),
        description: $('#description').val(),
    }
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: newTask,
    })
        .then(function(response) {
            console.log('Response from server.', response);
            //TODO: add this function below
            renderTasks();
        })
        .catch(function(error) {
            console.log('Error with post', error);
            alert('Unable to add task at this time, try again later.');
        });
}

function renderTasks(tasks){
    $('#tasksDisplay').empty();
    for(let i = 0; i < tasks.length; i++) {
        $('#tasksDisplay').append(`
        <tr>
            <td>${tasks[i].name}<td>
            <td>${tasks[i].description}<td>
            <td>
                <button class="isComplete" data-id="${tasks[i].id}">Complete task</button>
            </td>
            <td>
                <button class="deleteTask" data-id="${tasks[i].id}">Delete task</button>
            </td>
        </tr>
    `);
    }
}

function completeHandler(){
    console.log('Completing task');
    completeTask($(this).data("id"), "true");
}

function completeTask(taskId, isComplete){
    $.ajax({
        method: 'PUT',
        url: `/tasks/isComplete/${taskId}`,
        data: {
            boolean: isComplete,
        }
    })
        .then (function(response) {
            getTasks();
        })
        .catch(function (error) {
            alert('Error with deleting task', error);
    });
}

function deleteHandler(){
    deleteTask($(this).data("id"));
}

function deleteTask(taskId){
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${taskId}`,
    })
    .then(function(response){
        getTasks();
    })
    .catch(function(error){
        console.log('Error with deleting task', error);
        alert('Error with deleting task, try again later.')
    })
}