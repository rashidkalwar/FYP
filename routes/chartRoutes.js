const express = require('express');

const visualizationController = require('../controllers/visualizationController');

const router = express.Router();

// For Anonymous Users
router.get('/', visualizationController.getAllUniqueIds);
router.get('/:id', visualizationController.getEach);

module.exports = router;
