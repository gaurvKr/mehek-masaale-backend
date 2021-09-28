import express from 'express'
import mongoose from 'mongoose'
import Grid from 'gridfs-stream'
import userRouter from './routers/user.js'
import productRouter from './routers/product.js'
import orderRouter from './routers/order.js'
import imageRouter from './routers/images.js'
import http from 'http'
import {Server} from 'socket.io'
import auth from './middlewares/auth.js'

const app = express()
app.use(express.json())
let gfs

const server = http.createServer(app)

const io = new Server(server,{cors: {origin: '*'}})
 
io.on("connection", socket => {
    console.log('user connected');
    socket.emit('get','gyudyt');
    socket.emit('con','dgiugduk');
    socket.on('disconnect',() => {
        console.log('user disconnected');
    })
})

const mongoUrl = 'mongodb+srv://NareshJatav:AsDf1234@cluster0.sopo6.mongodb.net/mehek_masaale_app?retryWrites=true&w=majority'

mongoose.connect(mongoUrl,{ 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
    }).then((res)=>  
    {
        console.log('connected to db'); 
        gfs= Grid(res.connection.db, mongoose.mongo)
        gfs.collection('images')
    })
    .catch((err) => console.log(err))

app.get('/', async (req,res) => {
    res.send('Hello')
})

app.use('/user',userRouter)

app.use('/product',auth, productRouter)

app.use('/order',auth,orderRouter)

app.use('/image',imageRouter)

server.listen(process.env.PORT || 5000, () => {
    console.log(`${process.env.PORT || 5000}`);
})

export {gfs}