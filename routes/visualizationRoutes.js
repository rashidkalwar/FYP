const express = require('express');

const visualizationController = require('../controllers/visualizationController');
const { verifyToken } = require('../middleware/verifyToken');

const router = express.Router();

router.get('/', visualizationController.getOne);
router.post('/', verifyToken, visualizationController.create);
router.put('/:id', verifyToken, visualizationController.update);
router.delete('/:id', verifyToken, visualizationController.delete);

module.exports = router;
