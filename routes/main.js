const express=require('express');
const router=express.Router();

const {login,dashboard,Register}=require('../controllers/main');
const authMiddleware = require('../middleware/auth');
const check = require('../middleware/auth-login');

router.route('/dashboard').get(authMiddleware, dashboard);
router.route('/register').post(Register);
router.route('/login').post(check,login);

module.exports=router;