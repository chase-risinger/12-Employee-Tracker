// index file is central hub to pull all the routes together

const express = require('express');
const router = express.Router();


router.use(require('./departmentRoutes'));


module.exports = router;