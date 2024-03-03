const express = require('express');
const router = express.Router();
const createUserRouter = require('../controllers/User/createUser');
const loginRouter = require('../controllers/User/login');
const getUserRouter = require('../controllers/User/getUserRouter');
const isAuthenticated = require('../middleware/isAuthenticated');


// console.log('auth')
router.post('/createUser', createUserRouter);
// console.log('auth2')

router.post('/login', loginRouter);
// console.log('auth3')

router.get('/getUser', isAuthenticated ,getUserRouter);

module.exports = router;