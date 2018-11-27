var express = require('express');
var router = express.Router();

const taskController = require('../controllers/TaskController');

router.post('/',taskController.store);
router.get('/tareas',taskController.getTareas);
router.get('/buscar/:id',taskController.buscar);
router.delete('/delete/:id',taskController.delete);
router.put('/actualizar/:id',taskController.update);
module.exports = router;
