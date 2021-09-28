import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    mobile_no: String,
    name: String,
    address: String,
})

const userModel = mongoose.model('user',userSchema)

export default userModel