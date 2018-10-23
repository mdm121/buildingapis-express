const express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
    res.send('Chirp Chirp!!');
})

module.exports = router;