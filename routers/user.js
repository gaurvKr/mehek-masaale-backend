import express from 'express'
import userModel from '../models/user.js'
import jwt from "jsonwebtoken";

const userRouter = express.Router()
const secret_key = 'fhgdyjgkufyfjhvjgvjvyjtudytdt233514615768wugjhvxj,hvgds5651875';

userRouter.post('/signin', async (req,res) => { 
    try{
        const body = req.body
        const checkUser = await userModel.findOne({mobile_no: body.mobile_no})
        if(!checkUser) {
            const newUser = new userModel(body)
            await newUser.save()
            const token = jwt.sign({ id: newUser._id }, secret_key);
        res.status(200).send({...newUser._doc,token})
        }
        else {
            console.log('hvghcv');
            const token = jwt.sign({ id: checkUser._id }, secret_key);
            console.log('hbgvfc');
            if(body.mobile_no === "9318484300"  ) {
                if(body.address === checkUser.address)
                res.send({...checkUser._doc,token})
                else res.status(401).send('best request') 
            }
          else
            {
                const newUser = await userModel.findOneAndUpdate({mobile_no: body.mobile_no},
                {$set: {name: body.name,address: body.address}})
        res.status(200).send({...newUser._doc,token})
    }
        }
    }
    catch (err) {
        res.status(500).send(err)
    }
})

export default userRouter