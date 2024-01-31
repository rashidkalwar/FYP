const express = require('express');

const datasetController = require('../controllers/datasetController');
const { verifyToken } = require('../middleware/verifyToken');

const router = express.Router();

router.post('/', verifyToken, datasetController.upload);
router.get('/:slug', datasetController.getOne);
router.get('/', verifyToken, datasetController.getMany);
router.delete('/:slug', verifyToken, datasetController.delete);
router.put('/:slug', verifyToken, datasetController.update);

module.exports = router;
