import express from 'express'
import orderModel from '../models/order.js'
import Razorpay from 'razorpay'

const orderRouter = express.Router()

var instance = new Razorpay({ key_id: 'rzp_live_k7g0rC2SWPpJ8O', key_secret: 'rHZ4jDqsZVKZJuX3eBTsbLdn' })

orderRouter.post('/payment', async (req,res) =>{
    try{

        const {amount} =req.body;
        const options =  {amount,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11",
        payment_capture: 0
    }
        instance.orders.create(options, async (err, order) =>{
            console.log(order)
           try{
            err ? res.status(500).send(err) :
                res.send(order)
            }
            catch(error){
                res.status(500).send(error);
            }
          });
    }
    catch(err) {
        res.status(500).send('err')
    }
})

orderRouter.post('/add', async (req,res) => {
    try {
        const body = req.body
        const newOrder = new orderModel(body)
        await newOrder.save()
        res.status(201).send('Order add successfully')
    }
    catch (err) {
        res.status(500).send(err)
    }
})

orderRouter.post('/cancel', async (req,res) => {
    try {
        const {_id} = req.body
        await orderModel.findByIdAndDelete(_id)
        res.status(201).send('Order deleted successfully')
    }
    catch (err) {
        res.status(500).send(err)
    }
})

orderRouter.get('/get', async (req,res) => {
    try {
        const mobile_no = req.query.mobile_no
        if(mobile_no){
            const orders = await orderModel.find({mobile_no,delivered:{$ne:'YES'}})
            res.send(orders)
        }
        else {
            const orders = await orderModel.find({delivered:{$ne:'YES'}})
            res.send(orders)
        }
        }
    catch (err) {
        res.status(500).send(err)
        console.log(err);
    }
})

orderRouter.post('/complete', async (req,res) => {
    try {
        const {id} = req.body  
        await orderModel.findByIdAndUpdate(id,{$set: {delivered:'YES'}})
        res.status(201).send('Order completed successfully')
    }
    catch (err) {
        res.status(500).send(err)
    }
})

orderRouter.post('/sendMsg', async (req,res) => {
    try {
        const {id,msg} = req.body  
        await orderModel.findByIdAndUpdate(id,{$set: {delivered:'wait',msg}})
        res.status(201).send('Order status updated successfully')
    }
    catch (err) {
        res.status(500).send(err)
    }
})

export default orderRouter