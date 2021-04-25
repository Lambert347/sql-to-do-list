console.log('JAVAJAVAJAVA');
$(document).ready(readyOn);

function readyOn(){
    console.log('JQ');
    //render/get tasks
    
    //clickhandlers
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
                <button class="deleteBook" data-id="${tasks[i].id}">Delete task</button>
            </td>
        </tr>
    `);
    }
}