var router = require('express').Router()
const checkAuthentication = require('../../middlewares/check-authentication.middleware');

router.use('/users',checkAuthentication, require('./users'))
router.use('/authenticate', require('./authenticate'))
router.use('/category', checkAuthentication, require('./category'))

module.exports = router;