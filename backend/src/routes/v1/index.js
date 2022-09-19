var router = require('express').Router()

router.use('/users',require('./users'))
router.use('/authenticate', require('./authenticate'))

module.exports = router;