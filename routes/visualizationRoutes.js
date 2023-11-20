const express = require('express');

const visualizationController = require('../controllers/visualizationController');
const { verifyToken } = require('../middleware/verifyToken');

const router = express.Router();

// For Authenticated Users
router.post('/', verifyToken, visualizationController.create);
router.get('/:id', verifyToken, visualizationController.getOne);
router.get('/', verifyToken, visualizationController.getMany);
router.put('/:id', verifyToken, visualizationController.update);
router.delete('/:id', verifyToken, visualizationController.delete);

module.exports = router;
