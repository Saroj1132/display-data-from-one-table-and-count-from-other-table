const mongoose=require('mongoose')

const mongooseschema=mongoose.Schema({
    //i'm can not create a Insert Code of this table on write a grouping code
    Name:{
        type:String,
        require:true
    },
    Email:{
        type:String,
        require:true
    }
})

const user=mongoose.model('users',mongooseschema)

module.exports=user