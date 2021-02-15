const mongoose=require('mongoose')
const schema=mongoose.Schema
const taskseschema=mongoose.Schema({
    
    //display data how many task in that user

    //i'm can not create a Insert Code of this table on write a grouping code

    UserId:{
        type:schema.Types.ObjectId,
        ref:'users'
    },
    Task:{
        type:String,
        require:true
    }
})

const task=mongoose.model('tasks',taskseschema)

module.exports=task