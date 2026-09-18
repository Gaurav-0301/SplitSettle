const mongoose = require("mongoose");
const User = require("./auth.model");

const groupSchema=mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    admins:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",

        }
    ],

    members:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ]
      
    
}
,{timestamps:true}
)

const Group=mongoose.model("Group",groupSchema);

module.exports=Group;
