import express from 'express'
import { gfs } from '../server.js'
import upload from '../middlewares/image.js'
import auth from '../middlewares/auth.js'

const imageRouter = express.Router()

imageRouter.post('/upload',auth,upload.single("file"),async (req,res) => {
    try{
        console.log(req.body);
    res.status(201).send(req.file)
    }
    catch (err) {
        console.log(err);
        res.send(err)
    }
})

imageRouter.get('/get', async (req,res) =>{
    try{
    const data = await gfs.files.findOne({filename: req.query.name})
    if(!data || data.length ===0) res.send('Sorry, no such file found')
    else {
        const img = gfs.createReadStream(data.filename)
        img.pipe(res)
    }
    }
    catch (err) {
        res.send(err)
        console.log(err)
    }
})

export default imageRouter