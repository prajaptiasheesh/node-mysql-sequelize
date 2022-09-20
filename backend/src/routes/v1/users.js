var express = require('express');
var router = express.Router();

router.post('/create', function(req, res) {
    res.status(200).json({ ...req.user })
});

router.get('/get-one', function(req, res) {
    res.send('List of APIv1 users.');
});

router.post('/get-by-filters', function(req, res) {
    res.send('Hello from APIv1 root route.');
});

router.post('/delete', function(req, res) {
    res.send('Hello from APIv1 root route.');
});

module.exports = router;