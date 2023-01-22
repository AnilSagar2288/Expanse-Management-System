const mongoose = require('mongoose');

const transectionSchema = new mongoose.Schema({
    userid: {
        type:String,
        require:[true, 'userid is required']
    },
    amount: {
        type:Number,
        require:[true, 'amount is required']
    },
    type: {
        type:String,
        require:[true, 'type is required']
    },
    category: {
        type:String,
        require:[true, 'cat is required']
    },
    reference: {
        type:String,        
    },
    description: {
        type:String,
        require:[true, 'description is required']        
    },
    date:{
        type:Date,
        require:[true, 'date is required'] 
    }
},
{
    timestamps:true
})


const transectionModel = mongoose.model('transaction', transectionSchema)

module.exports = transectionModel;