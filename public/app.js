$(document).ready(function () {
    $.getJSON("/api/todos")
        .then(addTodos);

    $('#todoInput').keypress(function(event) {
        if (event.which == 13) {
            createTodo();
        }
    });

    $('.list').on('click', 'span', function () {
        deleteTodo($(this).parent());
    })
});

function addTodos(todos) {
    //add todos to page
    todos.forEach(function(todo) {
      addTodo(todo)
    })
}

function addTodo(todo) {
    let newTodo = $('<li>' + todo.name + '<span>X</span></li>');
    newTodo.data('id', todo._id);
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