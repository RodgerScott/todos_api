const db = require('../models');


exports.getTodos = function(req,res) {
    db.Todo.find()
        .then(function(todos) {
            res.json(todos);
        })
        .catch(function(err) {
            res.send(err);
        })
};

exports.createTodo = function(req, res) {
    db.Todo.create(req.body)
        .then(function(newTodo) {
            res.json(newTodo);
        })
        .catch(function (err) {
            res.send(err);
        })
};

exports.findSpecificTodo =  function(req, res) {
    db.Todo.findById(req.params.todoId)
        .then(function(foundToDo) {
            res.json(foundToDo);
        })
        .catch(function (err) {
            res.send(err);
        })
};

exports.modifyTodo = function (req, res) {
    db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
        .then(function(todo) {
            res.json(todo)
        })
        .catch(function(err) {
            res.send(err);
        })
};

exports.destroyTodo = function (req, res) {
    db.Todo.remove({_id: req.params.todoId})
        .then(function(){
            res.json({message: "And it is done deleted!"})
        })
        .catch(function(err){
            res.send(err);
        })
};

module.exports = exports;