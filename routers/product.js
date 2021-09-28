import express from 'express'
import productModel from '../models/products.js'

const productRouter = express.Router()

productRouter.post('/add', async (req,res) => {
    try {
        const {_id,...body} = req.body
        if(_id){
            await productModel.findByIdAndUpdate(_id,{$set:{...body}})
            res.send('Product updated successfully')
        }
        else
        {
            const newProduct = new productModel(body)
        await newProduct.save()
        res.send('Product added sucessfully')
    }
    }
    catch (err) {
        res.status(500).send(err)
    }
})

productRouter.post('/delete', async (req,res) => {
    try {
        const {_id} = req.body
        await productModel.findByIdAndDelete(_id)
        res.send('deleted sucessfully')
    }
    catch (err) {
        res.status(500).send(err)
    }
})

productRouter.get('/get', async (req,res) => {
    try {
        const products = await productModel.find({});
        res.send(products)
    }
    catch (err) {
        res.status(500).send(err)
    }
})

productRouter.post('/update', async(req,res) => {
    try {
        const products = await productModel.find({});
        res.send(products)
    }
    catch (err) {
        res.status(500).send(err)
    }
})

productRouter.get('/get/categories', async (req,res) => {
    try {
        const products = await productModel.distinct('category')
        res.send(products)
    }
    catch (err) {
        res.status(500).send(err)
    }
})

export default productRouter