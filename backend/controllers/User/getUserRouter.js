const express = require('express'); 
const router = express.Router();
const User = require('../../models/User');
require('dotenv').config();


router.post('/getUser', async (req,res) =>{
    try{
        const userId = req.body.id;
        let user = await User.findById(userId.user.id).select("-password");
        if(!user){
            return res.status(401).send({error:"Please authenticate the user"});
        }
        res.send(user);
    }catch(e){
        return res.status(401).send({error:"Please authenticate the user"});
    }
});

module.exports = router;