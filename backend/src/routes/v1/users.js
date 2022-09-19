var express = require('express');
const checkAuthentication = require('../../middlewares/check-authentication.middleware');
var router = express.Router();

router.post('/create', checkAuthentication, function(req, res) {
    res.status(200).json({ ...req.user })
});

router.get('/get-one', checkAuthentication, function(req, res) {
    res.send('List of APIv1 users.');
});

router.post('/get-by-filters', checkAuthentication, function(req, res) {
    res.send('Hello from APIv1 root route.');
});

router.post('/delete', checkAuthentication, function(req, res) {
    res.send('Hello from APIv1 root route.');
});

module.exports = router;