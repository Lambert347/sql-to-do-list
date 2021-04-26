console.log('JAVAJAVAJAVA');
$(document).ready(readyOn);
//function to ready the dom for manipulation
function readyOn(){
    console.log('JQ');
    //get the tasks from the server when the DOM is loaded
    getTasks();
    //click handlers for when the respective buttons are clicked
    $('#addTask').on('click', addTask);
    $('#tasksDisplay').on('click', '.isComplete', completeHandler);
    $('#tasksDisplay').on('click', '.deleteTask', deleteHandler);
}

//function to get tasks from the server
function getTasks(){
    //makes request to server to get the data
    $.ajax({
        type: 'GET',
        url: '/tasks',
    })
    //when made successfully, calls the renderTasks function with the response (data from the server)
    .then(function(response) {
        console.log(response);
        renderTasks(response);
    })
    //Error if one occurs, alerts user
    .catch(function(error){
        console.log('Error with getting tasks', error);
        alert('Error with getting tasks from server, try again later.');
    })
}

//function to add task
function addTask(){
    console.log('Adding task');
    //creates new task object using the values in the input fields
    let newTask = {
        name: $('#nameIn').val(),
        description: $('#description').val(),
    }
    //Request to send this newTask as data to the server
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: newTask,
    })
        //receives the new dataset from the server
        .then(response => {
            console.log('Response from server.', response);
            //reruns the getTasks function which also re-renders all the tasks to the DOM
            getTasks();
        })
        //error if one occurs
        .catch(error => {
            console.log('Error with post', error);
            alert('Unable to add task at this time, try again later.');
        });
    //finally clears inputs for next entry.
    clearInputs();
}

//function to render tasks to the DOM. Takes in the response (the tasks table) as an array
function renderTasks(tasks){
    //first empty the tasksDisplay section in the index file with jquery
    $('#tasksDisplay').empty();
    //loop to move through the table in the database as an array
    for(let i = 0; i < tasks.length; i++) {
        //appends in the following div with the data from the table at each row that was sent. Adds delete and complete buttons dynamically with the new icons.
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
        //if the task at each iteration of the loop is already completed when rendered, automatically apply the new class for both the card itself (but only the current one)
        //and the button.
        if (tasks[i].isComplete === true){
            $('.taskCard').last().addClass('changeToComplete');
            $('.isComplete').last().addClass('buttonChange');

        }
    }
}
//function for the click handler for when the complete button is clicked on one of the tasks card
function completeHandler(){
    console.log('Completing task');
    //applies the class change to the parent of the button, the card itself
    $(this).parent().addClass('changeToComplete');
    //calls the completeTask function with the data at that button click
    completeTask($(this).data("id"), "true");
}
//function to make put request to the server to change isComplete at the specified id.
function completeTask(taskId, isComplete){
    //requests the server for the change.
    $.ajax({
        method: 'PUT',
        url: `/tasks/isComplete/${taskId}`,
        data: {
            //boolean to be used by the server 
            boolean: isComplete,
        }
    })
        //reruns the getTasks function which also rerenders the data to the DOM, now in a new color because the isComplete for that task is now true.
        .then (function(response) {
            getTasks();
        })
        //error if one occurs
        .catch(function (error) {
            alert('Error with deleting task', error);
    });
}
//function to handle delete at the specified id by the button click.
function deleteHandler(){
    //indicates the card that is to be deleted by its id in the database
    deleteTask($(this).data("id"));
}
//function to request the server for delete
function deleteTask(taskId){
    //sends request for delete with the url being the id of the item to be deleted 
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${taskId}`,
    })
    //if successful, calls the getTasks function which also re-renders the data to the DOM, now one task less
    .then(function(response){
        getTasks();
    })//error if one occurs, alerts user
    .catch(function(error){
        console.log('Error with deleting task', error);
        alert('Error with deleting task, try again later.')
    })
}
//basic function to clear inputs 
function clearInputs(){
    $('#nameIn').val('');
    $('#description').val('');
}