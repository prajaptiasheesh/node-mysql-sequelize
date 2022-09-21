var express = require('express');
var router = express.Router();
var formatResponse = require('../../helpers/format-response')
const { addProductCategoryController, listCategoryController, deleteCategoryController } = require('../../controllers');
const { validate, addProductCategorySchema }= require('../../validators');

router.post('/create', validate(addProductCategorySchema), formatResponse(addProductCategoryController));

router.get('/get-by-filters', formatResponse(listCategoryController));

router.delete('/delete/:catId', formatResponse(deleteCategoryController));

module.exports = router;