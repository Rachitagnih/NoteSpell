const express = require('express'); 
const router = express.Router();
const {body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();


router.post('/login',[
    body('email',"enter a valid email").isEmail(),
    body('password', "password cannot be empty").exists()
], async (req,res) =>{
    let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(404).json({success, errors : errors.array()});
    }
    try{
        let user = await User.findOne({email : req.body.email});
        if(!user){
            return res.status(404).send({success, msg:"Please use correct credentials"});
        }
        const checkPass = await bcrypt.compare(req.body.password, user.password);
        if(!checkPass) {
            return res.status(404).send({success,msg: "Please use correct credentials"});
        }
        const data = {
            user : {
                id : user.id,
            }
        }
        const authToken = jwt.sign(data,process.env.JWT_SECRET);
        success = true;
        res.json({success, authToken});
        
    }catch(e){
        res.status(404).send({success, msg : e.message});
    }
})


module.exports = router;