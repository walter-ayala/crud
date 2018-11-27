var express = require('express');
var router = express.Router();

const taskController = require('../controllers/TaskController');

router.post('/',taskController.store);
router.get('/tareas',taskController.getTareas);
router.delete('/delete/:id',taskController.delete);
module.exports = router;
