var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/mygarage', function (req, res) {
    res.render('mygarage');
});


module.exports = router;