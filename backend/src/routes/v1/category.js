var express = require('express');
var router = express.Router();
var formatResponse = require('../../helpers/format-response')
const { addProductCategoryController, listCategoryController } = require('../../controllers');
const { validate, addProductCategorySchema }= require('../../validators');

router.post('/create', validate(addProductCategorySchema), formatResponse(addProductCategoryController));

router.get('/get-by-filters', formatResponse(listCategoryController));

router.delete('/delete', function(req, res) {
    res.send('Hello from APIv1 root route.');
});

module.exports = router;