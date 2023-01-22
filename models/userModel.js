const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true, 'Name is required']
    },
    email:{
        type:String,
        require:[true, 'Email is required and should be unique'],
        unique:true
    },
    password:{
        type:String,
        require:[true, 'name is required']
    },
},{
    timestamps:true
})

//export 
const userModel = mongoose.model('user', userSchema)
module.exports = userModel