const express=require('express')
const app=express()
const db=require('./config/db')
const mongoose=require('mongoose')
const user=require('./model/user')
const path=require('path')

mongoose.connect(db.url, (err, res)=>{
    console.log('Connection succesfully')
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    const aggreGateOpts=[
        {
            $lookup:{
                from:'tasks',
                localField:'_id',
                foreignField:'UserId',
                as:'infoas'
            }
        },
        {"$unwind":"$infoas"},
        {
            $group:{
                _id:"$infoas.UserId",
                Count:{"$sum":{"$cond":[{"$eq":["$infoas.IsDelete", false]}, 1, 0]}},
                Name:{$first:"$Name"},
                Email:{$first:"$Email"}
            }
        },
        {
            $project:{
                Count:1,
                Email:1,
                Name:1
            }
        }
    ]

    user.aggregate(aggreGateOpts).exec().then(doc=>{
        res.render("display", {
            record:doc
        })
    })
})

app.listen(3000)