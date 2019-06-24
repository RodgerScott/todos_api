$(document).ready(function () {
    $.getJSON("/api/todos")
        .then(addTodos);

    $('#todoInput').keypress(function(event) {
        if (event.which == 13) {
            createTodo();
        }
    });

    $('.list').on('click', 'li', function (){
        updateTodo($(this));
        // $(this).addClass('done');
    });

    $('.list').on('click', 'span', function (e) {
        e.stopPropagation();
        deleteTodo($(this).parent());
    });
});

function addTodos(todos) {
    //add todos to page
    todos.forEach(function(todo) {
      addTodo(todo)
    });
}

function addTodo(todo) {
    let newTodo = $('<li>' + todo.name + '<span>X</span></li>');
    newTodo.data('id', todo._id);
    newTodo.data('completed', todo.completed);
    if(todo.completed) {
        newTodo.addClass("done");
    }
    $('.list').append(newTodo);
}

function createTodo() {
    let usrInput = $('#todoInput').val();
    $.post('/api/todos', {name: usrInput})
        .then(function (newTodo) {
            $('#todoInput').val('');
            addTodo(newTodo)
        .catch(function (err) {
            console.log(err);
                })
        })
}

function deleteTodo (todo) {
    let clickedId = todo.data('id');
    let deleteUrl = '/api/todos/';
    $.ajax({
        method: 'DELETE',
        url: deleteUrl + clickedId
    })
        .then(function (data) {
            todo.remove();
        })
        .catch(function(err) {
            console.log(err);
        })
}

function updateTodo (todo) {
    let clickedId = todo.data('id');
    let updateUrl = '/api/todos/';
    let isDone = !todo.data('completed');
    let updateData = {completed: isDone};
    $.ajax({
        method: 'PUT',
        url: updateUrl + clickedId,
        data: updateData
    })
        .then(function (updatedTodo) {
            todo.toggleClass("done");
            todo.data('completed', isDone);
        })
        .catch(function(err) {
            console.log(err);
        })
}