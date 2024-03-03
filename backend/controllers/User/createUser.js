const express = require('express'); 
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
// console.log("crete")

router.post('/createUser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
  ], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    // console.log(errors);
    if(!errors.isEmpty()){
        // console.log(errors.array());
        res.status(404).json({success, errors : errors.array()});
    }
    try{
        // console.log("here");
        let user = await User.findOne({email : req.body.email});
        if(user){
            return res.status(404).send("User already exists");
        }
        var salt = bcrypt.genSaltSync(10);
        var secPass = bcrypt.hashSync(req.body.password, salt);
        user = await User.create({
            name : req.body.name,
            email : req.body.email,
            password : secPass,
        });
        const data = {
            user : {
                id : user.id
            }
        }
        const authToken = jwt.sign(data,process.env.JWT_SECRET);
        success = true;
        res.json({success, authToken});
    }catch(e){
        // console.log(e.message);
        res.status(404).send({success, msg:e.message});
    }
});
module.exports = router;