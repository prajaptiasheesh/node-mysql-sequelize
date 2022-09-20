var express = require('express');
var router = express.Router();
var formatResponse = require('../../helpers/format-response')
const { addProductCategoryController } = require('../../controllers');
const { validate, addProductCategorySchema }= require('../../validators');

router.post('/create', validate(addProductCategorySchema), formatResponse(addProductCategoryController));

router.post('/get-by-filters', function(req, res) {
    res.send('Hello from APIv1 root route.');
});

router.post('/delete', function(req, res) {
    res.send('Hello from APIv1 root route.');
});

module.exports = router;