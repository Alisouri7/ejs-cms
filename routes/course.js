const express = require('express');
const courseController = require('./../controllers/course');
const router = express.Router();

router.route('/').post(courseController.create);
router.route('/').get(courseController.getAll);
router.route('/remove/:id').get(courseController.remove);  
router.route('/edit/:id').post(courseController.edit);
router.route('/search').post(courseController.search);

module.exports = router;

