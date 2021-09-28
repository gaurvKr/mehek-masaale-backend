import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
    name: String,
    price: String,
    image: String,
    priceBaseVal: String,
    category:String
})

const productModel = mongoose.model('product',productSchema)

export default productModel