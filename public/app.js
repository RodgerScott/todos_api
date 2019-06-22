$(document).ready(function () {
    $.getJSON("/api/todos")
        .then(addTodos);

    $('#todoInput').keypress(function(event) {
        if (event.which == 13) {
            createTodo();
        }
    })
});

function addTodos(todos) {
    //add todos to page
    todos.forEach(function(todo) {
      addTodo(todo)
    })
}

function addTodo(todo) {
    let newTodo = $('<li>' + todo.name + '</li>');
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