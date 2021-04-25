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
        .then(response => {
            console.log('Response from server.', response);
            //TODO: add this function below
            getTasks();
        })
        .catch(error => {
            console.log('Error with post', error);
            alert('Unable to add task at this time, try again later.');
        });
}

function renderTasks(tasks){
    $('#tasksDisplay').empty();
    for(let i = 0; i < tasks.length; i++) {
        $('#tasksDisplay').append(`
            <div class="taskCard">
                <p class="nameStyle">${tasks[i].name}</p>
                <li class="descriptionStyle">${tasks[i].description}</li>
                <button class="isComplete" data-id="${tasks[i].id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-checklist" viewBox="0 0 16 16">
                    <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                    <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"/>
                    </svg>
                </button>
                <button class="deleteTask" data-id="${tasks[i].id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash2" viewBox="0 0 16 16">
                        <path d="M14 3a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2zM3.215 4.207l1.493 8.957a1 1 0 0 0 .986.836h4.612a1 1 0 0 0 .986-.836l1.493-8.957C11.69 4.689 9.954 5 8 5c-1.954 0-3.69-.311-4.785-.793z"/>
                    </svg>
                </button>

            </div>
        `);
        if (tasks[i].isComplete === true){
            $('.taskCard').last().addClass('changeToComplete');
        }
    }
}

function completeHandler(){
    console.log('Completing task');
    $(this).parent().addClass('changeToComplete');
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