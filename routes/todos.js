let express = require('express');
let router = express.Router();
let db = require('../models');
let helpers = require('../helpers/todos');

router.route('/')
    .get(helpers.getTodos)
    .post(helpers.createTodo);

router.route('/:todoId')
    .get(helpers.findSpecificTodo)
    .put(helpers.modifyTodo)
    .delete(helpers.destroyTodo);

module.exports = router;