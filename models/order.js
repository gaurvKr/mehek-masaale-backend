import mongoose from 'mongoose'

const orderSchema = mongoose.Schema({
    name: String,
    mobile_no: String,
    address: String,
    items: Array,
    delivered: String,
    total: String,
    msg: String
})

const orderModel = mongoose.model('order',orderSchema)

export default orderModel