const express = require('express');

const visualizationController = require('../controllers/visualizationController');
const { verifyToken } = require('../middleware/verifyToken');

const router = express.Router();

router.post('/', verifyToken, visualizationController.create);
router.get('/:id', visualizationController.getOne);
router.get('/', verifyToken, visualizationController.getMany);
router.put('/:id', verifyToken, visualizationController.update);
router.delete('/:id', verifyToken, visualizationController.delete);

module.exports = router;
